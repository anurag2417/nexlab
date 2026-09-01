import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '../layout/DashboardLayout';
import { CourseCard } from '../components/dashboard/CourseCard';
import { useCourseStore } from '../store/courseStore';
import { useAuthStore } from '../store/authStore';
import { motion } from 'framer-motion';
import { BookOpen, Search, GraduationCap, Lock, CheckCircle, Layers, Trophy, Zap } from 'lucide-react';
import { Input } from '../components/ui/Input';

const Courses = () => {
  const { user } = useAuthStore();
  const { courses, progress, fetchCourses, fetchProgress, isLoading } = useCourseStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCourses, setFilteredCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
    fetchProgress();
  }, []);

  useEffect(() => {
    if (courses.length > 0) {
      if (searchTerm.trim() === '') {
        setFilteredCourses(courses);
      } else {
        const filtered = courses.filter(
          (course) =>
            course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredCourses(filtered);
      }
    }
  }, [searchTerm, courses]);

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

  const totalCourses = courses.length;
  const availableCourses = courses.filter(c => {
    const isLocked = c.tier > 1 && (!progress || progress?.completedSprints?.length === 0);
    return !isLocked;
  }).length;
  const lockedCourses = totalCourses - availableCourses;
  const totalSprints = courses.reduce((acc, c) => acc + (c.sprints?.length || 0), 0);
  const completedSprints = progress?.completedSprints?.length || 0;
  const userXP = user?.gamification?.xp || 0;
  const userLevel = user?.gamification?.level || 1;

  return (
    <DashboardLayout>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        <motion.div variants={itemVariants}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <BookOpen className="h-8 w-8 text-[#588157]" />
              <div>
                <h1 className="text-2xl font-bold text-[#3A5A40]">All Courses</h1>
                <p className="text-[#344E41]/60">Choose a course to start learning</p>
              </div>
            </div>
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#344E41]/40" />
              <Input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 bg-white border-[#DAD7CD]/50 text-[#344E41] placeholder:text-[#344E41]/40 focus:border-[#588157] focus:ring-2 focus:ring-[#588157]/20 rounded-lg shadow-sm"
              />
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="rounded-xl border border-[#DAD7CD]/30 bg-white p-4 text-center shadow-sm">
              <div className="text-2xl font-bold text-[#3A5A40]">{totalCourses}</div>
              <div className="text-sm text-[#344E41]/60 flex items-center justify-center gap-1">
                <Layers className="h-4 w-4" />
                Total Courses
              </div>
            </div>
            <div className="rounded-xl border border-green-200/60 bg-green-50/50 p-4 text-center shadow-sm">
              <div className="text-2xl font-bold text-green-700">{availableCourses}</div>
              <div className="text-sm text-green-600 flex items-center justify-center gap-1">
                <CheckCircle className="h-4 w-4" />
                Available
              </div>
            </div>
            <div className="rounded-xl border border-amber-200/60 bg-amber-50/50 p-4 text-center shadow-sm">
              <div className="text-2xl font-bold text-amber-700">{lockedCourses}</div>
              <div className="text-sm text-amber-600 flex items-center justify-center gap-1">
                <Lock className="h-4 w-4" />
                Locked
              </div>
            </div>
            <div className="rounded-xl border border-[#A3B18A]/20 bg-[#A3B18A]/5 p-4 text-center shadow-sm">
              <div className="text-2xl font-bold text-[#A3B18A]">{totalSprints}</div>
              <div className="text-sm text-[#344E41]/60 flex items-center justify-center gap-1">
                <GraduationCap className="h-4 w-4" />
                Total Sprints
              </div>
            </div>
            <div className="rounded-xl border border-[#588157]/20 bg-[#588157]/5 p-4 text-center shadow-sm">
              <div className="text-2xl font-bold text-[#588157]">{completedSprints}</div>
              <div className="text-sm text-[#344E41]/60 flex items-center justify-center gap-1">
                <CheckCircle className="h-4 w-4" />
                Completed
              </div>
            </div>
            <div className="rounded-xl border border-[#3A5A40]/20 bg-[#3A5A40]/5 p-4 text-center shadow-sm">
              <div className="text-2xl font-bold text-[#3A5A40]">{userXP}</div>
              <div className="text-sm text-[#344E41]/60 flex items-center justify-center gap-1">
                <Trophy className="h-4 w-4" />
                XP (Lv.{userLevel})
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {isLoading ? (
              [...Array(3)].map((_, i) => (
                <div key={i} className="rounded-2xl border border-[#DAD7CD]/30 bg-white p-6 animate-pulse shadow-sm">
                  <div className="h-32 bg-[#DAD7CD]/30 rounded-xl mb-4" />
                  <div className="h-5 bg-[#DAD7CD]/30 rounded w-3/4 mb-2" />
                  <div className="h-4 bg-[#DAD7CD]/30 rounded w-1/2" />
                </div>
              ))
            ) : filteredCourses.length === 0 ? (
              <div className="col-span-full text-center py-12 bg-white rounded-2xl border border-[#DAD7CD]/30">
                <p className="text-[#344E41]/60">No courses found matching your search.</p>
              </div>
            ) : (
              filteredCourses.map((course) => {
                const completedSprints = progress?.completedSprints?.filter(
                  (sprintId) => course.sprints?.some((s) => s.id === sprintId)
                )?.length || 0;
                const totalSprints = course.sprints?.length || 0;
                const progressPercent = totalSprints > 0
                  ? (completedSprints / totalSprints) * 100
                  : 0;
                const isLocked = course.tier > 1 && (!progress || progress?.completedSprints?.length === 0);
                const firstSprintId = course.sprints?.[0]?.id || course.id;

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
                    isLocked={isLocked}
                    firstSprintId={firstSprintId} // Add this
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

export default Courses;