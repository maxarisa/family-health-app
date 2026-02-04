#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Starting Family Health App on Railway...');

// Ensure database directory exists
const dbDir = path.join(__dirname, 'database');
if (!fs.existsSync(dbDir)) {
  console.log('📁 Creating database directory...');
  fs.mkdirSync(dbDir, { recursive: true });
}

// Run database migrations
console.log('🔄 Running database migrations...');
const migrateProcess = spawn('npm', ['run', 'db:migrate'], {
  stdio: 'inherit',
  cwd: __dirname
});

migrateProcess.on('close', (code) => {
  if (code === 0) {
    console.log('✅ Migrations completed successfully');
    
    // Check if database is empty and seed it
    const dbPath = path.join(dbDir, 'family-health.db');
    if (!fs.existsSync(dbPath) || fs.statSync(dbPath).size === 0) {
      console.log('🌱 Seeding database with sample data...');
      const seedProcess = spawn('npm', ['run', 'db:seed'], {
        stdio: 'inherit',
        cwd: __dirname
      });
      
      seedProcess.on('close', (seedCode) => {
        if (seedCode === 0) {
          console.log('✅ Database seeded successfully');
        }
        startServer();
      });
    } else {
      startServer();
    }
  } else {
    console.error('❌ Migration failed');
    process.exit(1);
  }
});

function startServer() {
  console.log('🎯 Starting Express server...');
  const serverProcess = spawn('node', ['dist/index.js'], {
    stdio: 'inherit',
    cwd: __dirname
  });
  
  serverProcess.on('close', (code) => {
    console.log(`Server exited with code ${code}`);
    process.exit(code);
  });
}