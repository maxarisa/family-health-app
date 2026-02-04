import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth.js';

export const createGoal = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.userId;
    const { type, target, timeline, isShared } = req.body;

    // TODO: Create goal in database

    res.status(201).json({
      status: 'success',
      message: 'Goal created successfully',
      data: {
        goal: {
          type,
          target,
          timeline,
          isShared,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getGoals = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.userId;
    const { status } = req.query;

    // TODO: Fetch goals from database

    res.json({
      status: 'success',
      data: {
        goals: [],
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getGoalById = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    // TODO: Fetch goal from database

    res.json({
      status: 'success',
      data: {
        goal: {
          id,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

export const updateGoal = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // TODO: Update goal in database

    res.json({
      status: 'success',
      message: 'Goal updated successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const deleteGoal = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    // TODO: Delete goal from database

    res.json({
      status: 'success',
      message: 'Goal deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const getGoalProgress = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    // TODO: Calculate and return goal progress

    res.json({
      status: 'success',
      data: {
        goalId: id,
        progress: 0,
        milestones: [],
      },
    });
  } catch (error) {
    next(error);
  }
};
