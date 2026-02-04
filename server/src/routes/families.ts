import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import {
  createFamily,
  getFamily,
  getFamilyDashboard,
  inviteMember,
  acceptInvite,
  removeMember,
  leaveFamily,
} from '../controllers/familyController.js';

const router = Router();

// All routes require authentication
router.use(authenticate);

// POST /api/families - Create a new family group
router.post('/', createFamily);

// GET /api/families/:id - Get family details
router.get('/:id', getFamily);

// GET /api/families/:id/dashboard - Get family dashboard data
router.get('/:id/dashboard', getFamilyDashboard);

// POST /api/families/:id/invite - Invite a member to the family
router.post('/:id/invite', inviteMember);

// POST /api/families/accept-invite/:token - Accept family invitation
router.post('/accept-invite/:token', acceptInvite);

// DELETE /api/families/:id/members/:memberId - Remove a member from family
router.delete('/:id/members/:memberId', removeMember);

// POST /api/families/:id/leave - Leave a family group
router.post('/:id/leave', leaveFamily);

export default router;
