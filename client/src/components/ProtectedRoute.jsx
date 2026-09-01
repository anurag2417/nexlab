import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { Loader2 } from 'lucide-react';

const ProtectedRoute = () => {
  const { user, isAuthenticated, getCurrentUser, isLoading } = useAuthStore();
  const [isChecking, setIsChecking] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      if (!user && localStorage.getItem('token')) {
        await getCurrentUser();
      }
      setIsChecking(false);
    };
    
    checkAuth();
  }, [user, getCurrentUser]);

  if (isChecking || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-powderBlush/20 via-white to-petalRouge/10">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-roseKiss" />
          <p className="text-gray-600 font-medium">Verifying your session...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;