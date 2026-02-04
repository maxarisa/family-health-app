import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth.js';

export const createFamily = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.userId;
    const { name } = req.body;

    // TODO: Create family group in database

    res.status(201).json({
      status: 'success',
      message: 'Family group created successfully',
      data: {
        family: {
          name,
          adminId: userId,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getFamily = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    // TODO: Fetch family from database

    res.json({
      status: 'success',
      data: {
        family: {
          id,
          // Placeholder data
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getFamilyDashboard = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    // TODO: Fetch family dashboard data

    res.json({
      status: 'success',
      data: {
        dashboard: {
          familyId: id,
          members: [],
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

export const inviteMember = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { email } = req.body;

    // TODO: Create invitation and send email

    res.json({
      status: 'success',
      message: `Invitation sent to ${email}`,
    });
  } catch (error) {
    next(error);
  }
};

export const acceptInvite = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.params;

    // TODO: Verify token and add user to family

    res.json({
      status: 'success',
      message: 'You have joined the family group',
    });
  } catch (error) {
    next(error);
  }
};

export const removeMember = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, memberId } = req.params;

    // TODO: Remove member from family

    res.json({
      status: 'success',
      message: 'Member removed from family',
    });
  } catch (error) {
    next(error);
  }
};

export const leaveFamily = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    // TODO: Remove user from family

    res.json({
      status: 'success',
      message: 'You have left the family group',
    });
  } catch (error) {
    next(error);
  }
};
