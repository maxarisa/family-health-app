import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { eq } from 'drizzle-orm';
import { db } from '../db/index.js';
import { users, privacySettings } from '../db/schema.js';
import { AppError } from '../middleware/errorHandler.js';

// Helper function to generate JWT token
const generateToken = (userId: string, email: string): string => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new AppError('JWT secret not configured', 500);
  }

  return jwt.sign(
    { userId, email },
    secret,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' } as jwt.SignOptions
  );
};

// Helper function to exclude password from user object
const sanitizeUser = (user: any) => {
  const { passwordHash, passwordResetToken, emailVerificationToken, ...sanitized } = user;
  return sanitized;
};

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password, name, age, height, weight, coachStyle } = req.body;

    // Validate required fields
    if (!email || !password || !name) {
      throw new AppError('Email, password, and name are required', 400);
    }

    // Check if user already exists
    const existingUser = await db.select()
      .from(users)
      .where(eq(users.email, email.toLowerCase()))
      .limit(1);

    if (existingUser.length > 0) {
      throw new AppError('User with this email already exists', 400);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user in database
    const [newUser] = await db.insert(users).values({
      email: email.toLowerCase(),
      passwordHash: hashedPassword,
      name,
      age: age || null,
      height: height ? parseFloat(height) : null,
      currentWeight: weight ? parseFloat(weight) : null,
      coachStyle: coachStyle || 'encouraging',
      emailVerified: true, // For now, skip email verification
    }).returning();

    // Create default privacy settings
    await db.insert(privacySettings).values({
      userId: newUser.id,
      waterIntakeShared: true,
      exerciseShared: true,
      weightShared: false,
      sleepShared: true,
      vitalSignsShared: false,
      goalsShared: true,
    });

    // Generate JWT token
    const token = generateToken(newUser.id, newUser.email);

    // Send response (exclude sensitive data)
    const sanitizedUser = sanitizeUser(newUser);

    res.status(201).json({
      status: 'success',
      message: 'User registered successfully',
      data: {
        user: sanitizedUser,
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      throw new AppError('Email and password are required', 400);
    }

    // Find user in database
    const [user] = await db.select()
      .from(users)
      .where(eq(users.email, email.toLowerCase()))
      .limit(1);

    if (!user) {
      throw new AppError('Invalid email or password', 401);
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.passwordHash);

    if (!isValidPassword) {
      throw new AppError('Invalid email or password', 401);
    }

    // Generate JWT token
    const token = generateToken(user.id, user.email);

    // Send response (exclude sensitive data)
    const sanitizedUser = sanitizeUser(user);

    res.status(200).json({
      status: 'success',
      message: 'Login successful',
      data: {
        user: sanitizedUser,
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getMe = async (
  req: Request & { userId?: string },
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.userId;

    if (!userId) {
      throw new AppError('User ID not found in request', 401);
    }

    // Fetch user from database
    const [user] = await db.select()
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    // Send response (exclude sensitive data)
    const sanitizedUser = sanitizeUser(user);

    res.status(200).json({
      status: 'success',
      data: {
        user: sanitizedUser,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const requestPasswordReset = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;

    if (!email) {
      throw new AppError('Email is required', 400);
    }

    // TODO: Generate reset token and send email
    // For now, just return success message

    res.status(200).json({
      status: 'success',
      message: 'If an account with that email exists, we have sent a password reset link.',
    });
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token, password } = req.body;

    if (!token || !password) {
      throw new AppError('Token and password are required', 400);
    }

    // TODO: Verify token and update password

    res.status(200).json({
      status: 'success',
      message: 'Password reset successful',
    });
  } catch (error) {
    next(error);
  }
};

export const verifyEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.body;

    if (!token) {
      throw new AppError('Verification token is required', 400);
    }

    // TODO: Verify email token and update user

    res.status(200).json({
      status: 'success',
      message: 'Email verified successfully',
    });
  } catch (error) {
    next(error);
  }
};