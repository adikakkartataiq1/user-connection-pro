
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, Send, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import ImageUpload from './ImageUpload';

const questions = [
  "How satisfied are you with our products/services?",
  "How easy was it to find what you were looking for?",
  "How likely are you to recommend us to a friend or colleague?",
  "How would you rate our customer support?",
  "What aspects of our service do you value the most?",
  "What improvements would you suggest for our services?"
];

const FeedbackForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>(Array(questions.length).fill(''));
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleAnswerChange = (answer: string) => {
    const newAnswers = [...answers];
    newAnswers[currentStep] = answer;
    setAnswers(newAnswers);
  };

  const handleNextStep = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleImageChange = (file: File | null) => {
    setImage(file);
  };

  const handleSubmit = async () => {
    if (!title || !description) {
      toast.error('Please provide both title and description');
      return;
    }
    
    const emptyAnswers = answers.some(answer => !answer);
    if (emptyAnswers) {
      toast.error('Please answer all questions');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Log all responses to console
      console.log({
        answers: {
          answer_1: answers[0],
          answer_2: answers[1],
          answer_3: answers[2],
          answer_4: answers[3],
          answer_5: answers[4],
          answer_6: answers[5],
        },
        title,
        description,
        image: image ? image.name : 'No image'
      });
      
      // API call to Flask backend would go here
      // Simulate API request
      const response = await fetch('http://localhost:5000/api/submit-feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: "user@example.com", // This would come from auth context in a real app
          answer_1: answers[0],
          answer_2: answers[1],
          answer_3: answers[2],
          answer_4: answers[3],
          answer_5: answers[4],
          answer_6: answers[5],
          title,
          description,
          image: image ? image.name : null
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit feedback');
      }
      
      // Show success message
      toast.success('Feedback submitted successfully!');
      setSubmitted(true);
      
    } catch (error) {
      toast.error('Error submitting feedback. Please try again later.');
      console.error('Submit error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calculate progress percentage
  const progressPercentage = ((currentStep + 1) / (questions.length + 1)) * 100;

  if (submitted) {
    return (
      <div className="w-full max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="flex flex-col items-center justify-center py-12 space-y-4">
          <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
            <div className="h-10 w-10 text-green-500">✓</div>
          </div>
          <h3 className="text-xl font-medium text-gray-800">Thank You!</h3>
          <p className="text-gray-600 text-center">
            Your feedback has been submitted successfully and will help us improve our services.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-500">
              Step {currentStep + 1} of {questions.length + 1}
            </span>
            <span className="text-sm font-medium text-primary">
              {Math.round(progressPercentage)}%
            </span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>
        
        {currentStep < questions.length ? (
          // Question steps
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800">{questions[currentStep]}</h3>
            
            <Textarea
              value={answers[currentStep]}
              onChange={(e) => handleAnswerChange(e.target.value)}
              placeholder="Type your answer here..."
              className="min-h-[120px]"
            />
            
            <div className="flex justify-between pt-4">
              <Button
                variant="outline"
                onClick={handlePrevStep}
                disabled={currentStep === 0}
                className="gap-1"
              >
                <ArrowLeft className="h-4 w-4" /> Back
              </Button>
              
              <Button onClick={handleNextStep} className="gap-1">
                Next <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : (
          // Final step - Title, Description and Image upload
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800">Additional Information</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium text-gray-700 block">
                  Title
                </label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter a title for your feedback"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium text-gray-700 block">
                  Description
                </label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Please provide any additional details"
                  className="min-h-[120px]"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 block">
                  Image (Optional)
                </label>
                <ImageUpload onImageChange={handleImageChange} />
              </div>
            </div>
            
            <div className="flex justify-between pt-4">
              <Button
                variant="outline"
                onClick={handlePrevStep}
                className="gap-1"
              >
                <ArrowLeft className="h-4 w-4" /> Back
              </Button>
              
              <Button 
                onClick={handleSubmit} 
                disabled={isSubmitting}
                className="gap-1 bg-primary"
              >
                {isSubmitting ? 'Submitting...' : 'Submit'} <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbackForm;
