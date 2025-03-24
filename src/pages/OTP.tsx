
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Gift, Eye } from 'lucide-react';

const OTP: React.FC = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '']);

  const handleOtpChange = (index: number, value: string) => {
    // Only allow numbers
    if (value && !/^\d*$/.test(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // Auto-focus next input
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Check if OTP is complete
    if (otp.join('').length === 4) {
      navigate('/survey');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <div className="h-20 bg-blue-600 w-full" />
      
      {/* Points Bar */}
      <div className="bg-white p-4 flex items-center gap-3">
        <Gift className="text-purple-600 h-6 w-6" />
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-gray-500 font-medium">Earn Survey Points :</span>
            <span className="font-bold text-purple-700 text-3xl">10</span>
          </div>
          <Progress value={10} className="h-2 bg-purple-100" />
        </div>
      </div>
      
      {/* OTP Form */}
      <div className="flex-grow flex flex-col px-4 py-8">
        <div className="flex items-center gap-2 mb-8">
          <Eye className="text-gray-500" />
          <h2 className="text-2xl text-gray-500 font-medium">OTP</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-4 gap-4">
            {otp.map((digit, index) => (
              <Input
                key={index}
                id={`otp-${index}`}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                maxLength={1}
                className="p-6 text-center text-xl"
                autoFocus={index === 0}
              />
            ))}
          </div>
          
          <p className="text-center text-gray-500">
            Check your company<br />
            email for the OTP.
          </p>
          
          <div className="pt-4">
            <Button
              type="submit"
              className="w-40 bg-indigo-900 hover:bg-indigo-800 mx-auto rounded-full py-6"
              disabled={otp.join('').length !== 4}
            >
              Next
            </Button>
          </div>
        </form>
      </div>
      
      {/* Advertisement */}
      <div className="px-4 py-6">
        <div className="bg-black rounded-xl text-white p-4 relative">
          <div className="absolute top-2 left-2 text-xs bg-gray-700 px-2 py-1 rounded">Ad</div>
          <div className="mt-6">
            <h3 className="text-xl font-bold">Galaxy S25 Ultra</h3>
            <p className="text-sm">Galaxy AI ✨</p>
            <button className="bg-white text-black text-xs px-3 py-1 rounded-full mt-2">
              Own now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTP;
