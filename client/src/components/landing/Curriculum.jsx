import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check, Code, Database, Brain, Globe, BarChart3, Sparkles } from 'lucide-react';

const tiers = [
  {
    id: 1,
    icon: Globe,
    title: 'Digital Literacy',
    description: 'Learn the basics of the web and how technology works.',
    color: 'dark-blue',
    sprints: [
      'Introduction to the Internet',
      'Build your first webpage',
      'Create a personal portfolio',
    ],
  },
  {
    id: 2,
    icon: Code,
    title: 'Python Basics',
    description: 'Start your coding journey with Python programming.',
    color: 'mid-blue',
    sprints: [
      'Hello World & Variables',
      'Functions & Conditionals',
      'Build a Calculator App',
      'Create a Number Guessing Game',
    ],
  },
  {
    id: 3,
    icon: Database,
    title: 'Web Development',
    description: 'Build interactive websites with HTML, CSS, and JavaScript.',
    color: 'dark-blue',
    sprints: [
      'HTML & CSS Fundamentals',
      'Build a To-Do List App',
      'Create a Quiz App',
      'Weather App with APIs',
    ],
  },
  {
    id: 4,
    icon: Brain,
    title: 'AI & Machine Learning',
    description: 'Build real AI models and understand how they work.',
    color: 'mid-blue',
    sprints: [
      'Introduction to AI Concepts',
      'Build an Image Classifier',
      'Create a Chatbot',
      'Sentiment Analysis App',
    ],
  },
  {
    id: 5,
    icon: BarChart3,
    title: 'Data Science',
    description: 'Analyze data and create beautiful visualizations.',
    color: 'dark-blue',
    sprints: [
      'Data Analysis with Pandas',
      'Data Visualization with Matplotlib',
      'Student Performance Analyzer',
      'Build a Dashboard',
    ],
  },
];

export const Curriculum = () => {
  const [expandedTier, setExpandedTier] = useState(null);

  return (
    <section className="relative w-full py-20 overflow-hidden bg-light-blue/10">
      <div className="relative z-10 w-full px-6 sm:px-12 lg:px-20 xl:px-28">
        <div className="mb-16 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-navy"
          >
            Your Learning <span className="bg-gradient-to-r from-dark-blue to-mid-blue bg-clip-text text-transparent">Journey</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 w-full max-w-6xl mx-auto">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              viewport={{ once: true }}
              className="group rounded-2xl border border-light-blue bg-white backdrop-blur-sm transition-all hover:border-mid-blue hover:shadow-lg hover:shadow-mid-blue/10"
            >
              <button
                onClick={() => setExpandedTier(expandedTier === tier.id ? null : tier.id)}
                className="flex w-full items-center justify-between p-6 text-left"
              >
                <div className="flex items-center gap-4">
                  <div className={`rounded-xl bg-${tier.color}/10 p-3 transition-all group-hover:scale-110`}>
                    <tier.icon className={`h-5 w-5 text-${tier.color}`} />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`text-sm font-medium text-${tier.color}`}>Tier {tier.id}</span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-sm text-gray-500">{tier.sprints.length} sprints</span>
                    </div>
                    <h3 className="text-lg font-semibold text-navy">{tier.title}</h3>
                    <p className="text-sm text-gray-500">{tier.description}</p>
                  </div>
                </div>
                <ChevronDown
                  className={`h-5 w-5 text-gray-400 transition-transform duration-300 flex-shrink-0 ${
                    expandedTier === tier.id ? 'rotate-180' : ''
                  }`}
                />
              </button>
              
              <AnimatePresence>
                {expandedTier === tier.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-light-blue px-6 py-4">
                      <div className="space-y-3">
                        {tier.sprints.map((sprint, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: idx * 0.05 }}
                            className="flex items-center gap-3"
                          >
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100">
                              <Check className="h-4 w-4 text-green-600" />
                            </div>
                            <span className="text-sm text-gray-700">{sprint}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Curriculum;