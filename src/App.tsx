
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import OTP from "./pages/OTP";
import Survey from "./pages/Survey";
import AirlineSelection from "./pages/AirlineSelection";
import Reward from "./pages/Reward";
import Feedback from "./pages/Feedback";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>
          <Toaster />
          <Sonner position="top-right" />
          <Routes>
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/" element={<Login />} />
            <Route path="/otp" element={<OTP />} />
            <Route path="/survey" element={<Survey />} />
            <Route path="/airline-selection" element={<AirlineSelection />} />
            <Route path="/reward" element={<Reward />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
