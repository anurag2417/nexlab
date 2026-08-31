import React from 'react';
import { Progress } from '../ui/Progress';
import { getLevelFromXP, getXPForLevel, getXPProgress } from '../../utils/helpers';

export const XPProgress = ({ xp }) => {
  const level = getLevelFromXP(xp);
  const xpProgress = getXPProgress(xp);
  const currentLevelXP = getXPForLevel(level);
  const nextLevelXP = getXPForLevel(level + 1);

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span className="text-gray-600">Level {level}</span>
        <span className="text-gray-600">
          {xp - currentLevelXP} / {nextLevelXP - currentLevelXP} XP
        </span>
      </div>
      <Progress value={xpProgress} color="default" />
    </div>
  );
};

export default XPProgress;