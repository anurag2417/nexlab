import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check, Code, Database, Brain, Globe, BarChart3, Sparkles, Rocket, Zap, Award } from 'lucide-react';

const tiers = [
  {
    id: 1,
    title: 'Digital Literacy',
    icon: Globe,
    description: 'Learn the basics of the web and how technology works.',
    gradient: 'from-blue-500 to-cyan-500',
    color: 'blue',
    year: 'TIER 1',
    sprints: [
      'Introduction to the Internet',
      'Build your first webpage',
      'Create a personal portfolio',
    ],
    skills: ['HTML', 'CSS', 'Web Basics', 'Internet Fundamentals'],
    outcome: 'By Tier 1, you understand how the web works and can build your first webpage.',
  },
  {
    id: 2,
    title: 'Python Basics',
    icon: Code,
    description: 'Start your coding journey with Python programming.',
    gradient: 'from-green-500 to-emerald-500',
    color: 'green',
    year: 'TIER 2',
    sprints: [
      'Hello World & Variables',
      'Functions & Conditionals',
      'Build a Calculator App',
      'Create a Number Guessing Game',
    ],
    skills: ['Python', 'Functions', 'Conditionals', 'Loops'],
    outcome: 'By Tier 2, you write Python programs and build interactive applications.',
  },
  {
    id: 3,
    title: 'Web Development',
    icon: Database,
    description: 'Build interactive websites with HTML, CSS, and JavaScript.',
    gradient: 'from-purple-500 to-pink-500',
    color: 'purple',
    year: 'TIER 3',
    sprints: [
      'HTML & CSS Fundamentals',
      'Build a To-Do List App',
      'Create a Quiz App',
      'Weather App with APIs',
    ],
    skills: ['HTML/CSS', 'JavaScript', 'APIs', 'DOM Manipulation'],
    outcome: 'By Tier 3, you build full interactive web applications with APIs.',
  },
  {
    id: 4,
    title: 'AI & Machine Learning',
    icon: Brain,
    description: 'Build real AI models and understand how they work.',
    gradient: 'from-orange-500 to-yellow-500',
    color: 'orange',
    year: 'TIER 4',
    sprints: [
      'Introduction to AI Concepts',
      'Build an Image Classifier',
      'Create a Chatbot',
      'Sentiment Analysis App',
    ],
    skills: ['Python', 'TensorFlow', 'PyTorch', 'NLP'],
    outcome: 'By Tier 4, you build and deploy your own AI models.',
  },
  {
    id: 5,
    title: 'Data Science',
    icon: BarChart3,
    description: 'Analyze data and create beautiful visualizations.',
    gradient: 'from-red-500 to-rose-500',
    color: 'red',
    year: 'TIER 5',
    sprints: [
      'Data Analysis with Pandas',
      'Data Visualization with Matplotlib',
      'Student Performance Analyzer',
      'Build a Dashboard',
    ],
    skills: ['Pandas', 'Matplotlib', 'Data Analysis', 'Visualization'],
    outcome: 'By Tier 5, you analyze data and create professional dashboards.',
  },
];

export const Curriculum: React.FC = () => {
  const [expandedTier, setExpandedTier] = useState<number | null>(1);

  // Get color classes based on color name
  const getColorClasses = (color: string) => {
    const colorMap: Record<string, { border: string; bg: string; text: string; hover: string; glow: string }> = {
      blue: {
        border: 'border-blue-500/30',
        bg: 'bg-blue-500/10',
        text: 'text-blue-400',
        hover: 'hover:border-blue-500/50 hover:bg-blue-500/5',
        glow: 'shadow-blue-500/10'
      },
      green: {
        border: 'border-green-500/30',
        bg: 'bg-green-500/10',
        text: 'text-green-400',
        hover: 'hover:border-green-500/50 hover:bg-green-500/5',
        glow: 'shadow-green-500/10'
      },
      purple: {
        border: 'border-purple-500/30',
        bg: 'bg-purple-500/10',
        text: 'text-purple-400',
        hover: 'hover:border-purple-500/50 hover:bg-purple-500/5',
        glow: 'shadow-purple-500/10'
      },
      orange: {
        border: 'border-orange-500/30',
        bg: 'bg-orange-500/10',
        text: 'text-orange-400',
        hover: 'hover:border-orange-500/50 hover:bg-orange-500/5',
        glow: 'shadow-orange-500/10'
      },
      red: {
        border: 'border-red-500/30',
        bg: 'bg-red-500/10',
        text: 'text-red-400',
        hover: 'hover:border-red-500/50 hover:bg-red-500/5',
        glow: 'shadow-red-500/10'
      }
    };
    return colorMap[color] || colorMap.purple;
  };

  return (
    <section className="relative w-full py-20 sm:py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 w-full bg-[#0a0a0f]">
        <div className="absolute top-0 left-1/2 h-px w-1/2 bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
        <div className="absolute bottom-0 left-1/2 h-px w-1/2 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
      </div>
      
      <div className="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/5 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-blue-500/5 blur-3xl" />

      <div className="relative z-10 w-full px-6 sm:px-12 lg:px-20 xl:px-28">
        {/* Header */}
        <div className="mb-16 sm:mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-6 py-2 text-base font-medium text-purple-300 backdrop-blur-sm">
              <Sparkles className="h-4 w-4" />
              Your Learning Journey
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="mt-6 text-3xl sm:text-4xl md:text-5xl font-bold text-white"
          >
            From Beginner to{' '}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              AI Builder
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-4 text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto"
          >
            Complete 5 tiers with hands-on projects and build your AI portfolio
          </motion.p>
        </div>

        {/* Tier Navigation - Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {tiers.map((tier) => {
            const colors = getColorClasses(tier.color);
            return (
              <button
                key={tier.id}
                onClick={() => setExpandedTier(expandedTier === tier.id ? null : tier.id)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                  expandedTier === tier.id
                    ? `${colors.bg} ${colors.border} ${colors.text} shadow-lg`
                    : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50 hover:text-white border border-gray-700/30'
                }`}
              >
                <span className="flex items-center gap-2">
                  <tier.icon className={`h-4 w-4 ${expandedTier === tier.id ? colors.text : 'text-gray-500'}`} />
                  {tier.year}
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* Tier Content */}
        <div className="w-full">
          {tiers.map((tier, index) => {
            const colors = getColorClasses(tier.color);
            return (
              <AnimatePresence key={tier.id}>
                {expandedTier === tier.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.4 }}
                    className="w-full"
                  >
                    <div className={`rounded-2xl border ${colors.border} bg-gradient-to-br from-gray-900/90 to-gray-800/40 backdrop-blur-sm p-6 sm:p-8 lg:p-10 shadow-xl ${colors.glow}`}>
                      {/* Tier Header */}
                      <div className="flex items-start justify-between mb-6">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <span className={`text-sm font-semibold ${colors.text} tracking-wider`}>
                              {tier.year}
                            </span>
                            <span className="text-gray-600">•</span>
                            <span className={`text-sm font-medium ${colors.text}`}>
                              {tier.skills.length} Skills
                            </span>
                            <span className="text-gray-600">•</span>
                            <span className={`text-sm font-medium ${colors.text}`}>
                              {tier.sprints.length} Sprints
                            </span>
                          </div>
                          <h3 className="text-2xl sm:text-3xl font-bold text-white">
                            {tier.title}
                          </h3>
                          <p className="mt-2 text-base sm:text-lg text-gray-400 max-w-2xl">
                            {tier.description}
                          </p>
                        </div>
                        <div className={`hidden sm:flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${tier.gradient}/10`}>
                          <tier.icon className={`h-8 w-8 bg-gradient-to-br ${tier.gradient} bg-clip-text text-transparent`} />
                        </div>
                      </div>

                      {/* Sprints/Projects Section */}
                      <div className="mb-8">
                        <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                          <Rocket className="h-4 w-4" />
                          Sprints you'll complete
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {tier.sprints.map((sprint, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: idx * 0.05 }}
                              className={`flex items-start gap-3 rounded-xl border ${colors.border} bg-gray-800/30 p-4`}
                            >
                              <div className={`mt-0.5 h-5 w-5 flex-shrink-0 rounded-full bg-gradient-to-br ${tier.gradient}/20 flex items-center justify-center`}>
                                <Check className={`h-3 w-3 ${colors.text}`} />
                              </div>
                              <span className="text-sm sm:text-base text-gray-300">{sprint}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Skills Section */}
                      <div className="mb-8">
                        <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                          <Zap className="h-4 w-4" />
                          Skills you'll build
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {tier.skills.map((skill, idx) => (
                            <motion.span
                              key={idx}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.3, delay: idx * 0.03 }}
                              className={`px-4 py-2 rounded-full text-sm font-medium border ${colors.border} ${colors.bg} ${colors.text} hover:shadow-lg transition-all`}
                            >
                              {skill}
                            </motion.span>
                          ))}
                        </div>
                      </div>

                      {/* View Subject List */}
                      <div className="flex items-center justify-between flex-wrap gap-4 pt-4 border-t border-gray-800/50">
                        <button className={`inline-flex items-center gap-2 text-sm font-medium ${colors.text} hover:underline transition-all`}>
                          View Subject List
                          <ChevronDown className="h-4 w-4 rotate-[-90deg]" />
                        </button>
                      </div>

                      {/* Outcome */}
                      <div className={`mt-6 rounded-xl border ${colors.border} bg-gradient-to-br ${colors.bg} p-4 sm:p-5`}>
                        <p className="text-sm sm:text-base text-gray-300">
                          <span className={`font-semibold ${colors.text}`}>Outcome:</span> {tier.outcome}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-gray-400 text-base sm:text-lg mb-4">
            Ready to start your AI journey?
          </p>
          <a
            href="/register"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 text-base"
          >
            Join Now - It's Free
            <Rocket className="h-5 w-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Curriculum;