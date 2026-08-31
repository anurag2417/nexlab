import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Terminal, Users, Briefcase, Zap, Shield, Globe, Award } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'Build Real AI Projects',
    description: 'Chatbots, image recognizers, neural networks—you build them from scratch.',
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    icon: Terminal,
    title: 'Use Professional Tools',
    description: 'Python, PyTorch, Hugging Face, VS Code—the same tools AI engineers use.',
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Users,
    title: 'Learn by Doing',
    description: 'No passive lectures. Every session is hands-on coding with real-time feedback.',
    gradient: 'from-green-500 to-emerald-500'
  },
  {
    icon: Briefcase,
    title: 'Build Your Portfolio',
    description: 'Graduate with 4 complete projects to show employers and universities.',
    gradient: 'from-orange-500 to-yellow-500'
  },
  {
    icon: Zap,
    title: 'Instant Feedback',
    description: 'Run your code and see results immediately. Learn faster with rapid iteration.',
    gradient: 'from-yellow-500 to-amber-500'
  },
  {
    icon: Shield,
    title: 'Guided Learning Path',
    description: 'Step-by-step sprints from beginner to advanced. No getting lost.',
    gradient: 'from-red-500 to-rose-500'
  },
  {
    icon: Globe,
    title: 'Indian Context',
    description: 'Curriculum aligned with CBSE and designed for Indian students.',
    gradient: 'from-teal-500 to-cyan-500'
  },
  {
    icon: Award,
    title: 'Earn Certificates',
    description: 'Get recognized for your achievements with digital certificates.',
    gradient: 'from-pink-500 to-rose-500'
  },
];

export const Features = () => {
  return (
    <section className="relative w-full py-20 overflow-hidden bg-[#0a0a0f]">
      <div className="relative z-10 w-full px-6 sm:px-12 lg:px-20 xl:px-28">
        <div className="mb-16 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-white"
          >
            Why <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">NexLab</span>?
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.06 }}
              viewport={{ once: true }}
              className="group relative rounded-2xl border border-gray-800/50 bg-gray-900/30 p-6 backdrop-blur-sm transition-all hover:border-gray-700/50 hover:bg-gray-800/40 hover:shadow-xl hover:shadow-purple-500/5"
            >
              <div className="mb-4 inline-flex rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-3 transition-all group-hover:scale-110">
                <feature.icon className="h-6 w-6 bg-gradient-to-br from-purple-400 to-pink-400 bg-clip-text text-transparent" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-white">{feature.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;