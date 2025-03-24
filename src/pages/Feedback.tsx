
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';
import FeedbackForm from '../components/FeedbackForm';

const Feedback: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login page if not authenticated
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null; // Don't render anything while redirecting
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center justify-center py-12">
            <div className="text-center mb-12 animate-fade-in">
              <h1 className="text-4xl font-bold text-gray-900 mb-3">Share Your Feedback</h1>
              <p className="text-gray-600 max-w-md mx-auto">
                We value your input to help us improve our services
              </p>
            </div>
            
            <FeedbackForm />
          </div>
        </div>
      </div>
      
      {/* Background decorative elements */}
      <div className="fixed top-40 right-20 w-64 h-64 bg-primary/5 rounded-full filter blur-3xl animate-pulse opacity-70" />
      <div className="fixed bottom-20 left-20 w-96 h-96 bg-purple-100/30 rounded-full filter blur-3xl opacity-70" />
    </div>
  );
};

export default Feedback;
