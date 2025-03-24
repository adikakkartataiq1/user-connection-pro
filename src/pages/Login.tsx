
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to feedback page if already authenticated
    if (isAuthenticated) {
      navigate('/feedback');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center justify-center py-12">
            <div className="text-center mb-12 animate-fade-in">
              <h1 className="text-4xl font-bold text-gray-900 mb-3">Welcome Back</h1>
              <p className="text-gray-600 max-w-md mx-auto">
                Sign in to continue to the feedback portal
              </p>
            </div>
            
            <LoginForm />
          </div>
        </div>
      </div>
      
      {/* Background decorative elements */}
      <div className="fixed top-40 left-20 w-64 h-64 bg-primary/5 rounded-full filter blur-3xl animate-pulse opacity-70" />
      <div className="fixed bottom-20 right-20 w-96 h-96 bg-purple-100/30 rounded-full filter blur-3xl opacity-70" />
    </div>
  );
};

export default Login;
