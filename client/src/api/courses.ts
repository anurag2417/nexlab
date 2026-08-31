import apiClient from './client';

export interface Sprint {
  id: string;
  title: string;
  description: string;
  tier: number;
  order: number;
  content: string;
  starterCode: string;
  estimatedTime: number;
  isActive: boolean;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  tier: number;
  icon: string;
  color: string;
  sprints: Sprint[];
  estimatedHours: number;
  prerequisites: string[];
  learningObjectives: string[];
  isActive: boolean;
}

export interface UserProgress {
  currentTier: number;
  completedSprints: string[];
  totalSprintsCompleted: number;
  lastActive: Date;
}

export const courseAPI = {
  getAllCourses: async (): Promise<Course[]> => {
    const response = await apiClient.get('/courses');
    return response.data.data;
  },

  getCourseByTier: async (tier: number): Promise<Course> => {
    const response = await apiClient.get(`/courses/tier/${tier}`);
    return response.data.data;
  },

  getSprint: async (sprintId: string): Promise<Sprint> => {
    const response = await apiClient.get(`/courses/sprints/${sprintId}`);
    return response.data.data;
  },

  getUserProgress: async (): Promise<UserProgress> => {
    const response = await apiClient.get('/courses/progress');
    return response.data.data;
  },

  markSprintComplete: async (sprintId: string): Promise<void> => {
    await apiClient.post('/courses/progress', { sprintId });
  },
};