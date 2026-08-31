import apiClient from './client';

export const sandboxAPI = {
  executeCode: async (data) => {
    const response = await apiClient.post('/sandbox/run', data);
    return response.data;
  },

  validateCode: async (data) => {
    const response = await apiClient.post('/sandbox/validate', data);
    return response.data;
  },

  getHistory: async () => {
    const response = await apiClient.get('/sandbox/history');
    return response.data.data;
  },
};