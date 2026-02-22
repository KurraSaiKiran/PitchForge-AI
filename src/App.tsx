import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@/components/ui/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { AuthProvider } from '@/contexts/AuthContext';

// Layouts
import DashboardLayout from '@/components/layout/DashboardLayout';
import PublicLayout from '@/components/layout/PublicLayout';

// Pages
import Landing from '@/pages/Landing';
import Features from '@/pages/Features';
import HowItWorks from '@/pages/HowItWorks';

import Login from '@/pages/auth/Login';
import Signup from '@/pages/auth/Signup';
import GenerateProposal from '@/pages/dashboard/GenerateProposal';
import MyProposals from '@/pages/dashboard/MyProposals';
import Analytics from '@/pages/dashboard/Analytics';
import Templates from '@/pages/dashboard/Templates';
import Settings from '@/pages/dashboard/Settings';

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="pitchpro-theme">
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Landing />} />
              <Route path="/features" element={<Features />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
            </Route>
            
            {/* Auth Routes */}
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/signup" element={<Signup />} />
            
            {/* Dashboard Routes */}
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<Navigate to="/dashboard/generate" replace />} />
              <Route path="generate" element={<GenerateProposal />} />
              <Route path="proposals" element={<MyProposals />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="templates" element={<Templates />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
        </Router>
        <Toaster />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
