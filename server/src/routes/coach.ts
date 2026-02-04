import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import {
  getDailyMessage,
  getMotivationalPrompt,
  getAchievementCelebration,
} from '../controllers/coachController.js';

const router = Router();

// All routes require authentication
router.use(authenticate);

// GET /api/coach/daily-message - Get daily AI coach message
router.get('/daily-message', getDailyMessage);

// GET /api/coach/prompt - Get contextual motivational prompt
router.get('/prompt', getMotivationalPrompt);

// POST /api/coach/celebration - Get achievement celebration message
router.post('/celebration', getAchievementCelebration);

export default router;
