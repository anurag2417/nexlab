import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Terminal, Users, Briefcase, Zap, Shield, Globe, Award } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'Build Real AI Projects',
    description: 'Chatbots, image recognizers, neural networks—you build them from scratch.',
    gradient: 'from-dark-blue to-mid-blue'
  },
  {
    icon: Terminal,
    title: 'Use Professional Tools',
    description: 'Python, PyTorch, Hugging Face, VS Code—the same tools AI engineers use.',
    gradient: 'from-dark-blue to-mid-blue'
  },
  {
    icon: Users,
    title: 'Learn by Doing',
    description: 'No passive lectures. Every session is hands-on coding with real-time feedback.',
    gradient: 'from-dark-blue to-mid-blue'
  },
  {
    icon: Briefcase,
    title: 'Build Your Portfolio',
    description: 'Graduate with 4 complete projects to show employers and universities.',
    gradient: 'from-dark-blue to-mid-blue'
  },
  {
    icon: Zap,
    title: 'Instant Feedback',
    description: 'Run your code and see results immediately. Learn faster with rapid iteration.',
    gradient: 'from-dark-blue to-mid-blue'
  },
  {
    icon: Shield,
    title: 'Guided Learning Path',
    description: 'Step-by-step sprints from beginner to advanced. No getting lost.',
    gradient: 'from-dark-blue to-mid-blue'
  },
  {
    icon: Globe,
    title: 'Indian Context',
    description: 'Curriculum aligned with CBSE and designed for Indian students.',
    gradient: 'from-dark-blue to-mid-blue'
  },
  {
    icon: Award,
    title: 'Earn Certificates',
    description: 'Get recognized for your achievements with digital certificates.',
    gradient: 'from-dark-blue to-mid-blue'
  },
];

export const Features = () => {
  return (
    <section className="relative w-full py-20 overflow-hidden bg-white">
      <div className="relative z-10 w-full px-6 sm:px-12 lg:px-20 xl:px-28">
        <div className="mb-16 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-navy"
          >
            Why <span className="bg-gradient-to-r from-dark-blue to-mid-blue bg-clip-text text-transparent">NexLab</span>?
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
              className="group relative rounded-2xl border border-light-blue bg-white p-6 backdrop-blur-sm transition-all hover:border-mid-blue hover:shadow-lg hover:shadow-mid-blue/10 hover:-translate-y-1"
            >
              <div className="mb-4 inline-flex rounded-xl bg-light-blue/50 p-3 transition-all group-hover:scale-110">
                <feature.icon className="h-6 w-6 text-dark-blue" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-navy">{feature.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;