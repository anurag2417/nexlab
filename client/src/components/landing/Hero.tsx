import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, Sparkles, Rocket, Star, Zap, Code2, 
  Users, Award, Clock 
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

export const Hero: React.FC = () => {
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

  const quickStats = [
    { icon: Users, value: '500+', label: 'Students Trained' },
    { icon: Code2, value: '1,200+', label: 'Projects Built' },
    { icon: Award, value: '94%', label: 'Satisfaction Rate' },
    { icon: Clock, value: '12', label: 'Weeks to Mastery' },
  ];

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-12">
      {/* Background Glow Effects */}
      <div className="absolute top-1/4 left-1/4 h-[600px] w-[600px] rounded-full bg-purple-600/20 blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 h-[600px] w-[600px] rounded-full bg-blue-600/20 blur-3xl animate-pulse-slow delay-1000" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[800px] w-[800px] rounded-full bg-purple-500/5 blur-3xl" />
      <div className="absolute top-3/4 left-1/4 h-[400px] w-[400px] rounded-full bg-pink-600/10 blur-3xl animate-pulse-slow delay-2000" />
      <div className="absolute bottom-1/4 right-1/3 h-[400px] w-[400px] rounded-full bg-cyan-600/10 blur-3xl animate-pulse-slow delay-1500" />
      
      {/* Grid Pattern Overlay */}
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
          {/* Left Column - Content */}
          <div className="text-center lg:text-left w-full">
            {/* Floating Badge */}
            <motion.div
              variants={itemVariants}
              className="mb-8 inline-flex items-center gap-3 rounded-full border border-purple-500/30 bg-purple-500/10 px-6 py-3 text-base text-purple-300 backdrop-blur-sm"
              animate={floatAnimation}
            >
              <Sparkles className="h-5 w-5 text-purple-400" />
              <span className="font-medium text-base">🎓 Now enrolling for Winter 2025 Cohort</span>
              <span className="ml-2 rounded-full bg-purple-500/20 px-3 py-1 text-sm">Limited Seats</span>
            </motion.div>

            {/* Main Heading */}
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
                <motion.span
                  className="absolute -bottom-3 left-0 h-1.5 w-full bg-gradient-to-r from-purple-400 to-blue-400 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 1, delay: 0.8 }}
                />
              </span>
              <span className="block mt-3 text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-gray-400 font-light">
                Not just watching
              </span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              variants={itemVariants}
              className="max-w-2xl text-lg sm:text-xl md:text-2xl text-gray-400 leading-relaxed"
            >
              Build chatbots, image recognizers, and neural networks—all guided step-by-step.
              <span className="block mt-2 text-purple-400 font-medium text-xl">No boring PowerPoints. Just real code.</span>
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="mt-10 flex flex-col sm:flex-row gap-5"
            >
              {user ? (
                <Link to="/dashboard">
                  <Button size="lg" className="group relative overflow-hidden bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 shadow-lg shadow-purple-500/25 w-full sm:w-auto px-10 py-7 text-lg">
                    <span className="relative z-10 flex items-center">
                      Go to Dashboard
                      <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-1" />
                    </span>
                    <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-purple-500 to-blue-500 transition-transform duration-300 group-hover:translate-x-0" />
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
                    <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-purple-500 to-blue-500 transition-transform duration-300 group-hover:translate-x-0" />
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

            {/* Quick Stats */}
            <motion.div
              variants={itemVariants}
              className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4"
            >
              {quickStats.map((stat, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-gray-800/50 bg-gray-900/30 p-4 text-center backdrop-blur-sm transition-all hover:border-purple-500/30 hover:bg-gray-800/40"
                >
                  <stat.icon className="h-5 w-5 mx-auto text-purple-400 mb-1.5" />
                  <div className="text-lg font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-gray-400">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              variants={itemVariants}
              className="mt-8 flex flex-wrap items-center gap-5 text-base text-gray-500"
            >
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
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/0 via-purple-500/10 to-blue-500/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              
              <div className="relative rounded-xl bg-[#0a0a0f] p-6 sm:p-8 w-full">
                {/* Header */}
                <div className="flex items-center gap-4 border-b border-gray-800 pb-4 sm:pb-5">
                  <div className="flex gap-2.5">
                    <div className="h-3 w-3 sm:h-3.5 sm:w-3.5 rounded-full bg-red-500/80 shadow-lg shadow-red-500/20" />
                    <div className="h-3 w-3 sm:h-3.5 sm:w-3.5 rounded-full bg-yellow-500/80 shadow-lg shadow-yellow-500/20" />
                    <div className="h-3 w-3 sm:h-3.5 sm:w-3.5 rounded-full bg-green-500/80 shadow-lg shadow-green-500/20" />
                  </div>
                  <span className="ml-3 text-sm sm:text-base text-gray-500 font-mono">main.py</span>
                  <div className="ml-auto flex items-center gap-4">
                    <span className="flex items-center gap-2.5 text-sm text-green-400">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
                      </span>
                      Running
                    </span>
                    <Code2 className="h-5 w-5 text-gray-600" />
                  </div>
                </div>
                
                {/* Code Content */}
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
                
                {/* Footer */}
                <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-gray-800 pt-4 sm:pt-5">
                  <span className="text-sm sm:text-base text-green-400 flex items-center gap-2.5">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
                    </span>
                    Python 3.9 • PyTorch 2.0
                  </span>
                  <span className="text-sm sm:text-base text-gray-500 font-mono">⚡ Execution time: 0.04s</span>
                </div>

                {/* Output Line */}
                <div className="mt-4 p-4 rounded-lg bg-gray-900/50 border border-gray-800">
                  <div className="flex items-center gap-3">
                    <span className="text-sm sm:text-base text-green-400 font-mono">🤖 AI Model Ready!</span>
                    <span className="ml-auto text-sm text-gray-600 font-mono">✓ Success</span>
                  </div>
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