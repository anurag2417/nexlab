import apiClient from './client';

export const courseAPI = {
  getAllCourses: async () => {
    const response = await apiClient.get('/courses');
    return response.data.data;
  },

  getCourseByTier: async (tier) => {
    const response = await apiClient.get(`/courses/tier/${tier}`);
    return response.data.data;
  },

  getSprint: async (sprintId) => {
    const response = await apiClient.get(`/courses/sprints/${sprintId}`);
    return response.data.data;
  },

  getUserProgress: async () => {
    const response = await apiClient.get('/courses/progress');
    return response.data.data;
  },

  markSprintComplete: async (sprintId) => {
    await apiClient.post('/courses/progress', { sprintId });
  },
};