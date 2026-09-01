import React, { useState } from 'react';
import { DashboardLayout } from '../layout/DashboardLayout';
import { ProjectGrid } from '../components/showcase/ProjectGrid';
import { FilterBar } from '../components/showcase/FilterBar';
import { motion } from 'framer-motion';
import { Rocket, Sparkles } from 'lucide-react';

const Showcase = () => {
  const [filter, setFilter] = useState('all');

  // Showcase projects only - No demo accounts
  const showcaseProjects = [
    {
      id: '1',
      title: 'AI Chatbot for Education',
      description: 'An intelligent chatbot that helps students learn AI concepts interactively.',
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
      title: 'Weather Prediction App',
      description: 'Real-time weather prediction using machine learning models.',
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
      title: 'Indian Bird Classifier',
      description: 'Image classification model to identify Indian bird species.',
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
      title: 'Student Performance Dashboard',
      description: 'Interactive dashboard to analyze and visualize student performance.',
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
      title: 'Smart Portfolio Website',
      description: 'A modern portfolio website with AI-powered personalization.',
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
      title: 'AI-Powered Number Guessing Game',
      description: 'A fun game where AI tries to guess the number you\'re thinking of.',
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
    ? showcaseProjects 
    : showcaseProjects.filter((p) => p.tier === parseInt(filter));

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
            <div className="rounded-xl bg-gradient-to-r from-roseKiss/20 to-petalRouge/20 p-3">
              <Rocket className="h-8 w-8 text-roseKiss" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Student Showcase</h1>
              <p className="text-gray-500">Explore amazing projects built by students</p>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <FilterBar currentFilter={filter} onFilterChange={setFilter} />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <ProjectGrid projects={filteredProjects} />
        </motion.div>

        {/* Showcase Stats */}
        <motion.div variants={itemVariants}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
            <div className="rounded-xl border border-powderBlush/30 bg-white/80 p-6 text-center shadow-sm">
              <div className="text-3xl font-bold text-roseKiss">{showcaseProjects.length}</div>
              <div className="text-sm text-gray-500">Total Projects</div>
            </div>
            <div className="rounded-xl border border-powderBlush/30 bg-white/80 p-6 text-center shadow-sm">
              <div className="text-3xl font-bold text-drySage">{showcaseProjects.filter(p => p.tier >= 4).length}</div>
              <div className="text-sm text-gray-500">Advanced Projects</div>
            </div>
            <div className="rounded-xl border border-powderBlush/30 bg-white/80 p-6 text-center shadow-sm">
              <div className="text-3xl font-bold text-petalRouge">
                {showcaseProjects.reduce((acc, p) => acc + p.likes, 0)}
              </div>
              <div className="text-sm text-gray-500">Total Likes</div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
};

export default Showcase;