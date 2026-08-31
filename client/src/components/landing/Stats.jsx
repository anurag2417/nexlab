import React from 'react';
import { motion } from 'framer-motion';
import { Users, Code2, Award, Clock, GraduationCap, Building2 } from 'lucide-react';

const stats = [
  { icon: Users, value: '500+', label: 'Students Trained', color: 'purple' },
  { icon: Code2, value: '1,200+', label: 'Projects Built', color: 'blue' },
  { icon: Award, value: '94%', label: 'Satisfaction Rate', color: 'green' },
  { icon: Clock, value: '12', label: 'Weeks to Mastery', color: 'orange' },
  { icon: GraduationCap, value: '50+', label: 'Schools Partnered', color: 'pink' },
  { icon: Building2, value: '15+', label: 'Indian States', color: 'cyan' },
];

export const Stats = () => {
  return (
    <section className="relative w-full py-20 overflow-hidden bg-[#0a0a0f]">
      <div className="relative z-10 w-full px-6 sm:px-12 lg:px-20 xl:px-28">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 w-full">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              viewport={{ once: true }}
              className="group relative rounded-2xl border border-gray-800/50 bg-gray-900/30 p-6 text-center backdrop-blur-sm transition-all hover:border-purple-500/30 hover:bg-gray-800/40 hover:shadow-lg hover:shadow-purple-500/5"
            >
              <div className="mb-3 flex justify-center transition-transform group-hover:scale-110 group-hover:-translate-y-1">
                <stat.icon className={`h-8 w-8 text-${stat.color}-400`} />
              </div>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="mt-1 text-sm text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;