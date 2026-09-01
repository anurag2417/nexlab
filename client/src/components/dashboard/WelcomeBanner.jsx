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
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-moss/10 via-sage/10 to-cream/20 p-6 border border-cream/30">
      <div className="relative z-10">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-forest">
              {getGreeting()}, {user?.name || 'Student'}! 👋
            </h1>
            <p className="mt-1 text-deepForest/70">
              Continue your AI learning journey. You're doing great!
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-2 bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 text-sm text-forest border border-cream/30">
            <Sparkles className="h-4 w-4 text-moss" />
            <span>Level {user?.gamification?.level || 1}</span>
          </div>
        </div>
        
        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
          <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm rounded-full px-3 py-1.5 text-forest border border-cream/30">
            <TrendingUp className="h-4 w-4 text-moss" />
            <span>{user?.gamification?.xp || 0} XP</span>
          </div>
          <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm rounded-full px-3 py-1.5 text-forest border border-cream/30">
            <Calendar className="h-4 w-4 text-moss" />
            <span>{user?.gamification?.streak || 0} Day Streak</span>
          </div>
          <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm rounded-full px-3 py-1.5 text-forest border border-cream/30">
            <Award className="h-4 w-4 text-moss" />
            <span>Complete 3 more sprints to unlock your next badge</span>
          </div>
        </div>
      </div>
      
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-moss/10" />
      <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-sage/10" />
      <div className="absolute top-1/2 right-20 h-20 w-20 rounded-full bg-cream/30" />
    </div>
  );
};

export default WelcomeBanner;