import React from 'react';
import { Flame, Zap, Award, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';

interface StreakCardProps {
  streak: number;
  xp: number;
  level: number;
}

export const StreakCard: React.FC<StreakCardProps> = ({ streak, xp, level }) => {
  const xpToNextLevel = (level * 100) - xp;

  return (
    <Card className="bg-gradient-to-br from-amber-50/80 to-orange-50/80 border-amber-200/50 shadow-sm">
      <CardHeader>
        <CardTitle className="text-sm font-medium text-amber-800">Your Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-amber-200/60 p-2.5">
              <Flame className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-amber-700">{streak}</p>
              <p className="text-xs text-amber-600">Day Streak</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-primary-100 p-2.5">
              <Zap className="h-6 w-6 text-primary-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-primary-700">{xp}</p>
              <p className="text-xs text-primary-600">XP</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-indigo-100 p-2.5">
              <Award className="h-6 w-6 text-indigo-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-indigo-700">Lv.{level}</p>
              <p className="text-xs text-indigo-600">Level</p>
            </div>
          </div>
        </div>
        {xpToNextLevel > 0 && (
          <div className="mt-3">
            <div className="flex justify-between text-xs text-amber-700">
              <span>Progress to Level {level + 1}</span>
              <span>{xpToNextLevel} XP needed</span>
            </div>
            <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-amber-200/50">
              <div
                className="h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-400 transition-all"
                style={{ width: `${(xp / (level * 100)) * 100}%` }}
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};