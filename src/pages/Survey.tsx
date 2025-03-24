
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useAuth } from '../context/AuthContext';
import { Gift, ChevronLeft, ChevronRight, User } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

type SurveyResponse = {
  tataPreference: string | undefined;
  nonTataPreference: string | undefined;
};

const Survey: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [tataPreference, setTataPreference] = useState<string | undefined>(undefined);
  const [nonTataPreference, setNonTataPreference] = useState<string | undefined>(undefined);
  const [responses, setResponses] = useState<SurveyResponse[]>([]);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const saveResponse = () => {
    // Log response to console (in a real app, you'd save to a database)
    const response = { tataPreference, nonTataPreference };
    console.log(response);
    
    // Add to responses array
    setResponses([...responses, response]);
    
    // Show success toast
    toast({
      title: "Response saved",
      description: "Your survey response has been recorded.",
    });
    
    // Navigate to airline selection page instead of reward page
    navigate('/airline-selection');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveResponse();
  };

  if (!isAuthenticated) {
    return null; // Don't render anything while redirecting
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <div className="h-16 bg-blue-600 w-full flex justify-end items-center px-4">
        <User className="h-8 w-8 text-white bg-gray-400 rounded-full p-1" />
      </div>
      
      {/* Points Bar */}
      <div className="bg-white p-4 flex items-center gap-3">
        <Gift className="text-purple-600 h-6 w-6" />
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-gray-500 font-medium">Earn Survey Points :</span>
            <span className="font-bold text-purple-700 text-3xl">20</span>
          </div>
          <Progress value={40} className="h-2 bg-purple-100" />
        </div>
      </div>
      
      {/* Question */}
      <div className="bg-purple-700 text-white p-4 flex justify-between items-center">
        <Button variant="ghost" size="icon" className="text-white hover:bg-purple-600">
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <h3 className="text-center font-medium px-2">How often do you prefer Tata brands over others?</h3>
        <Button variant="ghost" size="icon" className="text-white hover:bg-purple-600">
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>
      
      <form onSubmit={handleSubmit} className="p-6 flex-grow">
        {/* Tata Brand Section */}
        <div className="mb-6">
          <h4 className="text-gray-500 mb-4">Tata Brand</h4>
          
          <RadioGroup value={tataPreference} onValueChange={setTataPreference} className="space-y-4">
            <div className="flex items-center justify-between border-b pb-2">
              <Label htmlFor="tata-0-25" className="text-sm font-normal cursor-pointer">0% to 25%</Label>
              <RadioGroupItem value="0-25" id="tata-0-25" />
            </div>
            
            <div className="flex items-center justify-between border-b pb-2">
              <Label htmlFor="tata-25-50" className="text-sm font-normal cursor-pointer">25% to 50%</Label>
              <RadioGroupItem value="25-50" id="tata-25-50" />
            </div>
            
            <div className="flex items-center justify-between border-b pb-2">
              <Label htmlFor="tata-50-75" className="text-sm font-normal cursor-pointer">50% to 75%</Label>
              <RadioGroupItem value="50-75" id="tata-50-75" />
            </div>
            
            <div className="flex items-center justify-between border-b pb-2">
              <Label htmlFor="tata-75-100" className="text-sm font-normal cursor-pointer">75% to 100%</Label>
              <RadioGroupItem value="75-100" id="tata-75-100" />
            </div>
          </RadioGroup>
        </div>
        
        {/* Non Tata Brand Section */}
        <div className="mb-6">
          <h4 className="text-gray-500 mb-4">Non Tata Brand</h4>
          
          <RadioGroup value={nonTataPreference} onValueChange={setNonTataPreference} className="space-y-4">
            <div className="flex items-center justify-between border-b pb-2">
              <Label htmlFor="non-tata-0-25" className="text-sm font-normal cursor-pointer">0% to 25%</Label>
              <RadioGroupItem value="0-25" id="non-tata-0-25" />
            </div>
            
            <div className="flex items-center justify-between border-b pb-2">
              <Label htmlFor="non-tata-25-50" className="text-sm font-normal cursor-pointer">25% to 50%</Label>
              <RadioGroupItem value="25-50" id="non-tata-25-50" />
            </div>
            
            <div className="flex items-center justify-between border-b pb-2">
              <Label htmlFor="non-tata-50-75" className="text-sm font-normal cursor-pointer">50% to 75%</Label>
              <RadioGroupItem value="50-75" id="non-tata-50-75" />
            </div>
            
            <div className="flex items-center justify-between border-b pb-2">
              <Label htmlFor="non-tata-75-100" className="text-sm font-normal cursor-pointer">75% to 100%</Label>
              <RadioGroupItem value="75-100" id="non-tata-75-100" />
            </div>
          </RadioGroup>
        </div>
        
        <Button 
          type="submit" 
          className="w-full mt-4 bg-indigo-900 hover:bg-indigo-800 rounded-full py-6"
          disabled={!tataPreference || !nonTataPreference}
        >
          Next
        </Button>
      </form>
    </div>
  );
};

export default Survey;
