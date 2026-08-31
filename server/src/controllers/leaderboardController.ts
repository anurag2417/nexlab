import { Request, Response } from 'express';
import User from '../models/User.js';
import Project from '../models/Project.js';
import logger from '../utils/logger.js';

// Get global leaderboard
export const getGlobalLeaderboard = async (req: any, res: Response) => {
  try {
    const { limit = 100, page = 1 } = req.query;

    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);

    // Get users sorted by XP
    const users = await User.find({ isActive: true })
      .select('name email school grade city state gamification profile.avatar')
      .sort({ 'gamification.xp': -1 })
      .skip(skip)
      .limit(parseInt(limit as string));

    // Get total count
    const total = await User.countDocuments({ isActive: true });

    // Add rank to each user
    const rankedUsers = users.map((user, index) => ({
      ...user.toObject(),
      rank: skip + index + 1,
    }));

    res.status(200).json({
      success: true,
      data: {
        users: rankedUsers,
        pagination: {
          total,
          page: parseInt(page as string),
          limit: parseInt(limit as string),
          totalPages: Math.ceil(total / parseInt(limit as string)),
        },
      },
    });
  } catch (error: any) {
    logger.error('Get global leaderboard error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch leaderboard',
    });
  }
};

// Get weekly leaderboard
export const getWeeklyLeaderboard = async (req: any, res: Response) => {
  try {
    const { limit = 50 } = req.query;

    // Get users with XP earned in the last 7 days
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    // Get all users
    const users = await User.find({ isActive: true })
      .select('name email school city gamification')
      .sort({ 'gamification.streak': -1, 'gamification.xp': -1 })
      .limit(parseInt(limit as string));

    // Add rank to each user
    const rankedUsers = users.map((user, index) => ({
      ...user.toObject(),
      rank: index + 1,
    }));

    res.status(200).json({
      success: true,
      data: {
        users: rankedUsers,
        period: 'weekly',
        startDate: sevenDaysAgo,
        endDate: new Date(),
      },
    });
  } catch (error: any) {
    logger.error('Get weekly leaderboard error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch weekly leaderboard',
    });
  }
};

// Get monthly leaderboard
export const getMonthlyLeaderboard = async (req: any, res: Response) => {
  try {
    const { limit = 50 } = req.query;

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    // Get users with most projects completed in the last 30 days
    const users = await User.find({ isActive: true })
      .select('name email school city gamification progress')
      .sort({ 'gamification.xp': -1 })
      .limit(parseInt(limit as string));

    const rankedUsers = users.map((user, index) => ({
      ...user.toObject(),
      rank: index + 1,
    }));

    res.status(200).json({
      success: true,
      data: {
        users: rankedUsers,
        period: 'monthly',
        startDate: thirtyDaysAgo,
        endDate: new Date(),
      },
    });
  } catch (error: any) {
    logger.error('Get monthly leaderboard error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch monthly leaderboard',
    });
  }
};

// Get leaderboard by tier
export const getTierLeaderboard = async (req: any, res: Response) => {
  try {
    const { tier } = req.params;
    const { limit = 50 } = req.query;

    // Find users who have completed courses in this tier
    const users = await User.find({ 
      isActive: true,
      'progress.coursesCompleted': { 
        $elemMatch: { 'tier': parseInt(tier) } 
      }
    })
      .select('name email school city gamification progress')
      .sort({ 'gamification.xp': -1 })
      .limit(parseInt(limit as string));

    const rankedUsers = users.map((user, index) => ({
      ...user.toObject(),
      rank: index + 1,
    }));

    res.status(200).json({
      success: true,
      data: {
        users: rankedUsers,
        tier: parseInt(tier),
      },
    });
  } catch (error: any) {
    logger.error('Get tier leaderboard error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch tier leaderboard',
    });
  }
};

// Get leaderboard by city
export const getCityLeaderboard = async (req: any, res: Response) => {
  try {
    const { city } = req.params;
    const { limit = 50 } = req.query;

    const users = await User.find({ 
      isActive: true,
      city: { $regex: new RegExp(city, 'i') }
    })
      .select('name email school city state gamification')
      .sort({ 'gamification.xp': -1 })
      .limit(parseInt(limit as string));

    const rankedUsers = users.map((user, index) => ({
      ...user.toObject(),
      rank: index + 1,
    }));

    res.status(200).json({
      success: true,
      data: {
        users: rankedUsers,
        city,
      },
    });
  } catch (error: any) {
    logger.error('Get city leaderboard error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch city leaderboard',
    });
  }
};

// Get leaderboard by school
export const getSchoolLeaderboard = async (req: any, res: Response) => {
  try {
    const { school } = req.params;
    const { limit = 50 } = req.query;

    const users = await User.find({ 
      isActive: true,
      school: { $regex: new RegExp(school, 'i') }
    })
      .select('name email school city gamification')
      .sort({ 'gamification.xp': -1 })
      .limit(parseInt(limit as string));

    const rankedUsers = users.map((user, index) => ({
      ...user.toObject(),
      rank: index + 1,
    }));

    res.status(200).json({
      success: true,
      data: {
        users: rankedUsers,
        school,
      },
    });
  } catch (error: any) {
    logger.error('Get school leaderboard error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch school leaderboard',
    });
  }
};

// Get user's rank
export const getUserRank = async (req: any, res: Response) => {
  try {
    // Get all users sorted by XP
    const users = await User.find({ isActive: true })
      .select('gamification.xp')
      .sort({ 'gamification.xp': -1 });

    // Find current user's rank
    const userIndex = users.findIndex(
      (user) => user._id.toString() === req.user.id
    );

    const rank = userIndex !== -1 ? userIndex + 1 : null;
    const totalUsers = users.length;

    // Get user's XP
    const user = await User.findById(req.user.id)
      .select('gamification.xp gamification.level gamification.streak');

    // Get top 3 users for podium
    const top3 = users.slice(0, 3).map((u, index) => ({
      rank: index + 1,
      id: u._id,
      xp: u.gamification.xp,
    }));

    res.status(200).json({
      success: true,
      data: {
        rank,
        totalUsers,
        xp: user?.gamification.xp || 0,
        level: user?.gamification.level || 1,
        streak: user?.gamification.streak || 0,
        top3,
        percentile: rank ? ((1 - rank / totalUsers) * 100).toFixed(1) : null,
      },
    });
  } catch (error: any) {
    logger.error('Get user rank error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch user rank',
    });
  }
};

// Get leaderboard stats
export const getLeaderboardStats = async (req: any, res: Response) => {
  try {
    // Get total users
    const totalUsers = await User.countDocuments({ isActive: true });

    // Get average XP
    const avgResult = await User.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: null, avgXP: { $avg: '$gamification.xp' } } }
    ]);
    const averageXP = avgResult.length > 0 ? avgResult[0].avgXP : 0;

    // Get top cities
    const topCities = await User.aggregate([
      { $match: { isActive: true, city: { $exists: true, $ne: '' } } },
      { $group: { _id: '$city', count: { $sum: 1 }, avgXP: { $avg: '$gamification.xp' } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);

    // Get top schools
    const topSchools = await User.aggregate([
      { $match: { isActive: true, school: { $exists: true, $ne: '' } } },
      { $group: { _id: '$school', count: { $sum: 1 }, avgXP: { $avg: '$gamification.xp' } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);

    // Get total projects submitted
    const totalProjects = await Project.countDocuments({ status: 'approved' });

    res.status(200).json({
      success: true,
      data: {
        totalUsers,
        averageXP: Math.round(averageXP),
        totalProjects,
        topCities,
        topSchools,
        timestamp: new Date(),
      },
    });
  } catch (error: any) {
    logger.error('Get leaderboard stats error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch leaderboard stats',
    });
  }
};