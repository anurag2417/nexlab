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

router.use(protect);

router.get('/public', getPublicProjects);
router.get('/my', getUserProjects);
router.get('/', getAllProjects);
router.get('/:id', getProjectById);
router.post('/', createProject);
router.put('/:id', updateProject);
router.delete('/:id', deleteProject);
router.post('/:id/upload', upload.array('files', 5), uploadProjectFiles);
router.patch('/:id/visibility', toggleProjectVisibility);
router.post('/:id/submit', submitForReview);
router.get('/:id/feedback', getProjectFeedback);

export default router;