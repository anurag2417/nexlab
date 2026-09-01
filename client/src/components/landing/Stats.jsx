import React from 'react';
import { motion } from 'framer-motion';
import { Users, Code2, Award, Clock, GraduationCap, Building2 } from 'lucide-react';

const stats = [
  { icon: Users, value: '500+', label: 'Students Trained', color: 'moss' },
  { icon: Code2, value: '1,200+', label: 'Projects Built', color: 'sage' },
  { icon: Award, value: '94%', label: 'Satisfaction Rate', color: 'forest' },
  { icon: Clock, value: '12', label: 'Weeks to Mastery', color: 'moss' },
  { icon: GraduationCap, value: '50+', label: 'Schools Partnered', color: 'sage' },
  { icon: Building2, value: '15+', label: 'Indian States', color: 'forest' },
];

export const Stats = () => {
  return (
    <section className="relative w-full py-20 overflow-hidden bg-gradient-to-b from-white via-cream/10 to-white">
      <div className="relative z-10 w-full px-6 sm:px-12 lg:px-20 xl:px-28">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 w-full">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              viewport={{ once: true }}
              className="group relative rounded-2xl border border-cream/30 bg-white/80 backdrop-blur-sm p-6 text-center shadow-sm transition-all hover:shadow-xl hover:shadow-moss/5 hover:-translate-y-1"
            >
              <div className="mb-3 flex justify-center transition-transform group-hover:scale-110 group-hover:-translate-y-1">
                <stat.icon className={`h-8 w-8 text-${stat.color}`} />
              </div>
              <div className="text-2xl font-bold text-forest">{stat.value}</div>
              <div className="mt-1 text-sm text-deepForest/60">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;