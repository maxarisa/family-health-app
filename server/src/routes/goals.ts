import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import {
  createGoal,
  getGoals,
  getGoalById,
  updateGoal,
  deleteGoal,
  getGoalProgress,
} from '../controllers/goalController.js';

const router = Router();

// All routes require authentication
router.use(authenticate);

// POST /api/goals - Create a new goal
router.post('/', createGoal);

// GET /api/goals - Get all user goals
router.get('/', getGoals);

// GET /api/goals/:id - Get a specific goal
router.get('/:id', getGoalById);

// PUT /api/goals/:id - Update a goal
router.put('/:id', updateGoal);

// DELETE /api/goals/:id - Delete a goal
router.delete('/:id', deleteGoal);

// GET /api/goals/:id/progress - Get goal progress
router.get('/:id/progress', getGoalProgress);

export default router;
