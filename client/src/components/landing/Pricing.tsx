import React from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles, Zap, Crown, IndianRupee } from 'lucide-react';
import { Button } from '../ui/Button';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

const plans = [
  {
    name: 'Starter',
    price: '0',
    period: 'Free',
    description: 'Perfect for trying out AI building.',
    icon: Zap,
    features: [
      'Access to Tier 1 & 2',
      'Basic chatbot builder',
      'Community support',
      'No credit card required',
    ],
    cta: 'Start Free',
    highlight: false,
  },
  {
    name: 'Pro',
    price: '499',
    period: '/month',
    description: 'Full access to all AI projects.',
    icon: Crown,
    features: [
      'All 5 tiers',
      'Full AI project suite',
      'Live instructor support',
      'Portfolio showcase',
      'Certificate of completion',
      'Job placement assistance',
    ],
    cta: 'Start Building',
    highlight: true,
  },
  {
    name: 'Cohort',
    price: '4,999',
    period: 'one-time',
    description: 'Complete 12-week immersive program.',
    icon: Sparkles,
    features: [
      'Everything in Pro',
      'Weekly live sessions',
      '1-on-1 mentorship',
      'Career counseling',
      'Project feedback & review',
      'Alumni network access',
    ],
    cta: 'Join Cohort',
    highlight: false,
  },
];

export const Pricing: React.FC = () => {
  const { user } = useAuthStore();

  return (
    <section className="relative w-full py-20 sm:py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 w-full bg-[#0a0a0f]">
        <div className="absolute top-0 left-1/2 h-px w-1/2 bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
        <div className="absolute bottom-0 left-1/2 h-px w-1/2 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
      </div>
      
      <div className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/5 blur-3xl" />

      <div className="relative z-10 w-full px-6 sm:px-12 lg:px-20 xl:px-28">
        {/* Header */}
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="inline-block rounded-full border border-purple-500/30 bg-purple-500/10 px-6 py-2 text-base font-medium text-purple-300 backdrop-blur-sm">
              Pricing
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="mt-6 text-3xl sm:text-4xl md:text-5xl font-bold text-white"
          >
            Choose Your{' '}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Path
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-4 text-lg sm:text-xl text-gray-400"
          >
            Start free, upgrade anytime
          </motion.p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 w-full">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative rounded-2xl border p-7 sm:p-9 backdrop-blur-sm transition-all hover:shadow-xl ${
                plan.highlight
                  ? 'border-purple-500/50 bg-gradient-to-b from-purple-900/20 to-blue-900/20 shadow-purple-500/10'
                  : 'border-gray-800/50 bg-gray-900/30 hover:border-gray-700/50 hover:bg-gray-800/40'
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 px-5 py-1.5 text-base font-medium text-white shadow-lg shadow-purple-500/25">
                  <Sparkles className="mr-1.5 inline h-4 w-4" />
                  Most Popular
                </div>
              )}

              {/* Plan Icon & Name */}
              <div className="flex items-center gap-3 mb-4">
                <plan.icon className={`h-6 w-6 sm:h-7 sm:w-7 ${plan.highlight ? 'text-purple-400' : 'text-gray-500'}`} />
                <h3 className="text-xl sm:text-2xl font-semibold text-white">
                  {plan.name}
                </h3>
              </div>

              {/* Price - INR */}
              <div className="mb-2">
                <div className="flex items-baseline">
                  <span className="text-4xl sm:text-5xl font-bold text-white flex items-center gap-1">
                    <IndianRupee className="h-7 w-7 sm:h-8 sm:w-8 inline" />
                    {plan.price}
                  </span>
                  <span className="ml-2 text-sm sm:text-base text-gray-400">{plan.period}</span>
                </div>
                <p className="mt-2 text-sm sm:text-base text-gray-400">{plan.description}</p>
              </div>

              {/* Features */}
              <ul className="mb-6 sm:mb-8 space-y-3 sm:space-y-4">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm sm:text-base text-gray-300">
                    <Check className={`h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 ${plan.highlight ? 'text-purple-400' : 'text-gray-500'}`} />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Link to={user ? '/dashboard' : '/register'} className="block w-full">
                <Button
                  variant={plan.highlight ? 'default' : 'outline'}
                  className={`w-full py-6 text-base ${
                    plan.highlight
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 shadow-lg shadow-purple-500/25'
                      : 'border-gray-700 text-gray-300 hover:border-purple-500 hover:text-white hover:bg-purple-500/10'
                  }`}
                >
                  {plan.cta}
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-gray-500">
            All prices are in Indian Rupees (₹). GST may apply.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;