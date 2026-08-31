import User from '../models/User.js';
import Project from '../models/Project.js';
import logger from '../utils/logger.js';

export const getGlobalLeaderboard = async (req, res) => {
  try {
    const { limit = 100, page = 1 } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const users = await User.find({ isActive: true })
      .select('name email school grade city state gamification profile.avatar')
      .sort({ 'gamification.xp': -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await User.countDocuments({ isActive: true });

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
          page: parseInt(page),
          limit: parseInt(limit),
          totalPages: Math.ceil(total / parseInt(limit)),
        },
      },
    });
  } catch (error) {
    logger.error('Get global leaderboard error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch leaderboard',
    });
  }
};

export const getWeeklyLeaderboard = async (req, res) => {
  try {
    const { limit = 50 } = req.query;

    const users = await User.find({ isActive: true })
      .select('name email school city gamification')
      .sort({ 'gamification.streak': -1, 'gamification.xp': -1 })
      .limit(parseInt(limit));

    const rankedUsers = users.map((user, index) => ({
      ...user.toObject(),
      rank: index + 1,
    }));

    res.status(200).json({
      success: true,
      data: {
        users: rankedUsers,
        period: 'weekly',
      },
    });
  } catch (error) {
    logger.error('Get weekly leaderboard error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch weekly leaderboard',
    });
  }
};

export const getMonthlyLeaderboard = async (req, res) => {
  try {
    const { limit = 50 } = req.query;

    const users = await User.find({ isActive: true })
      .select('name email school city gamification')
      .sort({ 'gamification.xp': -1 })
      .limit(parseInt(limit));

    const rankedUsers = users.map((user, index) => ({
      ...user.toObject(),
      rank: index + 1,
    }));

    res.status(200).json({
      success: true,
      data: {
        users: rankedUsers,
        period: 'monthly',
      },
    });
  } catch (error) {
    logger.error('Get monthly leaderboard error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch monthly leaderboard',
    });
  }
};

export const getTierLeaderboard = async (req, res) => {
  try {
    const { tier } = req.params;
    const { limit = 50 } = req.query;

    const users = await User.find({ 
      isActive: true,
      'progress.coursesCompleted': { 
        $elemMatch: { 'tier': parseInt(tier) } 
      }
    })
      .select('name email school city gamification progress')
      .sort({ 'gamification.xp': -1 })
      .limit(parseInt(limit));

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
  } catch (error) {
    logger.error('Get tier leaderboard error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch tier leaderboard',
    });
  }
};

export const getCityLeaderboard = async (req, res) => {
  try {
    const { city } = req.params;
    const { limit = 50 } = req.query;

    const users = await User.find({ 
      isActive: true,
      city: { $regex: new RegExp(city, 'i') }
    })
      .select('name email school city state gamification')
      .sort({ 'gamification.xp': -1 })
      .limit(parseInt(limit));

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
  } catch (error) {
    logger.error('Get city leaderboard error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch city leaderboard',
    });
  }
};

export const getSchoolLeaderboard = async (req, res) => {
  try {
    const { school } = req.params;
    const { limit = 50 } = req.query;

    const users = await User.find({ 
      isActive: true,
      school: { $regex: new RegExp(school, 'i') }
    })
      .select('name email school city gamification')
      .sort({ 'gamification.xp': -1 })
      .limit(parseInt(limit));

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
  } catch (error) {
    logger.error('Get school leaderboard error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch school leaderboard',
    });
  }
};

export const getUserRank = async (req, res) => {
  try {
    const users = await User.find({ isActive: true })
      .select('gamification.xp')
      .sort({ 'gamification.xp': -1 });

    const userIndex = users.findIndex(
      (user) => user._id.toString() === req.user.id
    );

    const rank = userIndex !== -1 ? userIndex + 1 : null;
    const totalUsers = users.length;

    const user = await User.findById(req.user.id)
      .select('gamification.xp gamification.level gamification.streak');

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
  } catch (error) {
    logger.error('Get user rank error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch user rank',
    });
  }
};

export const getLeaderboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ isActive: true });

    const avgResult = await User.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: null, avgXP: { $avg: '$gamification.xp' } } }
    ]);
    const averageXP = avgResult.length > 0 ? avgResult[0].avgXP : 0;

    const topCities = await User.aggregate([
      { $match: { isActive: true, city: { $exists: true, $ne: '' } } },
      { $group: { _id: '$city', count: { $sum: 1 }, avgXP: { $avg: '$gamification.xp' } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);

    const topSchools = await User.aggregate([
      { $match: { isActive: true, school: { $exists: true, $ne: '' } } },
      { $group: { _id: '$school', count: { $sum: 1 }, avgXP: { $avg: '$gamification.xp' } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);

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
  } catch (error) {
    logger.error('Get leaderboard stats error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch leaderboard stats',
    });
  }
};