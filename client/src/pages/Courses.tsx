import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { CourseCard } from '../components/dashboard/CourseCard';

import { motion } from 'framer-motion';
import { BookOpen, Search, GraduationCap, Lock, CheckCircle, Layers } from 'lucide-react';
import { Input } from '../components/ui/Input';

// Demo courses data
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
    completedSprints: ['s1', 's2'],
    isLocked: false,
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
    completedSprints: ['s4'],
    isLocked: false,
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
    completedSprints: [],
    isLocked: true,
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
    completedSprints: [],
    isLocked: true,
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
    completedSprints: [],
    isLocked: true,
  },
];

const Courses: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCourses, setFilteredCourses] = useState(demoCourses);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredCourses(demoCourses);
    } else {
      const filtered = demoCourses.filter(
        (course) =>
          course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCourses(filtered);
    }
  }, [searchTerm]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  // Stats
  const totalCourses = demoCourses.length;
  const availableCourses = demoCourses.filter(c => !c.isLocked).length;
  const lockedCourses = demoCourses.filter(c => c.isLocked).length;
  const totalSprints = demoCourses.reduce((acc, c) => acc + c.sprints.length, 0);

  return (
    <DashboardLayout>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        <motion.div variants={itemVariants}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <BookOpen className="h-8 w-8 text-primary-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">All Courses</h1>
                <p className="text-gray-500">Choose a course to start learning</p>
              </div>
            </div>
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 rounded-lg shadow-sm"
              />
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCourses.length === 0 ? (
              <div className="col-span-full text-center py-12 bg-white rounded-2xl border border-gray-200/50">
                <p className="text-gray-500">No courses found matching your search.</p>
              </div>
            ) : (
              filteredCourses.map((course) => {
                const totalSprints = course.sprints.length;
                const completedSprints = course.completedSprints.length;
                const progressPercent = totalSprints > 0 
                  ? (completedSprints / totalSprints) * 100 
                  : 0;

                return (
                  <CourseCard
                    key={course.id}
                    id={course.id}
                    title={course.title}
                    description={course.description}
                    tier={course.tier}
                    icon={course.icon}
                    color={course.color}
                    progress={progressPercent}
                    totalSprints={totalSprints}
                    completedSprints={completedSprints}
                    isLocked={course.isLocked}
                  />
                );
              })
            )}
          </div>
        </motion.div>

        {/* Stats Section - Fixed Colors */}
        <motion.div variants={itemVariants}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
            <div className="rounded-xl border border-gray-200/60 bg-white p-4 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="text-2xl font-bold text-gray-900">{totalCourses}</div>
              <div className="text-sm text-gray-500 flex items-center justify-center gap-1">
                <Layers className="h-4 w-4 text-gray-400" />
                Total Courses
              </div>
            </div>
            <div className="rounded-xl border border-green-200/60 bg-green-50/50 p-4 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="text-2xl font-bold text-green-700">{availableCourses}</div>
              <div className="text-sm text-green-600 flex items-center justify-center gap-1">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Available
              </div>
            </div>
            <div className="rounded-xl border border-amber-200/60 bg-amber-50/50 p-4 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="text-2xl font-bold text-amber-700">{lockedCourses}</div>
              <div className="text-sm text-amber-600 flex items-center justify-center gap-1">
                <Lock className="h-4 w-4 text-amber-500" />
                Locked
              </div>
            </div>
            <div className="rounded-xl border border-primary-200/60 bg-primary-50/50 p-4 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="text-2xl font-bold text-primary-700">{totalSprints}</div>
              <div className="text-sm text-primary-600 flex items-center justify-center gap-1">
                <GraduationCap className="h-4 w-4 text-primary-500" />
                Total Sprints
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
};

export default Courses;