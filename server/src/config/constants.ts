export const ROLES = {
  STUDENT: 'student',
  MENTOR: 'mentor',
  ADMIN: 'admin',
} as const;

export const TIER_NAMES = {
  1: 'Digital Literacy',
  2: 'Python Basics',
  3: 'Web Development',
  4: 'AI & Machine Learning',
  5: 'Data Science',
} as const;

export const XP_REWARDS = {
  SPRINT_COMPLETE: 50,
  COURSE_COMPLETE: 200,
  PROJECT_SUBMIT: 100,
  STREAK_DAY: 10,
  BADGE_EARNED: 50,
} as const;