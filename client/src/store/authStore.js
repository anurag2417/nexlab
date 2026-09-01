import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authAPI } from '../api/auth';

// NO DEMO USER - All users must register

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: localStorage.getItem('token') || null,
      isLoading: false,
      error: null,
      isAuthenticated: false,

      // Register user - No demo accounts
      register: async (userData) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await authAPI.register(userData);
          const { token, user } = response.data;
          
          localStorage.setItem('token', token);
          set({ 
            user, 
            token, 
            isLoading: false,
            error: null,
            isAuthenticated: true,
          });
          
          return { success: true, user };
        } catch (error) {
          const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
          set({ 
            error: errorMessage, 
            isLoading: false,
            isAuthenticated: false,
          });
          return { success: false, error: errorMessage };
        }
      },

      // Login user - No demo accounts
      login: async (email, password) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await authAPI.login({ email, password });
          const { token, user } = response.data;
          
          localStorage.setItem('token', token);
          set({ 
            user, 
            token, 
            isLoading: false,
            error: null,
            isAuthenticated: true,
          });
          
          return { success: true, user };
        } catch (error) {
          const errorMessage = error.response?.data?.message || 'Login failed. Please check your credentials.';
          set({ 
            error: errorMessage, 
            isLoading: false,
            isAuthenticated: false,
          });
          return { success: false, error: errorMessage };
        }
      },

      // Get current user - Real data only
      getCurrentUser: async () => {
        const { token } = get();
        if (!token) {
          set({ isAuthenticated: false });
          return null;
        }

        set({ isLoading: true });
        
        try {
          const response = await authAPI.getCurrentUser();
          const user = response.data;
          
          set({ 
            user, 
            isLoading: false,
            isAuthenticated: true,
          });
          
          return user;
        } catch (error) {
          localStorage.removeItem('token');
          set({ 
            user: null, 
            token: null, 
            isLoading: false,
            isAuthenticated: false,
          });
          return null;
        }
      },

      // Logout user
      logout: async () => {
        await authAPI.logout();
        set({ 
          user: null, 
          token: null, 
          isLoading: false,
          error: null,
          isAuthenticated: false,
        });
      },

      // Clear error
      clearError: () => set({ error: null }),

      // Update user
      updateUser: (userData) => {
        set((state) => ({
          user: { ...state.user, ...userData },
        }));
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);