import Course from '../models/Course.js';
import Sprint from '../models/Sprint.js';
import User from '../models/User.js';
import { addXP, XP_REWARDS, updateStreak } from '../services/gamification.js';

export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({ isActive: true })
      .populate('sprints')
      .sort({ tier: 1 });

    res.status(200).json({
      success: true,
      data: courses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch courses',
    });
  }
};

export const getCourseByTier = async (req, res) => {
  try {
    const { tier } = req.params;
    const course = await Course.findOne({ tier, isActive: true })
      .populate({
        path: 'sprints',
        options: { sort: { order: 1 } },
      });

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found',
      });
    }

    res.status(200).json({
      success: true,
      data: course,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch course',
    });
  }
};

export const getSprint = async (req, res) => {
  try {
    const { id } = req.params;
    const sprint = await Sprint.findById(id);

    if (!sprint) {
      return res.status(404).json({
        success: false,
        message: 'Sprint not found',
      });
    }

    res.status(200).json({
      success: true,
      data: sprint,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch sprint',
    });
  }
};

export const getUserProgress = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate('progress.completedSprints')
      .populate('progress.currentCourse')
      .populate('progress.currentSprint');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.status(200).json({
      success: true,
      data: user.progress,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch progress',
    });
  }
};

export const markSprintComplete = async (req, res) => {
  try {
    const { sprintId } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    if (user.progress.completedSprints.includes(sprintId)) {
      return res.status(400).json({
        success: false,
        message: 'Sprint already completed',
      });
    }

    user.progress.completedSprints.push(sprintId);
    await addXP(req.user.id, XP_REWARDS.SPRINT_COMPLETE);
    await updateStreak(req.user.id);
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Sprint marked as complete',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to mark sprint complete',
    });
  }
};