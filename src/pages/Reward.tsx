
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Gift, ChevronLeft, User, Check } from 'lucide-react';

const Reward: React.FC = () => {
  const navigate = useNavigate();

  const handleFinish = () => {
    // In a real app, you might clear the survey session or perform other actions
    navigate('/welcome');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-800">
      {/* Header */}
      <div className="h-16 bg-blue-600 w-full flex justify-end items-center px-4">
        <User className="h-8 w-8 text-white bg-gray-400 rounded-full p-1" />
      </div>
      
      {/* Points Bar */}
      <div className="bg-gray-800 p-4 flex items-center gap-3">
        <Gift className="text-purple-400 h-6 w-6" />
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-gray-300 font-medium">Earn Survey Points :</span>
            <span className="font-bold text-purple-400 text-3xl">100</span>
          </div>
          <Progress value={100} className="h-2 bg-purple-900" />
        </div>
      </div>
      
      {/* Reward Card */}
      <div className="flex-grow flex justify-center items-center p-4">
        <div className="bg-yellow-400 rounded-3xl p-6 w-full max-w-md mx-auto text-center relative">
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
            <div className="bg-purple-600 w-16 h-16 rounded-lg relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="w-8 h-8 bg-yellow-400 rounded-full" />
              </div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Gift className="text-yellow-400 h-8 w-8" />
              </div>
            </div>
          </div>
          
          <h2 className="text-2xl font-bold mb-2 mt-4">Congratulations!</h2>
          <p className="mb-8">
            You've successfully completed<br />
            the survey and earned your<br />
            reward!
          </p>
          
          <div className="mb-4">
            <div className="rounded-full bg-gradient-to-r from-pink-500 to-red-500 w-20 h-20 mx-auto flex justify-center items-center text-white text-3xl font-bold">
              N
            </div>
            <p className="mt-2">Your</p>
            <p className="text-xl font-bold">₹100 YONO COIN</p>
          </div>
          
          <p className="text-sm">
            gift voucher will be sent to<br />
            your company email ID.
          </p>
        </div>
      </div>
      
      {/* Brand Selection */}
      <div className="p-4 bg-gray-800">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Tribhovandas</p>
              <p className="text-sm">Bhimji Zaveri</p>
            </div>
            <div className="h-5 w-5 border border-gray-300 rounded" />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Dhiraj</p>
              <p className="text-sm">Jewellers</p>
            </div>
            <div className="h-5 w-5 border border-gray-300 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reward;
