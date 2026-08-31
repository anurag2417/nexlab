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

router.use(protect);

router.get('/global', getGlobalLeaderboard);
router.get('/weekly', getWeeklyLeaderboard);
router.get('/monthly', getMonthlyLeaderboard);
router.get('/tier/:tier', getTierLeaderboard);
router.get('/city/:city', getCityLeaderboard);
router.get('/school/:school', getSchoolLeaderboard);
router.get('/rank', getUserRank);
router.get('/stats', getLeaderboardStats);

export default router;