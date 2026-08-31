import { useEffect } from 'react';
import { useCourseStore } from '../store/courseStore';

export const useCourses = () => {
  const {
    courses,
    currentCourse,
    currentSprint,
    progress,
    isLoading,
    error,
    fetchCourses,
    fetchCourse,
    fetchSprint,
    fetchProgress,
    markSprintComplete,
    clearError,
  } = useCourseStore();

  useEffect(() => {
    fetchCourses();
    fetchProgress();
  }, []);

  return {
    courses,
    currentCourse,
    currentSprint,
    progress,
    isLoading,
    error,
    fetchCourses,
    fetchCourse,
    fetchSprint,
    fetchProgress,
    markSprintComplete,
    clearError,
  };
};