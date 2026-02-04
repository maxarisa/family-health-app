import { Response, NextFunction } from 'express';
import { eq, and, gte, lte, desc, sql } from 'drizzle-orm';
import { db } from '../db/index.js';
import { 
  waterLogs, 
  exerciseLogs, 
  weightLogs, 
  sleepLogs, 
  bloodPressureLogs,
  heartRateLogs,
  temperatureLogs
} from '../db/schema.js';
import { AppError } from '../middleware/errorHandler.js';
import { AuthRequest } from '../middleware/auth.js';

// Water logging
export const logWater = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.userId;
    const { amount, loggedAt } = req.body;

    if (!userId) {
      throw new AppError('User ID not found in request', 401);
    }

    if (!amount || amount <= 0) {
      throw new AppError('Amount must be a positive number', 400);
    }

    // Save water log to database
    const [waterLog] = await db.insert(waterLogs).values({
      userId,
      amount: parseFloat(amount),
      loggedAt: loggedAt ? new Date(loggedAt) : new Date(),
    }).returning();

    res.status(201).json({
      status: 'success',
      message: 'Water intake logged successfully',
      data: {
        log: waterLog,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const logExercise = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.userId;
    const { activityType, customActivity, duration, distance, notes, loggedAt } = req.body;

    if (!userId) {
      throw new AppError('User ID not found in request', 401);
    }

    if (!activityType || !duration || duration <= 0) {
      throw new AppError('Activity type and duration are required', 400);
    }

    // Save exercise log to database
    const [exerciseLog] = await db.insert(exerciseLogs).values({
      userId,
      activityType,
      customActivity: customActivity || null,
      duration: parseInt(duration),
      distance: distance ? parseFloat(distance) : null,
      notes: notes || null,
      loggedAt: loggedAt ? new Date(loggedAt) : new Date(),
    }).returning();

    res.status(201).json({
      status: 'success',
      message: 'Exercise logged successfully',
      data: {
        log: exerciseLog,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const logWeight = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.userId;
    const { weight, waist, hips, loggedAt } = req.body;

    if (!userId) {
      throw new AppError('User ID not found in request', 401);
    }

    if (!weight || weight <= 0) {
      throw new AppError('Weight must be a positive number', 400);
    }

    // Save weight log to database
    const [weightLog] = await db.insert(weightLogs).values({
      userId,
      weight: parseFloat(weight),
      waist: waist ? parseFloat(waist) : null,
      hips: hips ? parseFloat(hips) : null,
      loggedAt: loggedAt ? new Date(loggedAt) : new Date(),
    }).returning();

    res.status(201).json({
      status: 'success',
      message: 'Weight logged successfully',
      data: {
        log: weightLog,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const logSleep = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.userId;
    const { duration, bedtime, wakeTime, quality, notes, loggedAt } = req.body;

    if (!userId) {
      throw new AppError('User ID not found in request', 401);
    }

    if (!duration || duration <= 0) {
      throw new AppError('Duration must be a positive number', 400);
    }

    // Save sleep log to database
    const [sleepLog] = await db.insert(sleepLogs).values({
      userId,
      duration: parseInt(duration),
      bedtime: bedtime ? new Date(bedtime) : null,
      wakeTime: wakeTime ? new Date(wakeTime) : null,
      quality: quality || null,
      notes: notes || null,
      loggedAt: loggedAt ? new Date(loggedAt) : new Date(),
    }).returning();

    res.status(201).json({
      status: 'success',
      message: 'Sleep logged successfully',
      data: {
        log: sleepLog,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const logBloodPressure = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.userId;
    const { systolic, diastolic, pulse, context, notes, loggedAt } = req.body;

    if (!userId) {
      throw new AppError('User ID not found in request', 401);
    }

    if (!systolic || !diastolic || systolic <= 0 || diastolic <= 0) {
      throw new AppError('Valid systolic and diastolic values are required', 400);
    }

    // Save blood pressure log to database
    const [bpLog] = await db.insert(bloodPressureLogs).values({
      userId,
      systolic: parseInt(systolic),
      diastolic: parseInt(diastolic),
      pulse: pulse ? parseInt(pulse) : null,
      notes: context || null,
      notes: notes || null,
      loggedAt: loggedAt ? new Date(loggedAt) : new Date(),
    }).returning();

    res.status(201).json({
      status: 'success',
      message: 'Blood pressure logged successfully',
      data: {
        log: bpLog,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const logHeartRate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.userId;
    const { bpm, type, notes, loggedAt } = req.body;

    if (!userId) {
      throw new AppError('User ID not found in request', 401);
    }

    if (!bpm || bpm <= 0) {
      throw new AppError('Valid BPM value is required', 400);
    }

    // Save heart rate log to database
    const [hrLog] = await db.insert(heartRateLogs).values({
      userId,
      heartRate: parseInt(bpm),
      type: type || 'resting',
      notes: notes || null,
      loggedAt: loggedAt ? new Date(loggedAt) : new Date(),
    }).returning();

    res.status(201).json({
      status: 'success',
      message: 'Heart rate logged successfully',
      data: {
        log: hrLog,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const logTemperature = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.userId;
    const { temperature, method, symptoms, notes, loggedAt } = req.body;

    if (!userId) {
      throw new AppError('User ID not found in request', 401);
    }

    if (!temperature || temperature <= 0) {
      throw new AppError('Valid temperature value is required', 400);
    }

    // Save temperature log to database
    const [tempLog] = await db.insert(temperatureLogs).values({
      userId,
      temperature: parseFloat(temperature),
      method: method || null,
      symptoms: symptoms || null,
      notes: notes || null,
      loggedAt: loggedAt ? new Date(loggedAt) : new Date(),
    }).returning();

    res.status(201).json({
      status: 'success',
      message: 'Temperature logged successfully',
      data: {
        log: tempLog,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get health logs with filters
export const getHealthLogs = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.userId;
    const { type, startDate, endDate, limit = 50 } = req.query;

    if (!userId) {
      throw new AppError('User ID not found in request', 401);
    }

    let logs: any[] = [];

    // Fetch specific type or all types
    if (!type || type === 'water') {
      const conditions = [eq(waterLogs.userId, userId)];
      if (startDate) conditions.push(gte(waterLogs.loggedAt, new Date(startDate as string)));
      if (endDate) conditions.push(lte(waterLogs.loggedAt, new Date(endDate as string)));

      const water = await db.select()
        .from(waterLogs)
        .where(and(...conditions))
        .orderBy(desc(waterLogs.loggedAt))
        .limit(parseInt(limit as string));
      logs.push(...water.map(log => ({ ...log, type: 'water' })));
    }

    if (!type || type === 'exercise') {
      const conditions = [eq(exerciseLogs.userId, userId)];
      if (startDate) conditions.push(gte(exerciseLogs.loggedAt, new Date(startDate as string)));
      if (endDate) conditions.push(lte(exerciseLogs.loggedAt, new Date(endDate as string)));

      const exercise = await db.select()
        .from(exerciseLogs)
        .where(and(...conditions))
        .orderBy(desc(exerciseLogs.loggedAt))
        .limit(parseInt(limit as string));
      logs.push(...exercise.map(log => ({ ...log, type: 'exercise' })));
    }

    if (!type || type === 'weight') {
      const conditions = [eq(weightLogs.userId, userId)];
      if (startDate) conditions.push(gte(weightLogs.loggedAt, new Date(startDate as string)));
      if (endDate) conditions.push(lte(weightLogs.loggedAt, new Date(endDate as string)));

      const weight = await db.select()
        .from(weightLogs)
        .where(and(...conditions))
        .orderBy(desc(weightLogs.loggedAt))
        .limit(parseInt(limit as string));
      logs.push(...weight.map(log => ({ ...log, type: 'weight' })));
    }

    // Sort all logs by date
    logs.sort((a, b) => new Date(b.loggedAt).getTime() - new Date(a.loggedAt).getTime());

    res.status(200).json({
      status: 'success',
      data: {
        logs: logs.slice(0, parseInt(limit as string)),
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get dashboard summary for today
export const getDashboardSummary = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.userId;

    if (!userId) {
      throw new AppError('User ID not found in request', 401);
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Get today's water intake
    const waterToday = await db.select({
      total: sql<number>`COALESCE(SUM(${waterLogs.amount}), 0)`,
    })
    .from(waterLogs)
    .where(and(
      eq(waterLogs.userId, userId),
      gte(waterLogs.loggedAt, today),
      lte(waterLogs.loggedAt, tomorrow)
    ));

    // Get today's exercise
    const exerciseToday = await db.select({
      total: sql<number>`COALESCE(SUM(${exerciseLogs.duration}), 0)`,
    })
    .from(exerciseLogs)
    .where(and(
      eq(exerciseLogs.userId, userId),
      gte(exerciseLogs.loggedAt, today),
      lte(exerciseLogs.loggedAt, tomorrow)
    ));

    // Get latest weight
    const latestWeight = await db.select()
      .from(weightLogs)
      .where(eq(weightLogs.userId, userId))
      .orderBy(desc(weightLogs.loggedAt))
      .limit(1);

    // Get today's sleep
    const sleepToday = await db.select()
      .from(sleepLogs)
      .where(and(
        eq(sleepLogs.userId, userId),
        gte(sleepLogs.loggedAt, today),
        lte(sleepLogs.loggedAt, tomorrow)
      ))
      .limit(1);

    // Get latest vital signs
    const latestBP = await db.select()
      .from(bloodPressureLogs)
      .where(eq(bloodPressureLogs.userId, userId))
      .orderBy(desc(bloodPressureLogs.loggedAt))
      .limit(1);

    const latestHR = await db.select()
      .from(heartRateLogs)
      .where(eq(heartRateLogs.userId, userId))
      .orderBy(desc(heartRateLogs.loggedAt))
      .limit(1);

    const latestTemp = await db.select()
      .from(temperatureLogs)
      .where(eq(temperatureLogs.userId, userId))
      .orderBy(desc(temperatureLogs.loggedAt))
      .limit(1);

    res.status(200).json({
      status: 'success',
      data: {
        water: {
          current: waterToday[0]?.total || 0,
          goal: 2000, // Default goal, should come from user preferences
        },
        exercise: {
          minutes: exerciseToday[0]?.total || 0,
          goal: 30, // Default goal
        },
        weight: {
          current: latestWeight[0]?.weight || null,
          trend: 'stable', // TODO: Calculate trend
        },
        sleep: {
          hours: sleepToday[0]?.duration ? sleepToday[0].duration / 60 : 0,
          goal: 8, // Default goal
        },
        vitalSigns: {
          bloodPressure: latestBP[0] ? {
            systolic: latestBP[0].systolic,
            diastolic: latestBP[0].diastolic,
          } : null,
          heartRate: latestHR[0]?.heartRate || null,
          temperature: latestTemp[0]?.temperature || null,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

export const updateHealthLog = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // TODO: Update health log in database
    res.status(200).json({
      status: 'success',
      message: 'Health log updated successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const deleteHealthLog = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // TODO: Delete health log from database
    res.status(200).json({
      status: 'success',
      message: 'Health log deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const exportHealthData = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // TODO: Generate and return export file
    res.status(200).json({
      status: 'success',
      message: 'Export functionality coming soon',
    });
  } catch (error) {
    next(error);
  }
};