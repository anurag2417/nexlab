import User from '../models/User.js';

export const XP_REWARDS = {
  SPRINT_COMPLETE: 50,
  COURSE_COMPLETE: 200,
  PROJECT_SUBMIT: 100,
  STREAK_DAY: 10,
  BADGE_EARNED: 50,
} as const;

export const addXP = async (userId: string, xpAmount: number) => {
  const user = await User.findById(userId);
  if (!user) return;

  user.gamification.xp += xpAmount;
  user.gamification.level = user.calculateLevel();

  await user.save();
  return user;
};

export const updateStreak = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) return;

  const today = new Date().setHours(0, 0, 0, 0);
  const lastActive = new Date(user.gamification.lastActive).setHours(0, 0, 0, 0);
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (lastActive === today) {
    // Already updated today
    return;
  } else if (lastActive === yesterday.getTime()) {
    // Consecutive day, increase streak
    user.gamification.streak += 1;
    // Bonus XP for streak
    if (user.gamification.streak % 7 === 0) {
      await addXP(userId, XP_REWARDS.STREAK_DAY * 2);
    } else {
      await addXP(userId, XP_REWARDS.STREAK_DAY);
    }
  } else {
    // Streak broken
    user.gamification.streak = 0;
  }

  user.gamification.lastActive = new Date();
  await user.save();
  return user;
};