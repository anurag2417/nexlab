import React, { useState } from 'react';
import { DashboardLayout } from '../layout/DashboardLayout';
import { ProjectGrid } from '../components/showcase/ProjectGrid';
import { FilterBar } from '../components/showcase/FilterBar';
import { motion } from 'framer-motion';
import { Rocket } from 'lucide-react';

const Showcase = () => {
  const [filter, setFilter] = useState('all');

  // Mock data
  const projects = [
    {
      id: '1',
      title: 'AI Chatbot',
      description: 'A chatbot that answers questions about Indian history.',
      author: 'Priya Sharma',
      tier: 4,
      image: '🤖',
      likes: 45,
      comments: 12,
      views: 230,
      status: 'approved',
      isPublic: true,
    },
    {
      id: '2',
      title: 'Weather App',
      description: 'Get real-time weather updates for any city in India.',
      author: 'Arjun Kumar',
      tier: 3,
      image: '🌤️',
      likes: 32,
      comments: 8,
      views: 156,
      status: 'approved',
      isPublic: true,
    },
    {
      id: '3',
      title: 'Image Classifier',
      description: 'Identify Indian birds from photos.',
      author: 'Ananya Reddy',
      tier: 4,
      image: '🦅',
      likes: 67,
      comments: 15,
      views: 312,
      status: 'approved',
      isPublic: true,
    },
    {
      id: '4',
      title: 'Student Performance Analyzer',
      description: 'Analyze and visualize student performance data.',
      author: 'Rahul Singh',
      tier: 5,
      image: '📊',
      likes: 28,
      comments: 6,
      views: 98,
      status: 'approved',
      isPublic: true,
    },
    {
      id: '5',
      title: 'Portfolio Website',
      description: 'A personal portfolio website with dark theme.',
      author: 'Sneha Patel',
      tier: 1,
      image: '🌐',
      likes: 19,
      comments: 4,
      views: 67,
      status: 'approved',
      isPublic: true,
    },
    {
      id: '6',
      title: 'Number Guessing Game',
      description: 'A fun Python game to guess the correct number.',
      author: 'Amit Kumar',
      tier: 2,
      image: '🎯',
      likes: 23,
      comments: 5,
      views: 89,
      status: 'approved',
      isPublic: true,
    },
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter((p) => p.tier === parseInt(filter));

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

  return (
    <DashboardLayout>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        <motion.div variants={itemVariants}>
          <div className="flex items-center gap-3">
            <Rocket className="h-8 w-8 text-primary-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Student Showcase</h1>
              <p className="text-gray-500">Explore projects built by students like you</p>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <FilterBar currentFilter={filter} onFilterChange={setFilter} />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <ProjectGrid projects={filteredProjects} />
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
};

export default Showcase;