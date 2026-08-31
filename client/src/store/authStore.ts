import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authAPI, LoginData, RegisterData } from '../api/auth';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  gamification: {
    xp: number;
    level: number;
    streak: number;
  };
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  
  login: (data: LoginData) => Promise<{ success: boolean; error?: string }>;
  register: (data: RegisterData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  clearError: () => void;
  setUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: localStorage.getItem('token') || null,
      isLoading: false,
      error: null,

      login: async (data: LoginData) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authAPI.login(data);
          const { token, user } = response.data;
          localStorage.setItem('token', token);
          set({ 
            user, 
            token, 
            isLoading: false 
          });
          return { success: true };
        } catch (error: any) {
          const errorMessage = error.response?.data?.message || 'Login failed';
          set({ 
            error: errorMessage, 
            isLoading: false 
          });
          return { success: false, error: errorMessage };
        }
      },

      register: async (data: RegisterData) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authAPI.register(data);
          const { token, user } = response.data;
          localStorage.setItem('token', token);
          set({ 
            user, 
            token, 
            isLoading: false 
          });
          return { success: true };
        } catch (error: any) {
          const errorMessage = error.response?.data?.message || 'Registration failed';
          set({ 
            error: errorMessage, 
            isLoading: false 
          });
          return { success: false, error: errorMessage };
        }
      },

      logout: () => {
        localStorage.removeItem('token');
        set({ user: null, token: null, error: null });
      },

      clearError: () => set({ error: null }),

      setUser: (user: User) => set({ user }),
    }),
    {
      name: 'auth-storage',
    }
  )
);