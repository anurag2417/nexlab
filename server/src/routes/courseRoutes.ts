import express from 'express';
import { protect } from '../middleware/auth.js';
import {
  getAllCourses,
  getCourseByTier,
  getSprint,
  getUserProgress,
  markSprintComplete,
} from '../controllers/courseController.js';

const router = express.Router();

router.get('/', protect, getAllCourses);
router.get('/tier/:tier', protect, getCourseByTier);
router.get('/sprints/:id', protect, getSprint);
router.get('/progress', protect, getUserProgress);
router.post('/progress', protect, markSprintComplete);

export default router;