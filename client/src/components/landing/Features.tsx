import React from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, Terminal, Users, Briefcase, Zap, Shield, Globe, Award
} from 'lucide-react';

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

export const Features: React.FC = () => {
  return (
    <section className="relative w-full py-20 sm:py-24 overflow-hidden">
      <div className="absolute inset-0 w-full bg-[#0a0a0f]">
        <div className="absolute top-0 left-1/2 h-px w-1/2 bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
      </div>

      <div className="relative z-10 w-full px-6 sm:px-12 lg:px-20 xl:px-28">
        <div className="mb-16 sm:mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="inline-block rounded-full border border-purple-500/30 bg-purple-500/10 px-6 py-2 text-base font-medium text-purple-300 backdrop-blur-sm">
              Why NexLab?
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="mt-6 text-3xl sm:text-4xl md:text-5xl font-bold text-white"
          >
            The only platform that combines
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              AI theory with real coding
            </span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 w-full">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.06 }}
              viewport={{ once: true }}
              className="group relative rounded-2xl border border-gray-800/50 bg-gray-900/30 p-6 sm:p-7 backdrop-blur-sm transition-all hover:border-gray-700/50 hover:bg-gray-800/40 hover:shadow-xl hover:shadow-purple-500/5"
            >
              <div className={`mb-4 inline-flex rounded-xl bg-gradient-to-br ${feature.gradient}/10 p-3.5 transition-all group-hover:scale-110 group-hover:shadow-lg`}>
                <feature.icon className={`h-7 w-7 sm:h-8 sm:w-8 bg-gradient-to-br ${feature.gradient} bg-clip-text text-transparent`} />
              </div>
              <h3 className="mb-2 text-lg sm:text-xl font-semibold text-white">
                {feature.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;