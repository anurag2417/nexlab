import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { WelcomeBanner } from '../components/dashboard/WelcomeBanner';
import { StreakCard } from '../components/dashboard/StreakCard';
import { CourseCard } from '../components/dashboard/CourseCard';
import { useAuthStore } from '../store/authStore';
import { useCourseStore } from '../store/courseStore';

const Dashboard: React.FC = () => {
  const { user } = useAuthStore();
  const { courses, progress, fetchCourses, fetchProgress, isLoading } = useCourseStore();

  useEffect(() => {
    fetchCourses();
    fetchProgress();
  }, []);

  const userXP = user?.gamification?.xp || 0;
  const userLevel = user?.gamification?.level || 1;
  const userStreak = user?.gamification?.streak || 0;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <DashboardLayout>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        <motion.div variants={itemVariants}>
          <WelcomeBanner />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <StreakCard streak={userStreak} xp={userXP} level={userLevel} />
        </motion.div>

        <motion.div variants={itemVariants}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Your Courses</h2>
            <Link to="/courses" className="text-sm text-primary-600 hover:text-primary-700 transition-colors font-medium">
              View All →
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {isLoading ? (
              [...Array(3)].map((_, i) => (
                <div key={i} className="rounded-2xl border border-gray-200/50 bg-white p-6 animate-pulse shadow-sm">
                  <div className="h-32 bg-gray-100 rounded-xl mb-4" />
                  <div className="h-5 bg-gray-100 rounded w-3/4 mb-2" />
                  <div className="h-4 bg-gray-100 rounded w-1/2" />
                </div>
              ))
            ) : (
              courses.map((course) => {
                const completedSprints = progress?.completedSprints?.filter(
                  (sprintId) => course.sprints?.some((s) => s.id === sprintId)
                )?.length || 0;
                const totalSprints = course.sprints?.length || 0;
                const progressPercent = totalSprints > 0 
                  ? (completedSprints / totalSprints) * 100 
                  : 0;

                return (
                  <CourseCard
                    key={course.id}
                    id={course.id}
                    title={course.title}
                    description={course.description}
                    tier={course.tier}
                    icon={course.icon}
                    color={course.color}
                    progress={progressPercent}
                    totalSprints={totalSprints}
                    completedSprints={completedSprints}
                    isLocked={course.tier > 1 && (!progress || progress?.completedSprints?.length === 0)}
                  />
                );
              })
            )}
          </div>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
};

export default Dashboard;