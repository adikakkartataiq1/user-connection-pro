
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAuth } from '../context/AuthContext';
import { Gift, ChevronLeft, ChevronRight } from 'lucide-react';

const Survey: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [tataPreference, setTataPreference] = useState<string | undefined>(undefined);
  const [nonTataPreference, setNonTataPreference] = useState<string | undefined>(undefined);

  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle survey submission
    console.log({ tataPreference, nonTataPreference });
    // Navigate to feedback or thank you page
    navigate('/feedback');
  };

  if (!isAuthenticated) {
    return null; // Don't render anything while redirecting
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800">
      <Header />
      
      <div className="container mx-auto px-4 pt-16 pb-12">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Points Bar */}
          <div className="p-4 flex items-center gap-3">
            <Gift className="text-purple-600 h-6 w-6" />
            <div className="flex-1">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600 font-medium">Earn Survey Points :</span>
                <span className="font-bold text-purple-700">20</span>
              </div>
              <div className="w-full bg-purple-100 rounded-full h-2.5">
                <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: '45%' }}></div>
              </div>
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
          
          <form onSubmit={handleSubmit} className="p-6">
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
            
            <Button type="submit" className="w-full mt-4">
              Next
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Survey;
