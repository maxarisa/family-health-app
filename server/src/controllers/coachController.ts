import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth.js';

export const getDailyMessage = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.userId;

    // TODO: Fetch user's coach preference and generate message using AI

    res.json({
      status: 'success',
      data: {
        message: "Good morning! Ready to make today a healthy day? Let's start by staying hydrated!",
        type: 'daily_checkin',
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getMotivationalPrompt = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.userId;
    const { context } = req.query;

    // TODO: Generate context-aware motivational prompt based on user's data

    res.json({
      status: 'success',
      data: {
        message: "You're doing great! Just a little more to reach your daily water goal.",
        type: 'motivational',
        context,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getAchievementCelebration = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.userId;
    const { achievementType, value } = req.body;

    // TODO: Generate celebration message for the achievement

    const celebrationMessages: Record<string, string> = {
      streak: `Incredible! You've maintained a ${value}-day streak! Keep up the amazing work!`,
      goal_complete: "Congratulations! You've achieved your goal! Time to set a new challenge!",
      personal_best: `New personal best! You've outdone yourself. This is what progress looks like!`,
      default: "Amazing achievement! You should be proud of yourself!",
    };

    res.json({
      status: 'success',
      data: {
        message: celebrationMessages[achievementType] || celebrationMessages.default,
        type: 'celebration',
        achievementType,
      },
    });
  } catch (error) {
    next(error);
  }
};
