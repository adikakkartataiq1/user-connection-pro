
# Survey App Backend

This is the Flask backend for the Survey Application. It provides APIs for submitting survey responses, checking emails, and updating coupon status.

## Setup

1. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

2. Set up PostgreSQL:
   - Make sure PostgreSQL is installed and running
   - Create a database named 'survey_db'
   - You can set custom database configuration through environment variables:
     - DB_HOST
     - DB_NAME
     - DB_USER
     - DB_PASSWORD
     - DB_PORT

3. Run the application:
   ```bash
   python app.py
   ```

## API Endpoints

1. **Submit Survey Responses**
   - `POST /api/submit-survey`
   - Accepts JSON body with email, tataPreference, and nonTataPreference

2. **Submit Airline Selections**
   - `POST /api/submit-airline-selection`
   - Accepts JSON body with email and selections array

3. **Submit Feedback**
   - `POST /api/submit-feedback`
   - Accepts JSON body with email, answers 1-6, title, description, and image

4. **Check if Email Exists**
   - `GET /api/check-email/<email>`
   - Returns JSON with exists status

5. **Update Coupon Status**
   - `PUT /api/update-coupon/<email>`
   - Updates coupon status to true for the given email

## Database Schema

1. **survey_responses**
   - email (primary key)
   - tata_preference
   - non_tata_preference

2. **airline_selections**
   - email (primary key, foreign key to survey_responses)
   - selections (text array)

3. **feedback**
   - id (serial primary key)
   - email (foreign key to survey_responses)
   - answer_1 to answer_6 (text fields)
   - title (text)
   - description (text)
   - image_path (text)
   - coupon (boolean, default false)
