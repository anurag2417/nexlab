import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Rocket, Star, Zap } from 'lucide-react';
import { Button } from '../ui/Button';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

export const Hero = () => {
  const { user } = useAuthStore();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  const floatAnimation = {
    y: [0, -8, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-12">
      <div className="absolute top-1/4 left-1/4 h-[600px] w-[600px] rounded-full bg-purple-600/20 blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 h-[600px] w-[600px] rounded-full bg-blue-600/20 blur-3xl animate-pulse-slow delay-1000" />
      
      <div 
        className="absolute inset-0 w-full opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px',
        }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full px-6 sm:px-12 lg:px-20 xl:px-28"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start lg:items-center w-full">
          <div className="text-center lg:text-left w-full">
            <motion.div
              variants={itemVariants}
              className="mb-8 inline-flex items-center gap-3 rounded-full border border-purple-500/30 bg-purple-500/10 px-6 py-3 text-base text-purple-300 backdrop-blur-sm"
              animate={floatAnimation}
            >
              <Sparkles className="h-5 w-5 text-purple-400" />
              <span className="font-medium text-base">🎓 Now enrolling for Winter 2025 Cohort</span>
              <span className="ml-2 rounded-full bg-purple-500/20 px-3 py-1 text-sm">Limited Seats</span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="mb-6 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-tight"
            >
              <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                Learn AI by
              </span>
              <br />
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                  Building
                </span>
              </span>
              <span className="block mt-3 text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-gray-400 font-light">
                Not just watching
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="max-w-2xl text-lg sm:text-xl md:text-2xl text-gray-400 leading-relaxed"
            >
              Build chatbots, image recognizers, and neural networks—all guided step-by-step.
              <span className="block mt-2 text-purple-400 font-medium text-xl">No boring PowerPoints. Just real code.</span>
            </motion.p>

            <motion.div variants={itemVariants} className="mt-10 flex flex-col sm:flex-row gap-5">
              {user ? (
                <Link to="/dashboard">
                  <Button size="lg" className="group relative overflow-hidden bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 shadow-lg shadow-purple-500/25 w-full sm:w-auto px-10 py-7 text-lg">
                    <span className="relative z-10 flex items-center">
                      Go to Dashboard
                      <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Button>
                </Link>
              ) : (
                <Link to="/register">
                  <Button size="lg" className="group relative overflow-hidden bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 shadow-lg shadow-purple-500/25 w-full sm:w-auto px-10 py-7 text-lg">
                    <span className="relative z-10 flex items-center">
                      <Sparkles className="mr-3 h-6 w-6" />
                      Start Building for Free
                      <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Button>
                </Link>
              )}
              <Link to="/showcase">
                <Button variant="outline" size="lg" className="border-gray-700 text-gray-300 hover:border-purple-500 hover:text-white hover:bg-purple-500/10 w-full sm:w-auto px-10 py-7 text-lg">
                  <Rocket className="mr-3 h-6 w-6" />
                  See Student Projects
                </Button>
              </Link>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-10 flex flex-wrap items-center gap-5 text-base text-gray-500">
              <span className="flex items-center gap-2.5">
                <span className="flex -space-x-2">
                  {['👩‍🎓', '👨‍🎓', '👩‍💻', '👨‍💻', '🧑‍🎓'].map((emoji, i) => (
                    <span key={i} className="inline-block h-8 w-8 rounded-full bg-gray-800 ring-2 ring-[#0a0a0f] flex items-center justify-center text-sm">
                      {emoji}
                    </span>
                  ))}
                </span>
                <span className="text-gray-400">500+ students trained</span>
              </span>
              <span className="flex items-center gap-2 text-gray-400">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                4.9/5 average rating
              </span>
              <span className="flex items-center gap-2 text-gray-400">
                <Zap className="h-5 w-5 text-yellow-400" />
                12-week immersive program
              </span>
            </motion.div>
          </div>

          {/* Right Column - Code Preview */}
          <motion.div
            variants={itemVariants}
            className="w-full"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="group relative rounded-2xl border border-gray-800 bg-[#0d0d14] p-1.5 shadow-2xl shadow-purple-500/10 transition-all hover:border-purple-500/30 hover:shadow-purple-500/20 w-full">
              <div className="relative rounded-xl bg-[#0a0a0f] p-6 sm:p-8 w-full">
                <div className="flex items-center gap-4 border-b border-gray-800 pb-4 sm:pb-5">
                  <div className="flex gap-2.5">
                    <div className="h-3 w-3 sm:h-3.5 sm:w-3.5 rounded-full bg-red-500/80" />
                    <div className="h-3 w-3 sm:h-3.5 sm:w-3.5 rounded-full bg-yellow-500/80" />
                    <div className="h-3 w-3 sm:h-3.5 sm:w-3.5 rounded-full bg-green-500/80" />
                  </div>
                  <span className="ml-3 text-sm sm:text-base text-gray-500 font-mono">main.py</span>
                </div>
                
                <div className="mt-4 sm:mt-6 overflow-x-auto">
                  <pre className="text-left text-sm sm:text-base md:text-lg font-mono text-gray-300 leading-loose whitespace-pre-wrap break-words">
                    <code>
                      <span className="text-purple-400">import</span> torch
                      <br />
                      <span className="text-purple-400">import</span> torch.nn <span className="text-purple-400">as</span> nn
                      <br />
                      <br />
                      <span className="text-purple-400">class</span> <span className="text-yellow-400">NeuralNetwork</span>(nn.Module):
                      <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">def</span> <span className="text-yellow-400">__init__</span>(self):
                      <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">super</span>().__init__()
                      <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.fc1 = nn.Linear(<span className="text-blue-400">784</span>, <span className="text-blue-400">128</span>)
                      <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.fc2 = nn.Linear(<span className="text-blue-400">128</span>, <span className="text-blue-400">10</span>)
                      <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">def</span> <span className="text-yellow-400">forward</span>(self, x):
                      <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;x = torch.relu(self.fc1(x))
                      <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">return</span> self.fc2(x)
                      <br />
                      <br />
                      model = <span className="text-yellow-400">NeuralNetwork</span>()
                      <br />
                      <span className="text-green-400">print</span>(<span className="text-orange-400">"🤖 AI Model Ready!"</span>)
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;