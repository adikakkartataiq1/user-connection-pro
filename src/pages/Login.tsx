
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Gift, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/otp');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !termsAccepted) return;
    
    try {
      // Mock login - in real app this would validate properly
      await login(email, 'password123');
      navigate('/otp');
    } catch (error) {
      console.error('Login failed', error);
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
      
      {/* Login Form */}
      <div className="flex-grow flex flex-col px-4 py-8">
        <div className="flex items-center gap-2 mb-8">
          <User className="text-gray-500" />
          <h2 className="text-2xl text-gray-500 font-medium">Login / Sign up</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Tata group company email ID"
            className="p-6 text-lg"
          />
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="terms" 
              checked={termsAccepted}
              onCheckedChange={(checked) => setTermsAccepted(checked === true)}
            />
            <label
              htmlFor="terms"
              className="text-sm text-gray-500 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I accept the <a href="#" className="underline">Terms & Conditions</a> and <a href="#" className="underline">Privacy Policy</a>
            </label>
          </div>
          
          <div className="pt-4">
            <Button
              type="submit"
              className="w-40 bg-indigo-900 hover:bg-indigo-800 mx-auto rounded-full py-6"
              disabled={!email || !termsAccepted}
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

export default Login;
