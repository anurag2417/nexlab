import React, { useEffect } from 'react';
import { useCourseStore } from '../store/courseStore';

const Debug = () => {
  const { courses, fetchCourses } = useCourseStore();

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Course Data Debug</h1>
      <pre className="bg-gray-100 p-4 rounded-lg overflow-auto">
        {JSON.stringify(courses, null, 2)}
      </pre>
    </div>
  );
};

export default Debug;