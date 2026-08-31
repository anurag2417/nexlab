import express from 'express';
import { protect } from '../middleware/auth.js';
import {
  getGlobalLeaderboard,
  getWeeklyLeaderboard,
  getMonthlyLeaderboard,
  getTierLeaderboard,
  getCityLeaderboard,
  getSchoolLeaderboard,
  getUserRank,
  getLeaderboardStats,
} from '../controllers/leaderboardController.js';

const router = express.Router();

// All routes require authentication
router.use(protect);

// Main leaderboards
router.get('/global', getGlobalLeaderboard);
router.get('/weekly', getWeeklyLeaderboard);
router.get('/monthly', getMonthlyLeaderboard);

// Filtered leaderboards
router.get('/tier/:tier', getTierLeaderboard);
router.get('/city/:city', getCityLeaderboard);
router.get('/school/:school', getSchoolLeaderboard);

// User specific
router.get('/rank', getUserRank);
router.get('/stats', getLeaderboardStats);

export default router;