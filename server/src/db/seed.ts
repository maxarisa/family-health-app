import { db } from './index.js';
import { users, families, familyMembers, privacySettings, goals } from './schema.js';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

async function seed() {
  try {
    console.log('🌱 Seeding database...');

    // Create sample users
    const hashedPassword = await bcrypt.hash('password123', 12);
    
    const user1 = await db.insert(users).values({
      email: 'john@example.com',
      passwordHash: hashedPassword,
      name: 'John Doe',
      age: 35,
      height: 175.0, // cm
      currentWeight: 70.5, // kg
      coachStyle: 'encouraging',
      emailVerified: true,
    }).returning();

    const user2 = await db.insert(users).values({
      email: 'jane@example.com',
      passwordHash: hashedPassword,
      name: 'Jane Doe',
      age: 32,
      height: 165.0,
      currentWeight: 60.0,
      coachStyle: 'motivating',
      emailVerified: true,
    }).returning();

    const user3 = await db.insert(users).values({
      email: 'kid@example.com',
      passwordHash: hashedPassword,
      name: 'Alex Doe',
      age: 16,
      height: 160.0,
      currentWeight: 55.0,
      coachStyle: 'friendly',
      emailVerified: true,
    }).returning();

    console.log('👥 Created sample users');

    // Create a family
    const family = await db.insert(families).values({
      name: 'The Doe Family',
      adminId: user1[0].id,
    }).returning();

    console.log('👪 Created sample family');

    // Add users to family
    await db.insert(familyMembers).values([
      {
        familyId: family[0].id,
        userId: user1[0].id,
      },
      {
        familyId: family[0].id,
        userId: user2[0].id,
      },
      {
        familyId: family[0].id,
        userId: user3[0].id,
      },
    ]);

    console.log('👨‍👩‍👧‍👦 Added family members');

    // Create privacy settings for users
    await db.insert(privacySettings).values([
      {
        userId: user1[0].id,
        waterIntakeShared: true,
        exerciseShared: true,
        weightShared: false,
        sleepShared: true,
        vitalSignsShared: false,
        goalsShared: true,
      },
      {
        userId: user2[0].id,
        waterIntakeShared: true,
        exerciseShared: true,
        weightShared: true,
        sleepShared: true,
        vitalSignsShared: true,
        goalsShared: true,
      },
      {
        userId: user3[0].id,
        waterIntakeShared: true,
        exerciseShared: true,
        weightShared: false,
        sleepShared: true,
        vitalSignsShared: false,
        goalsShared: false,
      },
    ]);

    console.log('🔒 Created privacy settings');

    // Create sample goals
    await db.insert(goals).values([
      {
        userId: user1[0].id,
        type: 'weight_loss',
        targetValue: 68.0,
        currentValue: 70.5,
        targetDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days from now
        actionPlan: 'Exercise 30 minutes daily, reduce portion sizes, drink more water',
        isShared: true,
      },
      {
        userId: user2[0].id,
        type: 'exercise_minutes',
        targetValue: 150, // 150 minutes per week
        currentValue: 0,
        targetDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year from now
        actionPlan: 'Aim for 30 minutes of exercise 5 days a week',
        isShared: true,
      },
      {
        userId: user1[0].id,
        type: 'water_intake',
        targetValue: 2000, // 2000ml daily
        currentValue: 0,
        targetDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        actionPlan: 'Drink 8 glasses of water daily, set hourly reminders',
        isShared: true,
      },
    ]);

    console.log('🎯 Created sample goals');

    console.log('✅ Database seeded successfully!');
    console.log('\nSample login credentials:');
    console.log('Email: john@example.com | Password: password123');
    console.log('Email: jane@example.com | Password: password123');
    console.log('Email: kid@example.com  | Password: password123');

  } catch (error) {
    console.error('❌ Seeding failed:', error);
    throw error;
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seed()
    .then(() => {
      console.log('🌱 Seeding completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Seeding failed:', error);
      process.exit(1);
    });
}