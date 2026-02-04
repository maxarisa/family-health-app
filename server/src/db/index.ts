import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from './schema.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// SQLite database file path
const dbPath = process.env.DATABASE_URL || path.join(__dirname, '../../database/family-health.db');

const sqlite = new Database(dbPath);
export const db = drizzle(sqlite, { schema });

export * from './schema.js';
