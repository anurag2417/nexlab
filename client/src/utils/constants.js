export const APP_NAME = import.meta.env.VITE_APP_NAME || 'NexLab';
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const NAVIGATION = [
  { name: 'Dashboard', href: '/dashboard', icon: 'LayoutDashboard' },
  { name: 'Courses', href: '/courses', icon: 'BookOpen' },
  { name: 'Showcase', href: '/showcase', icon: 'Rocket' },
  { name: 'Leaderboard', href: '/leaderboard', icon: 'Trophy' },
];

export const TIERS = [
  { id: 1, name: 'Digital Literacy', icon: '🌐', color: 'blue' },
  { id: 2, name: 'Python Basics', icon: '🐍', color: 'green' },
  { id: 3, name: 'Web Development', icon: '💻', color: 'purple' },
  { id: 4, name: 'AI & Machine Learning', icon: '🤖', color: 'orange' },
  { id: 5, name: 'Data Science', icon: '📊', color: 'red' },
];

export const BADGES = [
  { id: 'first-code', name: 'First Code', icon: '💻', xp: 50 },
  { id: 'streak-7', name: '7-Day Streak', icon: '🔥', xp: 100 },
  { id: 'course-complete', name: 'Course Master', icon: '🎓', xp: 200 },
  { id: 'ai-explorer', name: 'AI Explorer', icon: '🤖', xp: 300 },
  { id: 'project-pro', name: 'Project Pro', icon: '🚀', xp: 400 },
];