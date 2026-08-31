import { useEffect } from 'react';
import { useAuthStore } from '../store/authStore';

export const useAuth = () => {
  const { user, token, isLoading, error, login, register, logout, clearError } = useAuthStore();

  useEffect(() => {
    if (token && !user) {
      // You could auto-fetch user here
    }
  }, [token, user]);

  return {
    user,
    token,
    isLoading,
    error,
    login,
    register,
    logout,
    clearError,
    isAuthenticated: !!user && !!token,
  };
};

export default useAuth;