import { Router } from 'express';
import { register, login, requestPasswordReset, resetPassword, verifyEmail, getMe } from '../controllers/authController.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

// POST /api/auth/register - Register a new user
router.post('/register', register);

// POST /api/auth/login - Login user
router.post('/login', login);

// POST /api/auth/forgot-password - Request password reset
router.post('/forgot-password', requestPasswordReset);

// POST /api/auth/reset-password - Reset password with token
router.post('/reset-password', resetPassword);

// POST /api/auth/verify-email - Verify email address
router.post('/verify-email', verifyEmail);

// GET /api/auth/me - Get current user profile (protected)
router.get('/me', authenticate, getMe);

export default router;
