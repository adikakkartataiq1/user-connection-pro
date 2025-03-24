
from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2
from psycopg2.extras import RealDictCursor
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# PostgreSQL Configuration
DB_HOST = os.environ.get('DB_HOST', 'localhost')
DB_NAME = os.environ.get('DB_NAME', 'survey_db')
DB_USER = os.environ.get('DB_USER', 'postgres')
DB_PASSWORD = os.environ.get('DB_PASSWORD', 'password')
DB_PORT = os.environ.get('DB_PORT', '5432')

def get_db_connection():
    conn = psycopg2.connect(
        host=DB_HOST,
        database=DB_NAME,
        user=DB_USER,
        password=DB_PASSWORD,
        port=DB_PORT,
        cursor_factory=RealDictCursor
    )
    return conn

# Create tables if they don't exist
def create_tables():
    conn = get_db_connection()
    try:
        with conn.cursor() as cursor:
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS survey_responses (
                    email VARCHAR(255) PRIMARY KEY,
                    tata_preference VARCHAR(255),
                    non_tata_preference VARCHAR(255)
                );
                
                CREATE TABLE IF NOT EXISTS airline_selections (
                    email VARCHAR(255) PRIMARY KEY,
                    selections TEXT[],
                    FOREIGN KEY (email) REFERENCES survey_responses(email)
                );
                
                CREATE TABLE IF NOT EXISTS feedback (
                    id SERIAL PRIMARY KEY,
                    email VARCHAR(255),
                    answer_1 TEXT,
                    answer_2 TEXT,
                    answer_3 TEXT,
                    answer_4 TEXT,
                    answer_5 TEXT,
                    answer_6 TEXT,
                    title TEXT,
                    description TEXT,
                    image_path TEXT,
                    coupon BOOLEAN DEFAULT FALSE,
                    FOREIGN KEY (email) REFERENCES survey_responses(email)
                );
            """)
            conn.commit()
    except Exception as e:
        print(f"Error creating tables: {e}")
    finally:
        conn.close()

@app.before_first_request
def initialize():
    create_tables()

# API 1: Submit responses
@app.route('/api/submit-survey', methods=['POST'])
def submit_survey():
    data = request.json
    email = data.get('email')
    tata_preference = data.get('tataPreference')
    non_tata_preference = data.get('nonTataPreference')
    
    if not email:
        return jsonify({"error": "Email is required"}), 400
    
    conn = get_db_connection()
    try:
        with conn.cursor() as cursor:
            cursor.execute("""
                INSERT INTO survey_responses (email, tata_preference, non_tata_preference)
                VALUES (%s, %s, %s)
                ON CONFLICT (email) 
                DO UPDATE SET tata_preference = %s, non_tata_preference = %s
                RETURNING *
            """, (email, tata_preference, non_tata_preference, tata_preference, non_tata_preference))
            result = cursor.fetchone()
            conn.commit()
        return jsonify({"message": "Survey submitted successfully", "data": dict(result)}), 201
    except Exception as e:
        conn.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        conn.close()

@app.route('/api/submit-airline-selection', methods=['POST'])
def submit_airline_selection():
    data = request.json
    email = data.get('email')
    selections = data.get('selections', [])
    
    if not email:
        return jsonify({"error": "Email is required"}), 400
    
    conn = get_db_connection()
    try:
        with conn.cursor() as cursor:
            cursor.execute("""
                INSERT INTO airline_selections (email, selections)
                VALUES (%s, %s)
                ON CONFLICT (email) 
                DO UPDATE SET selections = %s
                RETURNING *
            """, (email, selections, selections))
            result = cursor.fetchone()
            conn.commit()
        return jsonify({"message": "Airline selections submitted successfully", "data": dict(result)}), 201
    except Exception as e:
        conn.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        conn.close()

@app.route('/api/submit-feedback', methods=['POST'])
def submit_feedback():
    data = request.json
    email = data.get('email')
    answer_1 = data.get('answer_1')
    answer_2 = data.get('answer_2')
    answer_3 = data.get('answer_3')
    answer_4 = data.get('answer_4')
    answer_5 = data.get('answer_5')
    answer_6 = data.get('answer_6')
    title = data.get('title')
    description = data.get('description')
    image = data.get('image')
    
    if not email:
        return jsonify({"error": "Email is required"}), 400
    
    conn = get_db_connection()
    try:
        with conn.cursor() as cursor:
            cursor.execute("""
                INSERT INTO feedback (
                    email, answer_1, answer_2, answer_3, answer_4, answer_5, answer_6, 
                    title, description, image_path
                )
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                RETURNING id
            """, (
                email, answer_1, answer_2, answer_3, answer_4, answer_5, answer_6,
                title, description, image
            ))
            result = cursor.fetchone()
            conn.commit()
        return jsonify({"message": "Feedback submitted successfully", "id": result['id']}), 201
    except Exception as e:
        conn.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        conn.close()

# API 2: Check if email exists
@app.route('/api/check-email/<email>', methods=['GET'])
def check_email(email):
    conn = get_db_connection()
    try:
        with conn.cursor() as cursor:
            cursor.execute("SELECT * FROM survey_responses WHERE email = %s", (email,))
            result = cursor.fetchone()
            exists = result is not None
        return jsonify({"exists": exists}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        conn.close()

# API 3: Update coupon status
@app.route('/api/update-coupon/<email>', methods=['PUT'])
def update_coupon(email):
    conn = get_db_connection()
    try:
        with conn.cursor() as cursor:
            cursor.execute("""
                UPDATE feedback 
                SET coupon = TRUE 
                WHERE email = %s
                RETURNING id, email, coupon
            """, (email,))
            result = cursor.fetchone()
            if not result:
                return jsonify({"error": "Email not found"}), 404
            conn.commit()
        return jsonify({"message": "Coupon status updated", "data": dict(result)}), 200
    except Exception as e:
        conn.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        conn.close()

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
