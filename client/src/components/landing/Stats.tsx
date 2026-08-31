import React from 'react';
import { motion } from 'framer-motion';
import { Users, Code2, Award, Clock, GraduationCap, Building2, TrendingUp, Globe } from 'lucide-react';

const stats = [
  { icon: Users, value: '500+', label: 'Students Trained', color: 'purple' },
  { icon: Code2, value: '1,200+', label: 'Projects Built', color: 'blue' },
  { icon: Award, value: '94%', label: 'Satisfaction Rate', color: 'green' },
  { icon: Clock, value: '12', label: 'Weeks to Mastery', color: 'orange' },
  { icon: GraduationCap, value: '50+', label: 'Schools Partnered', color: 'pink' },
  { icon: Building2, value: '15+', label: 'Indian States', color: 'cyan' },
  { icon: TrendingUp, value: '98%', label: 'Skill Improvement', color: 'emerald' },
  { icon: Globe, value: '100%', label: 'Online Access', color: 'indigo' },
];

export const Stats: React.FC = () => {
  return (
    <section className="relative w-full py-16 sm:py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 w-full bg-gradient-to-b from-[#0a0a0f] via-[#0d0d1a] to-[#0a0a0f]" />
      <div className="absolute top-0 left-1/2 h-px w-1/2 bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
      
      <div className="relative z-10 w-full px-6 sm:px-12 lg:px-20 xl:px-28">
        {/* Header */}
        <div className="mb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="inline-block rounded-full border border-purple-500/30 bg-purple-500/10 px-6 py-2 text-sm font-medium text-purple-300 backdrop-blur-sm">
              Our Impact
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="mt-4 text-2xl sm:text-3xl font-bold text-white"
          >
            Building the future of{' '}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              AI education in India
            </span>
          </motion.h2>
        </div>

        {/* Stats Grid - 2 Rows x 4 Columns */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5 md:gap-6 w-full">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="group relative rounded-2xl border border-gray-800/50 bg-gray-900/30 p-6 sm:p-7 md:p-8 text-center backdrop-blur-sm transition-all hover:border-purple-500/30 hover:bg-gray-800/40 hover:shadow-xl hover:shadow-purple-500/5 hover:-translate-y-1"
            >
              {/* Icon with glow effect */}
              <div className={`mb-3 flex justify-center transition-transform group-hover:scale-110 group-hover:-translate-y-1`}>
                <div className="relative">
                  <div className={`absolute -inset-2 rounded-full bg-${stat.color}-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  <stat.icon className={`h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 text-${stat.color}-400 relative z-10`} />
                </div>
              </div>
              
              {/* Value */}
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white group-hover:scale-105 transition-transform duration-300">
                {stat.value}
              </div>
              
              {/* Label */}
              <div className="mt-1.5 text-xs sm:text-sm text-gray-400 font-medium">
                {stat.label}
              </div>

              {/* Animated underline on hover */}
              <div className={`absolute bottom-0 left-1/2 h-0.5 w-0 bg-gradient-to-r ${stat.color}-500 to-${stat.color}-400 transition-all duration-300 group-hover:w-1/2 group-hover:left-1/4`} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;