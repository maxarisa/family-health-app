import { migrate } from 'drizzle-orm/libsql/migrator';
import { db } from './index.js';
import dotenv from 'dotenv';

dotenv.config();

async function runMigrations() {
  try {
    console.log('🔄 Running migrations...');
    
    await migrate(db, { 
      migrationsFolder: './drizzle',
    });
    
    console.log('✅ Migrations completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

runMigrations();