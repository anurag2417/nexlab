import User from '../models/User.js';

export const XP_REWARDS = {
  SPRINT_COMPLETE: 50,
  COURSE_COMPLETE: 200,
  PROJECT_SUBMIT: 100,
  STREAK_DAY: 10,
  BADGE_EARNED: 50,
};

export const addXP = async (userId, xpAmount) => {
  try {
    const user = await User.findById(userId);
    if (!user) return;

    user.gamification.xp += xpAmount;
    user.gamification.level = user.calculateLevel();

    await user.save();
    return user;
  } catch (error) {
    console.error('Error adding XP:', error);
    return null;
  }
};

export const updateStreak = async (userId) => {
  try {
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
  } catch (error) {
    console.error('Error updating streak:', error);
    return null;
  }
};

export const getBadgeProgress = (user) => {
  const badges = [];
  const xp = user.gamification.xp;
  const streak = user.gamification.streak;
  const completedSprints = user.progress.completedSprints.length || 0;

  // First Code badge
  if (completedSprints > 0) {
    badges.push({
      id: 'first-code',
      name: 'First Code',
      icon: '💻',
      earned: true,
      earnedAt: user.createdAt,
    });
  }

  // Streak badges
  if (streak >= 7) {
    badges.push({
      id: 'streak-7',
      name: '7-Day Streak',
      icon: '🔥',
      earned: true,
      earnedAt: user.gamification.lastActive,
    });
  }

  if (streak >= 30) {
    badges.push({
      id: 'streak-30',
      name: '30-Day Streak',
      icon: '⚡',
      earned: true,
      earnedAt: user.gamification.lastActive,
    });
  }

  // XP badges
  if (xp >= 500) {
    badges.push({
      id: 'xp-500',
      name: '500 XP',
      icon: '⭐',
      earned: true,
      earnedAt: new Date(),
    });
  }

  if (xp >= 1000) {
    badges.push({
      id: 'xp-1000',
      name: '1000 XP',
      icon: '🌟',
      earned: true,
      earnedAt: new Date(),
    });
  }

  // Course completion badges
  if (completedSprints >= 10) {
    badges.push({
      id: 'sprint-10',
      name: '10 Sprints',
      icon: '🎯',
      earned: true,
      earnedAt: new Date(),
    });
  }

  return badges;
};