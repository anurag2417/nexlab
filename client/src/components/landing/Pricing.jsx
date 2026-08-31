import React from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles, Crown, IndianRupee } from 'lucide-react';
import { Button } from '../ui/Button';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

const plans = [
  {
    name: 'Starter',
    price: '0',
    period: 'Free',
    description: 'Perfect for trying out AI building.',
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

export const Pricing = () => {
  const { user } = useAuthStore();

  return (
    <section className="relative w-full py-20 overflow-hidden bg-light-blue/10">
      <div className="relative z-10 w-full px-6 sm:px-12 lg:px-20 xl:px-28">
        <div className="mb-16 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-navy"
          >
            Choose Your <span className="bg-gradient-to-r from-dark-blue to-mid-blue bg-clip-text text-transparent">Path</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative rounded-2xl border p-8 backdrop-blur-sm transition-all hover:shadow-xl ${
                plan.highlight
                  ? 'border-dark-blue bg-gradient-to-b from-light-blue/20 to-white shadow-mid-blue/20'
                  : 'border-light-blue bg-white hover:border-mid-blue'
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-dark-blue to-mid-blue px-5 py-1.5 text-sm font-medium text-white shadow-lg shadow-mid-blue/30">
                  <Sparkles className="mr-1.5 inline h-4 w-4" />
                  Most Popular
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-navy">{plan.name}</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-5xl font-bold text-dark-blue flex items-center gap-1">
                    <IndianRupee className="h-7 w-7 inline" />
                    {plan.price}
                  </span>
                  <span className="ml-2 text-base text-gray-500">{plan.period}</span>
                </div>
                <p className="mt-2 text-base text-gray-500">{plan.description}</p>
              </div>

              <ul className="mb-8 space-y-4">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm text-gray-600">
                    <Check className={`h-5 w-5 flex-shrink-0 ${plan.highlight ? 'text-dark-blue' : 'text-mid-blue'}`} />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link to={user ? '/dashboard' : '/register'} className="block w-full">
                <Button
                  variant={plan.highlight ? 'default' : 'outline'}
                  className={`w-full py-6 text-base ${
                    plan.highlight
                      ? 'bg-gradient-to-r from-dark-blue to-mid-blue text-white hover:shadow-lg hover:shadow-mid-blue/30'
                      : 'border-mid-blue text-dark-blue hover:bg-light-blue'
                  }`}
                >
                  {plan.cta}
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;