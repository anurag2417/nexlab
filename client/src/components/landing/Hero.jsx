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
      <div className="absolute top-1/4 left-1/4 h-[600px] w-[600px] rounded-full bg-moss/5 blur-3xl animate-forest-pulse" />
      <div className="absolute bottom-1/4 right-1/4 h-[600px] w-[600px] rounded-full bg-sage/10 blur-3xl animate-forest-pulse delay-1000" />

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
              className="mb-8 inline-flex items-center gap-3 rounded-full border border-sage/20 bg-white/60 backdrop-blur-sm px-6 py-3 text-base text-deepForest shadow-sm"
              animate={floatAnimation}
            >
              <Sparkles className="h-5 w-5 text-moss" />
              <span className="font-medium text-base">🎓 Now enrolling for Winter 2025 Cohort</span>
              <span className="ml-2 rounded-full bg-moss/10 px-3 py-1 text-sm text-moss">Limited Seats</span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="mb-6 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-tight"
            >
              <span className="text-deepForest">
                Learn AI by
              </span>
              <br />
              <span className="relative inline-block">
                <span className="gradient-text">
                  Building
                </span>
              </span>
              <span className="block mt-3 text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-deepForest/60 font-light">
                Not just watching
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="max-w-2xl text-lg sm:text-xl md:text-2xl text-deepForest/70 leading-relaxed"
            >
              Build chatbots, image recognizers, and neural networks—all guided step-by-step.
              <span className="block mt-2 text-moss font-medium text-xl">No boring PowerPoints. Just real code.</span>
            </motion.p>

            <motion.div variants={itemVariants} className="mt-10 flex flex-col sm:flex-row gap-5">
              {user ? (
                <Link to="/dashboard">
                  <Button size="lg" className="gradient-button w-full sm:w-auto px-10 py-7 text-lg">
                    <span className="relative z-10 flex items-center">
                      Go to Dashboard
                      <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Button>
                </Link>
              ) : (
                <Link to="/register">
                  <Button size="lg" className="gradient-button w-full sm:w-auto px-10 py-7 text-lg">
                    <span className="relative z-10 flex items-center">
                      <Sparkles className="mr-3 h-6 w-6" />
                      Start Building for Free
                      <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Button>
                </Link>
              )}
              <Link to="/showcase">
                <Button variant="outline" size="lg" className="border-sage text-sage hover:bg-sage hover:text-white w-full sm:w-auto px-10 py-7 text-lg">
                  <Rocket className="mr-3 h-6 w-6" />
                  See Student Projects
                </Button>
              </Link>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-10 flex flex-wrap items-center gap-5 text-base text-deepForest/60">
              <span className="flex items-center gap-2.5">
                <span className="flex -space-x-2">
                  {['👩‍🎓', '👨‍🎓', '👩‍💻', '👨‍💻', '🧑‍🎓'].map((emoji, i) => (
                    <span key={i} className="inline-block h-8 w-8 rounded-full bg-cream/50 ring-2 ring-white flex items-center justify-center text-sm">
                      {emoji}
                    </span>
                  ))}
                </span>
                <span className="text-deepForest/70">500+ students trained</span>
              </span>
              <span className="flex items-center gap-2 text-deepForest/70">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                4.9/5 average rating
              </span>
              <span className="flex items-center gap-2 text-deepForest/70">
                <Zap className="h-5 w-5 text-moss" />
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
            <div className="group relative rounded-2xl border border-cream/50 bg-white/80 backdrop-blur-sm p-1.5 shadow-2xl shadow-moss/5 transition-all hover:shadow-moss/15 w-full">
              <div className="relative rounded-xl bg-gradient-to-br from-forest to-deepForest p-6 sm:p-8 w-full">
                <div className="flex items-center gap-4 border-b border-cream/20 pb-4 sm:pb-5">
                  <div className="flex gap-2.5">
                    <div className="h-3 w-3 sm:h-3.5 sm:w-3.5 rounded-full bg-red-500/80" />
                    <div className="h-3 w-3 sm:h-3.5 sm:w-3.5 rounded-full bg-yellow-500/80" />
                    <div className="h-3 w-3 sm:h-3.5 sm:w-3.5 rounded-full bg-green-500/80" />
                  </div>
                  <span className="ml-3 text-sm sm:text-base text-cream/60 font-mono">main.py</span>
                  <span className="ml-auto flex items-center gap-2 text-xs text-sage">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sage opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-sage" />
                    </span>
                    Running
                  </span>
                </div>
                
                <div className="mt-4 sm:mt-6 overflow-x-auto">
                  <pre className="text-left text-sm sm:text-base md:text-lg font-mono text-cream/80 leading-loose whitespace-pre-wrap break-words">
                    <code>
                      <span className="text-sage">import</span> torch
                      <br />
                      <span className="text-sage">import</span> torch.nn <span className="text-sage">as</span> nn
                      <br />
                      <br />
                      <span className="text-sage">class</span> <span className="text-cream">NeuralNetwork</span>(nn.Module):
                      <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-sage">def</span> <span className="text-cream">__init__</span>(self):
                      <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-sage">super</span>().__init__()
                      <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.fc1 = nn.Linear(<span className="text-moss">784</span>, <span className="text-moss">128</span>)
                      <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.fc2 = nn.Linear(<span className="text-moss">128</span>, <span className="text-moss">10</span>)
                      <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-sage">def</span> <span className="text-cream">forward</span>(self, x):
                      <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;x = torch.relu(self.fc1(x))
                      <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-sage">return</span> self.fc2(x)
                      <br />
                      <br />
                      model = <span className="text-cream">NeuralNetwork</span>()
                      <br />
                      <span className="text-green-400">print</span>(<span className="text-sage">"🤖 AI Model Ready!"</span>)
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