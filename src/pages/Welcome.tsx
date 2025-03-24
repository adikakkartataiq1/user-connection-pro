
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';

const Welcome: React.FC = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-600 to-purple-800 flex flex-col">
      {/* Header blue bar */}
      <div className="h-20 bg-blue-600 w-full" />
      
      {/* Main Content */}
      <div className="flex-grow flex flex-col items-center justify-between pb-10 px-4">
        <div className="mt-16 text-center">
          <h1 className="text-4xl font-bold text-white mb-3">Earn Rewards</h1>
          <h1 className="text-4xl font-bold text-white mb-3">While You</h1>
          <h1 className="text-4xl font-bold text-white mb-3">Spend a</h1>
          <h1 className="text-4xl font-bold text-white mb-3">Few Minutes!</h1>
          
          <div className="mt-12 text-white text-xl">
            <p>Complete this short survey</p>
            <p>about your shopping habits</p>
            <p>& earn exciting rewards.</p>
            <p>The more you answer,</p>
            <p>the more you earn!</p>
          </div>
        </div>
        
        <div className="w-full max-w-xs mt-10">
          <Button 
            onClick={handleStart}
            className="w-full bg-indigo-900 hover:bg-indigo-800 text-white py-6 rounded-full"
          >
            <span className="mr-auto pl-4">Start Now</span>
            <span className="text-sm">Get Your First 10 Points!</span>
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
        
        {/* Brand logos at bottom */}
        <div className="w-full mt-16">
          <div className="grid grid-cols-5 gap-2 mb-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg p-3 flex items-center justify-center">
                <span className="text-gray-300">Brand</span>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg p-4 flex items-center justify-center">
                <span className="text-gray-300">Brand</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
