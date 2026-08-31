import apiClient from './client';

export const authAPI = {
  login: async (data) => {
    const response = await apiClient.post('/auth/login', data);
    return response.data;
  },

  register: async (data) => {
    const response = await apiClient.post('/auth/register', data);
    return response.data;
  },

  logout: async () => {
    await apiClient.post('/auth/logout');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: async () => {
    const response = await apiClient.get('/auth/me');
    return response.data;
  },

  forgotPassword: async (email) => {
    const response = await apiClient.post('/auth/forgot-password', { email });
    return response.data;
  },

  resetPassword: async (token, password) => {
    const response = await apiClient.post(`/auth/reset-password/${token}`, { password });
    return response.data;
  },
};