import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Courses from './pages/Courses';
import Sandbox from './pages/Sandbox';
import Showcase from './pages/Showcase';
import Profile from './pages/Profile';
import Leaderboard from './pages/Leaderboard';
import Settings from './pages/Settings';
import ProtectedRoute from './components/ProtectedRoute';
import { ToastContainer, useToast } from './components/ui/Toast';
import ScrollToTop from './components/ui/ScrollToTop';
import { useAuthStore } from './store/authStore';

function App() {
  const { toasts, removeToast } = useToast();
  const { getCurrentUser } = useAuthStore();

  // Listen for storage changes
  useEffect(() => {
    const handleStorageChange = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        await getCurrentUser();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [getCurrentUser]);

  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <div className="min-h-screen bg-white">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/showcase" element={<Showcase />} />
          
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/sandbox/:sprintId" element={<Sandbox />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        
        <ToastContainer toasts={toasts} removeToast={removeToast} />
        <ScrollToTop />
      </div>
    </Router>
  );
}

export default App;