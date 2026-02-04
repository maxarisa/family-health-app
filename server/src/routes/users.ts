import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import {
  getProfile,
  updateProfile,
  updatePrivacySettings,
  updateCoachPreference,
  deleteAccount,
} from '../controllers/userController.js';

const router = Router();

// All routes require authentication
router.use(authenticate);

// GET /api/users/profile - Get current user profile
router.get('/profile', getProfile);

// PUT /api/users/profile - Update user profile
router.put('/profile', updateProfile);

// PUT /api/users/privacy - Update privacy settings
router.put('/privacy', updatePrivacySettings);

// PUT /api/users/coach-preference - Update AI coach preference
router.put('/coach-preference', updateCoachPreference);

// DELETE /api/users - Delete user account
router.delete('/', deleteAccount);

export default router;
