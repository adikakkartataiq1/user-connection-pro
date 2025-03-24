import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Gift, ChevronLeft, ChevronRight, User } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const airlines = [
  "Air India",
  "Air India Express",
  "Indigo",
  "Spice Jet",
  "Akasa Air",
  "Alliance Air",
  "Others"
];

const AirlineSelection: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedAirlines, setSelectedAirlines] = useState<string[]>([]);

  const handleAirlineToggle = (airline: string) => {
    setSelectedAirlines(prev => {
      // If already selected, remove it
      if (prev.includes(airline)) {
        return prev.filter(a => a !== airline);
      }
      
      // If trying to select more than 3, show toast and don't add
      if (prev.length >= 3) {
        toast({
          title: "Maximum selection reached",
          description: "You can only select up to 3 airlines",
        });
        return prev;
      }
      
      // Otherwise add it
      return [...prev, airline];
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save response to database (would connect to API)
    console.log("Selected airlines:", selectedAirlines);
    
    // Show success toast
    toast({
      title: "Response saved",
      description: "Your airline selection has been recorded.",
    });
    
    // Navigate to reward page
    navigate('/reward');
  };

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
            <span className="font-bold text-purple-700 text-3xl">75</span>
          </div>
          <Progress value={75} className="h-2 bg-purple-100" />
        </div>
      </div>
      
      {/* Question */}
      <div className="bg-purple-700 text-white p-4 flex justify-between items-center">
        <Button variant="ghost" size="icon" className="text-white hover:bg-purple-600">
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <h3 className="text-center font-medium px-2">
          Which airlines have you traveled with in the past year? (Select up to 3)
        </h3>
        <Button variant="ghost" size="icon" className="text-white hover:bg-purple-600">
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>
      
      <form onSubmit={handleSubmit} className="p-6 flex-grow">
        <div className="space-y-8">
          {airlines.map((airline) => (
            <div key={airline} className="flex items-center justify-between border-b pb-4">
              <span className="text-lg text-gray-600">{airline}</span>
              <Checkbox
                id={`airline-${airline}`}
                checked={selectedAirlines.includes(airline)}
                onCheckedChange={() => handleAirlineToggle(airline)}
                className="h-6 w-6 border-2 border-indigo-900 rounded data-[state=checked]:bg-indigo-900"
              />
            </div>
          ))}
        </div>
        
        <Button 
          type="submit" 
          className="w-full mt-8 bg-indigo-900 hover:bg-indigo-800 rounded-full py-6"
          disabled={selectedAirlines.length === 0}
        >
          Next
        </Button>
      </form>
    </div>
  );
};

export default AirlineSelection;
