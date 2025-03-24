
import React, { useState } from 'react';
import ImageUpload from './ImageUpload';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

const FeedbackForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleImageChange = (file: File | null) => {
    setImage(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description) {
      toast.error('Please provide both title and description');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API request
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Log the form data (in a real app, this would be sent to a backend)
      console.log({
        title,
        description,
        image: image ? image.name : 'No image'
      });
      
      // Show success message
      toast.success('Feedback submitted successfully!');
      setSubmitted(true);
      
      // Reset form after a delay
      setTimeout(() => {
        setTitle('');
        setDescription('');
        setImage(null);
        setSubmitted(false);
      }, 3000);
      
    } catch (error) {
      toast.error('Error submitting feedback');
      console.error('Submit error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto animate-fade-up">
      <div className="glass-panel rounded-xl p-8 form-shine">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Submit Feedback</h2>
        
        {submitted ? (
          <div className="flex flex-col items-center justify-center py-12 space-y-4 animate-fade-in">
            <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="h-10 w-10 text-green-500" />
            </div>
            <h3 className="text-xl font-medium text-gray-800">Thank You!</h3>
            <p className="text-gray-600 text-center">
              Your feedback has been submitted successfully.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium text-gray-700 block">
                Title
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="block w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/30 focus:border-primary transition duration-200 bg-white/60 backdrop-blur-sm"
                placeholder="Enter feedback title"
                required
                disabled={isSubmitting}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium text-gray-700 block">
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="block w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/30 focus:border-primary transition duration-200 bg-white/60 backdrop-blur-sm resize-none"
                placeholder="Please describe your feedback in detail"
                required
                disabled={isSubmitting}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 block">
                Image (Optional)
              </label>
              <ImageUpload onImageChange={handleImageChange} />
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/50 transition duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="loading-dots flex space-x-1">
                  <span className="h-2 w-2 rounded-full bg-white"></span>
                  <span className="h-2 w-2 rounded-full bg-white"></span>
                  <span className="h-2 w-2 rounded-full bg-white"></span>
                </div>
              ) : (
                'Submit Feedback'
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default FeedbackForm;
