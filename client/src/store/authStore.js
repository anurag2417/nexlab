import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const mockUser = {
  id: '1',
  name: 'Anurag Kumar',
  email: 'anuragakn18@gmail.com',
  role: 'student',
  gamification: {
    xp: 450,
    level: 5,
    streak: 7,
  },
};

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: localStorage.getItem('token') || null,
      isLoading: false,
      error: null,

      login: async (email, password) => {
        set({ isLoading: true, error: null });
        
        try {
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          if (!email || !email.includes('@')) {
            throw new Error('Please enter a valid email address');
          }
          
          if (!password || password.length < 6) {
            throw new Error('Password must be at least 6 characters');
          }
          
          const mockToken = 'mock-jwt-token-' + Date.now();
          
          const user = {
            ...mockUser,
            email: email,
            name: email.split('@')[0] || 'User',
          };
          
          localStorage.setItem('token', mockToken);
          set({ 
            user, 
            token: mockToken, 
            isLoading: false,
            error: null
          });
          
          return { success: true };
          
        } catch (error) {
          set({ 
            error: error.message || 'Login failed. Please try again.',
            isLoading: false 
          });
          return { success: false, error: error.message };
        }
      },

      register: async (data) => {
        set({ isLoading: true, error: null });
        
        try {
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          if (!data.name || data.name.length < 2) {
            throw new Error('Please enter your full name');
          }
          
          if (!data.email || !data.email.includes('@')) {
            throw new Error('Please enter a valid email address');
          }
          
          if (!data.password || data.password.length < 6) {
            throw new Error('Password must be at least 6 characters');
          }
          
          if (data.password !== data.confirmPassword) {
            throw new Error('Passwords do not match');
          }
          
          const mockToken = 'mock-jwt-token-' + Date.now();
          
          const user = {
            id: '2',
            name: data.name,
            email: data.email,
            role: 'student',
            gamification: {
              xp: 0,
              level: 1,
              streak: 0,
            },
          };
          
          localStorage.setItem('token', mockToken);
          set({ 
            user, 
            token: mockToken, 
            isLoading: false,
            error: null
          });
          
          return { success: true };
          
        } catch (error) {
          set({ 
            error: error.message || 'Registration failed. Please try again.',
            isLoading: false 
          });
          return { success: false, error: error.message };
        }
      },

      logout: () => {
        localStorage.removeItem('token');
        set({ user: null, token: null, error: null });
      },

      clearError: () => set({ error: null }),

      setUser: (user) => set({ user }),
    }),
    {
      name: 'auth-storage',
    }
  )
);