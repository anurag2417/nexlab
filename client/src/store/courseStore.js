import { create } from 'zustand';

// Demo data
const demoCourses = [
  {
    id: '1',
    title: 'Digital Literacy',
    description: 'Learn the basics of the web and how technology works.',
    tier: 1,
    icon: '🌐',
    color: 'blue',
    sprints: [
      { id: 's1', title: 'Introduction to the Internet' },
      { id: 's2', title: 'Build your first webpage' },
      { id: 's3', title: 'Create a personal portfolio' },
    ],
  },
  {
    id: '2',
    title: 'Python Basics',
    description: 'Start your coding journey with Python programming.',
    tier: 2,
    icon: '🐍',
    color: 'green',
    sprints: [
      { id: 's4', title: 'Hello World & Variables' },
      { id: 's5', title: 'Functions & Conditionals' },
      { id: 's6', title: 'Build a Calculator App' },
      { id: 's7', title: 'Create a Number Guessing Game' },
    ],
  },
  {
    id: '3',
    title: 'Web Development',
    description: 'Build interactive websites with HTML, CSS, and JavaScript.',
    tier: 3,
    icon: '💻',
    color: 'purple',
    sprints: [
      { id: 's8', title: 'HTML & CSS Fundamentals' },
      { id: 's9', title: 'Build a To-Do List App' },
      { id: 's10', title: 'Create a Quiz App' },
      { id: 's11', title: 'Weather App with APIs' },
    ],
  },
  {
    id: '4',
    title: 'AI & Machine Learning',
    description: 'Build real AI models and understand how they work.',
    tier: 4,
    icon: '🤖',
    color: 'orange',
    sprints: [
      { id: 's12', title: 'Introduction to AI Concepts' },
      { id: 's13', title: 'Build an Image Classifier' },
      { id: 's14', title: 'Create a Chatbot' },
      { id: 's15', title: 'Sentiment Analysis App' },
    ],
  },
  {
    id: '5',
    title: 'Data Science',
    description: 'Analyze data and create beautiful visualizations.',
    tier: 5,
    icon: '📊',
    color: 'red',
    sprints: [
      { id: 's16', title: 'Data Analysis with Pandas' },
      { id: 's17', title: 'Data Visualization with Matplotlib' },
      { id: 's18', title: 'Student Performance Analyzer' },
      { id: 's19', title: 'Build a Dashboard' },
    ],
  },
];

export const useCourseStore = create((set, get) => ({
  courses: [],
  currentCourse: null,
  currentSprint: null,
  progress: null,
  isLoading: false,
  error: null,

  fetchCourses: async () => {
    set({ isLoading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      set({ 
        courses: demoCourses, 
        isLoading: false 
      });
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Failed to fetch courses',
        isLoading: false 
      });
    }
  },

  fetchCourse: async (tier) => {
    set({ isLoading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      const course = demoCourses.find(c => c.tier === tier) || null;
      set({ currentCourse: course, isLoading: false });
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Failed to fetch course',
        isLoading: false 
      });
    }
  },

  fetchSprint: async (sprintId) => {
    set({ isLoading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      let sprint = null;
      for (const course of demoCourses) {
        const found = course.sprints.find(s => s.id === sprintId);
        if (found) {
          sprint = found;
          break;
        }
      }
      set({ currentSprint: sprint, isLoading: false });
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Failed to fetch sprint',
        isLoading: false 
      });
    }
  },

  fetchProgress: async () => {
    set({ isLoading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      const mockProgress = {
        currentTier: 2,
        completedSprints: ['s1', 's2', 's4'],
        totalSprintsCompleted: 3,
        lastActive: new Date(),
      };
      set({ progress: mockProgress, isLoading: false });
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Failed to fetch progress',
        isLoading: false 
      });
    }
  },

  markSprintComplete: async (sprintId) => {
    set({ isLoading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const currentProgress = get().progress;
      if (currentProgress) {
        const updatedProgress = {
          ...currentProgress,
          completedSprints: [...currentProgress.completedSprints, sprintId],
          totalSprintsCompleted: currentProgress.totalSprintsCompleted + 1,
        };
        set({ progress: updatedProgress, isLoading: false });
      }
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Failed to mark sprint complete',
        isLoading: false 
      });
    }
  },

  clearError: () => set({ error: null }),
}));