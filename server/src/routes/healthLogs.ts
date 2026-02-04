import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import {
  logWater,
  logExercise,
  logWeight,
  logSleep,
  logBloodPressure,
  logHeartRate,
  logTemperature,
  getHealthLogs,
  getDashboardSummary,
  updateHealthLog,
  deleteHealthLog,
  exportHealthData,
} from '../controllers/healthLogController.js';

const router = Router();

// All routes require authentication
router.use(authenticate);

// POST routes for logging different health metrics
router.post('/water', logWater);
router.post('/exercise', logExercise);
router.post('/weight', logWeight);
router.post('/sleep', logSleep);
router.post('/blood-pressure', logBloodPressure);
router.post('/heart-rate', logHeartRate);
router.post('/temperature', logTemperature);

// GET /api/health-logs - Get all health logs with filters
router.get('/', getHealthLogs);

// GET /api/health-logs/dashboard - Get dashboard summary data
router.get('/dashboard', getDashboardSummary);

// PUT /api/health-logs/:id - Update a health log
router.put('/:id', updateHealthLog);

// DELETE /api/health-logs/:id - Delete a health log
router.delete('/:id', deleteHealthLog);

// GET /api/health-logs/export - Export health data
router.get('/export', exportHealthData);

export default router;
