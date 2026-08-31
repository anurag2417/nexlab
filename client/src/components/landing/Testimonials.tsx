import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, Sparkles, Users } from 'lucide-react';

const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'Class 11 Student, Delhi',
    content: 'NexLab completely changed how I see AI. I built my first chatbot in just 2 weeks! Now I want to study computer science in college.',
    rating: 5,
    avatar: '👩‍🎓',
  },
  {
    name: 'Arjun Kumar',
    role: 'Class 10 Student, Bangalore',
    content: 'I never thought I could build an image recognizer. The step-by-step guidance made it so easy. This is way better than my school computer classes.',
    rating: 5,
    avatar: '👨‍🎓',
  },
  {
    name: 'Ananya Reddy',
    role: 'Class 12 Student, Hyderabad',
    content: 'The projects I built on NexLab helped me get into my dream college. They loved that I had real AI projects in my portfolio.',
    rating: 5,
    avatar: '👩‍💻',
  },
];

export const Testimonials: React.FC = () => {
  return (
    <section className="relative w-full py-20 sm:py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 w-full bg-[#0a0a0f]">
        <div className="absolute top-0 left-1/2 h-px w-1/2 bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
        <div className="absolute bottom-0 left-1/2 h-px w-1/2 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
      </div>
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/5 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full bg-blue-500/5 blur-3xl" />
      <div className="absolute top-0 left-0 h-[300px] w-[300px] rounded-full bg-pink-500/5 blur-3xl" />

      <div className="relative z-10 w-full px-6 sm:px-12 lg:px-20 xl:px-28">
        {/* Header */}
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-6 py-2 text-base font-medium text-purple-300 backdrop-blur-sm">
              <Users className="h-4 w-4" />
              Student Stories
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="mt-6 text-3xl sm:text-4xl md:text-5xl font-bold text-white"
          >
            What Our{' '}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Students Say
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-4 text-lg sm:text-xl text-gray-400"
          >
            Real stories from real students across India
          </motion.p>
        </div>

        {/* Testimonials Grid - Bigger Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative rounded-2xl border border-gray-800/50 bg-gradient-to-br from-gray-900/40 to-gray-800/20 p-8 backdrop-blur-sm transition-all hover:border-purple-500/30 hover:bg-gray-800/40 hover:shadow-2xl hover:shadow-purple-500/10 hover:-translate-y-2"
            >
              {/* Decorative quote icon */}
              <Quote className="absolute -top-4 -right-3 h-12 w-12 text-purple-500/20 group-hover:text-purple-500/30 transition-colors duration-500" />
              
              {/* Rating stars - Bigger */}
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Content */}
              <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-6">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 pt-4 border-t border-gray-800/50">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-purple-500/30 to-pink-500/30 text-3xl shadow-lg shadow-purple-500/10">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-white text-lg">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-400">
                    {testimonial.role}
                  </div>
                </div>
              </div>

              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-blue-500/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" />
            </motion.div>
          ))}
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
            Join 500+ students already building their AI future
          </p>
          <a
            href="/register"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 text-base"
          >
            Start Your Journey Today
            <Sparkles className="h-5 w-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;