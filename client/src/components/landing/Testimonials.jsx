import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, Sparkles } from 'lucide-react';

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

export const Testimonials = () => {
  return (
    <section className="relative w-full py-20 overflow-hidden bg-navy">
      <div className="relative z-10 w-full px-6 sm:px-12 lg:px-20 xl:px-28">
        <div className="mb-16 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-white"
          >
            What Our <span className="text-light-blue">Students Say</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative rounded-2xl border border-light-blue/20 bg-navy/80 p-6 backdrop-blur-sm transition-all hover:border-light-blue/50 hover:shadow-xl hover:shadow-mid-blue/10"
            >
              <Quote className="absolute -top-3 -right-3 h-8 w-8 text-mid-blue/30" />
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-light-blue/20 text-2xl">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-white">{testimonial.name}</div>
                  <div className="text-sm text-light-blue/60">{testimonial.role}</div>
                </div>
              </div>
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-light-blue/80 leading-relaxed">{testimonial.content}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;