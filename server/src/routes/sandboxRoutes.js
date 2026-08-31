import express from 'express';
import { protect } from '../middleware/auth.js';
import { runCode, validateCode } from '../controllers/sandboxController.js';

const router = express.Router();

router.post('/run', protect, runCode);
router.post('/validate', protect, validateCode);

export default router;