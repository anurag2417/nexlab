import React from 'react';
import { Sparkles, TrendingUp, Award, Calendar } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

export const WelcomeBanner = () => {
  const { user } = useAuthStore();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-light-blue via-light-blue/80 to-mid-blue/20 p-6">
      <div className="relative z-10">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-navy">
              {getGreeting()}, {user?.name || 'Student'}! 👋
            </h1>
            <p className="mt-1 text-gray-600">
              Continue your AI learning journey. You're doing great!
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-2 bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 text-sm text-navy border border-light-blue">
            <Sparkles className="h-4 w-4 text-dark-blue" />
            <span>Level {user?.gamification?.level || 1}</span>
          </div>
        </div>
        
        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
          <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm rounded-full px-3 py-1.5 text-navy border border-light-blue">
            <TrendingUp className="h-4 w-4 text-dark-blue" />
            <span>{user?.gamification?.xp || 0} XP</span>
          </div>
          <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm rounded-full px-3 py-1.5 text-navy border border-light-blue">
            <Calendar className="h-4 w-4 text-dark-blue" />
            <span>{user?.gamification?.streak || 0} Day Streak</span>
          </div>
          <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm rounded-full px-3 py-1.5 text-navy border border-light-blue">
            <Award className="h-4 w-4 text-amber-500" />
            <span>Complete 3 more sprints to unlock your next badge</span>
          </div>
        </div>
      </div>
      
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/30" />
      <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-white/20" />
      <div className="absolute top-1/2 right-20 h-20 w-20 rounded-full bg-white/20" />
    </div>
  );
};

export default WelcomeBanner;