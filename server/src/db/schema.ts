import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

// Users table
export const users = sqliteTable('users', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  name: text('name').notNull(),
  age: integer('age'),
  height: real('height'), // in cm
  currentWeight: real('current_weight'), // in kg
  coachStyle: text('coach_style').$type<'encouraging' | 'motivating' | 'informative' | 'friendly'>().default('encouraging'),
  emailVerified: integer('email_verified', { mode: 'boolean' }).default(false),
  emailVerificationToken: text('email_verification_token'),
  passwordResetToken: text('password_reset_token'),
  passwordResetExpires: integer('password_reset_expires', { mode: 'timestamp' }),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$defaultFn(() => new Date()).notNull(),
});

// Privacy settings table
export const privacySettings = sqliteTable('privacy_settings', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  waterIntakeShared: integer('water_intake_shared', { mode: 'boolean' }).default(true),
  exerciseShared: integer('exercise_shared', { mode: 'boolean' }).default(true),
  weightShared: integer('weight_shared', { mode: 'boolean' }).default(false),
  sleepShared: integer('sleep_shared', { mode: 'boolean' }).default(true),
  vitalSignsShared: integer('vital_signs_shared', { mode: 'boolean' }).default(false),
  goalsShared: integer('goals_shared', { mode: 'boolean' }).default(true),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$defaultFn(() => new Date()).notNull(),
});

// Family groups table
export const families = sqliteTable('families', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text('name').notNull(),
  adminId: text('admin_id').references(() => users.id, { onDelete: 'set null' }),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$defaultFn(() => new Date()).notNull(),
});

// Family members table
export const familyMembers = sqliteTable('family_members', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  familyId: text('family_id').notNull().references(() => families.id, { onDelete: 'cascade' }),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  joinedAt: integer('joined_at', { mode: 'timestamp' }).$defaultFn(() => new Date()).notNull(),
});

// Family invitations table
export const familyInvitations = sqliteTable('family_invitations', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  familyId: text('family_id').notNull().references(() => families.id, { onDelete: 'cascade' }),
  email: text('email').notNull(),
  token: text('token').notNull().unique(),
  expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()).notNull(),
});

// Water intake logs
export const waterLogs = sqliteTable('water_logs', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  amount: real('amount').notNull(), // in ml
  loggedAt: integer('logged_at', { mode: 'timestamp' }).$defaultFn(() => new Date()).notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()).notNull(),
});

// Exercise logs
export const exerciseLogs = sqliteTable('exercise_logs', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  activityType: text('activity_type').$type<'walking' | 'running' | 'hiking' | 'cycling' | 'swimming' | 'yoga' | 'strength_training' | 'sports' | 'other'>().notNull(),
  customActivity: text('custom_activity'),
  duration: integer('duration').notNull(), // in minutes
  distance: real('distance'), // in km
  notes: text('notes'),
  loggedAt: integer('logged_at', { mode: 'timestamp' }).$defaultFn(() => new Date()).notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()).notNull(),
});

// Weight logs
export const weightLogs = sqliteTable('weight_logs', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  weight: real('weight').notNull(), // in kg
  waist: real('waist'), // in cm
  hips: real('hips'), // in cm
  loggedAt: integer('logged_at', { mode: 'timestamp' }).$defaultFn(() => new Date()).notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()).notNull(),
});

// Sleep logs
export const sleepLogs = sqliteTable('sleep_logs', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  duration: integer('duration').notNull(), // in minutes
  bedtime: integer('bedtime', { mode: 'timestamp' }),
  wakeTime: integer('wake_time', { mode: 'timestamp' }),
  quality: text('quality').$type<'poor' | 'fair' | 'good' | 'excellent'>(),
  notes: text('notes'),
  loggedAt: integer('logged_at', { mode: 'timestamp' }).$defaultFn(() => new Date()).notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()).notNull(),
});

// Blood pressure logs
export const bloodPressureLogs = sqliteTable('blood_pressure_logs', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  systolic: integer('systolic').notNull(),
  diastolic: integer('diastolic').notNull(),
  pulse: integer('pulse'),
  notes: text('notes'),
  loggedAt: integer('logged_at', { mode: 'timestamp' }).$defaultFn(() => new Date()).notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()).notNull(),
});

// Heart rate logs
export const heartRateLogs = sqliteTable('heart_rate_logs', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  heartRate: integer('heart_rate').notNull(),
  type: text('type').$type<'resting' | 'active'>(),
  notes: text('notes'),
  loggedAt: integer('logged_at', { mode: 'timestamp' }).$defaultFn(() => new Date()).notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()).notNull(),
});

// Temperature logs
export const temperatureLogs = sqliteTable('temperature_logs', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  temperature: real('temperature').notNull(),
  method: text('method').$type<'oral' | 'forehead' | 'ear' | 'armpit'>(),
  symptoms: text('symptoms'),
  notes: text('notes'),
  loggedAt: integer('logged_at', { mode: 'timestamp' }).$defaultFn(() => new Date()).notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()).notNull(),
});

// Goals table
export const goals = sqliteTable('goals', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  type: text('type').$type<'weight_loss' | 'weight_gain' | 'weight_maintenance' | 'bmi_target' | 'exercise_minutes' | 'water_intake' | 'sleep_hours' | 'blood_pressure' | 'heart_rate'>().notNull(),
  targetValue: real('target_value').notNull(),
  currentValue: real('current_value'),
  startDate: integer('start_date', { mode: 'timestamp' }).$defaultFn(() => new Date()).notNull(),
  targetDate: integer('target_date', { mode: 'timestamp' }).notNull(),
  status: text('status').$type<'active' | 'completed' | 'abandoned'>().default('active'),
  isShared: integer('is_shared', { mode: 'boolean' }).default(true),
  actionPlan: text('action_plan'),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$defaultFn(() => new Date()).notNull(),
});

// Reminders table
export const reminders = sqliteTable('reminders', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  type: text('type').notNull(), // 'water', 'exercise', 'weight', 'medication'
  title: text('title').notNull(),
  message: text('message'),
  time: text('time').notNull(), // HH:MM format
  isActive: integer('is_active', { mode: 'boolean' }).default(true),
  daysOfWeek: text('days_of_week'), // JSON array of day numbers
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$defaultFn(() => new Date()).notNull(),
});