// User Types
export interface User {
  id: string;
  email: string;
  name: string;
  age?: number;
  height?: number; // in cm
  currentWeight?: number; // in kg
  coachStyle: CoachStyle;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export type CoachStyle = 'encouraging' | 'motivating' | 'informative' | 'friendly';

// Privacy Settings
export interface PrivacySettings {
  waterIntakeShared: boolean;
  exerciseShared: boolean;
  weightShared: boolean;
  sleepShared: boolean;
  vitalSignsShared: boolean;
  goalsShared: boolean;
}

// Family Types
export interface Family {
  id: string;
  name: string;
  adminId: string;
  members: FamilyMember[];
  createdAt: string;
}

export interface FamilyMember {
  id: string;
  userId: string;
  name: string;
  joinedAt: string;
}

// Health Log Types
export type ActivityType =
  | 'walking'
  | 'running'
  | 'hiking'
  | 'cycling'
  | 'swimming'
  | 'yoga'
  | 'strength_training'
  | 'sports'
  | 'other';

export type SleepQuality = 'poor' | 'fair' | 'good' | 'excellent';
export type TemperatureMethod = 'oral' | 'forehead' | 'ear' | 'armpit';
export type HeartRateType = 'resting' | 'active';

export interface WaterLog {
  id: string;
  userId: string;
  amount: number; // in ml
  loggedAt: string;
}

export interface ExerciseLog {
  id: string;
  userId: string;
  activityType: ActivityType;
  customActivity?: string;
  duration: number; // in minutes
  distance?: number; // in km
  notes?: string;
  loggedAt: string;
}

export interface WeightLog {
  id: string;
  userId: string;
  weight: number; // in kg
  waist?: number; // in cm
  hips?: number; // in cm
  loggedAt: string;
}

export interface SleepLog {
  id: string;
  userId: string;
  duration: number; // in minutes
  bedtime?: string;
  wakeTime?: string;
  quality?: SleepQuality;
  notes?: string;
  loggedAt: string;
}

export interface BloodPressureLog {
  id: string;
  userId: string;
  systolic: number;
  diastolic: number;
  pulse?: number;
  context?: string;
  notes?: string;
  loggedAt: string;
}

export interface HeartRateLog {
  id: string;
  userId: string;
  bpm: number;
  type: HeartRateType;
  notes?: string;
  loggedAt: string;
}

export interface TemperatureLog {
  id: string;
  userId: string;
  temperature: number; // in Celsius
  method?: TemperatureMethod;
  symptoms?: string;
  notes?: string;
  loggedAt: string;
}

// Goal Types
export type GoalType =
  | 'weight_loss'
  | 'weight_gain'
  | 'weight_maintenance'
  | 'bmi_target'
  | 'exercise_minutes'
  | 'water_intake'
  | 'sleep_hours'
  | 'blood_pressure'
  | 'heart_rate';

export type GoalStatus = 'active' | 'completed' | 'abandoned';

export interface Goal {
  id: string;
  userId: string;
  type: GoalType;
  targetValue: number;
  currentValue?: number;
  startDate: string;
  targetDate: string;
  status: GoalStatus;
  isShared: boolean;
  actionPlan?: string;
  createdAt: string;
  updatedAt: string;
}

// Dashboard Types
export interface DashboardData {
  water: {
    current: number;
    goal: number;
    unit: 'ml';
  };
  exercise: {
    minutes: number;
    goal: number;
  };
  weight: {
    current: number | null;
    trend: 'up' | 'down' | 'stable';
    bmi?: number;
  };
  sleep: {
    hours: number;
    goal: number;
    quality?: SleepQuality;
  };
  vitalSigns: {
    bloodPressure: BloodPressureLog | null;
    heartRate: HeartRateLog | null;
    temperature: TemperatureLog | null;
  };
  streaks: {
    water: number;
    exercise: number;
    logging: number;
  };
}

// API Response Types
export interface ApiResponse<T> {
  status: 'success' | 'error';
  data?: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  status: 'success';
  data: {
    items: T[];
    total: number;
    page: number;
    limit: number;
  };
}

// Auth Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  age?: number;
  height?: number;
  weight?: number;
}

export interface AuthResponse {
  token: string;
  user: User;
}

// Coach Types
export interface CoachMessage {
  message: string;
  type: 'daily_checkin' | 'motivational' | 'celebration' | 'reminder';
}
