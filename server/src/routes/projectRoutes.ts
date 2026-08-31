import express from 'express';
import { protect } from '../middleware/auth.js';
import {
  createProject,
  getAllProjects,
  getUserProjects,
  getPublicProjects,
  getProjectById,
  updateProject,
  deleteProject,
  uploadProjectFiles,
  toggleProjectVisibility,
  submitForReview,
  getProjectFeedback,
} from '../controllers/projectController.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

// All routes require authentication
router.use(protect);

// Public showcase routes
router.get('/public', getPublicProjects);

// User's own projects
router.get('/my', getUserProjects);

// Main CRUD routes
router.get('/', getAllProjects);
router.get('/:id', getProjectById);
router.post('/', createProject);
router.put('/:id', updateProject);
router.delete('/:id', deleteProject);

// File upload - FIX: upload is now imported
router.post('/:id/upload', upload.array('files', 5), uploadProjectFiles);

// Visibility control
router.patch('/:id/visibility', toggleProjectVisibility);

// Review workflow
router.post('/:id/submit', submitForReview);
router.get('/:id/feedback', getProjectFeedback);

export default router;