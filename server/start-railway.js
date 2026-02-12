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

// Run database migrations using compiled JS (not tsx)
console.log('🔄 Running database migrations...');
const migrateProcess = spawn('node', ['dist/db/migrate.js'], {
  stdio: 'inherit',
  cwd: __dirname
});

migrateProcess.on('close', (code) => {
  if (code === 0) {
    console.log('✅ Migrations completed successfully');
    startServer();
  } else {
    // Migration might fail if tables already exist, continue anyway
    console.log('⚠️ Migration returned non-zero, continuing...');
    startServer();
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