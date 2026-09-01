import React from 'react';
import { Flame, Zap, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';

export const StreakCard = ({ streak, xp, level }) => {
  const xpToNextLevel = (level * 100) - xp;

  return (
    <Card className="bg-gradient-to-br from-moss/5 via-sage/10 to-cream/5 border-cream/30">
      <CardHeader>
        <CardTitle className="text-sm font-medium text-forest">Your Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-amber-100 p-2.5">
              <Flame className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-amber-700">{streak}</p>
              <p className="text-xs text-amber-600">Day Streak</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-moss/10 p-2.5">
              <Zap className="h-6 w-6 text-moss" />
            </div>
            <div>
              <p className="text-2xl font-bold text-moss">{xp}</p>
              <p className="text-xs text-deepForest/60">XP</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-sage/10 p-2.5">
              <Award className="h-6 w-6 text-sage-dark" />
            </div>
            <div>
              <p className="text-2xl font-bold text-forest">Lv.{level}</p>
              <p className="text-xs text-deepForest/60">Level</p>
            </div>
          </div>
        </div>
        {xpToNextLevel > 0 && (
          <div className="mt-3">
            <div className="flex justify-between text-xs text-forest">
              <span>Progress to Level {level + 1}</span>
              <span>{xpToNextLevel} XP needed</span>
            </div>
            <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-cream/30">
              <div
                className="h-full rounded-full bg-gradient-to-r from-moss to-sage transition-all"
                style={{ width: `${(xp / (level * 100)) * 100}%` }}
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StreakCard;