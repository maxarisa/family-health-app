import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import * as schema from './schema.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// SQLite database file path
const dbPath = process.env.DATABASE_URL || path.join(__dirname, '../../database/family-health.db');

// Create libsql client (works with local SQLite files)
const sqlite = createClient({
  url: `file:${dbPath}`
});

export const db = drizzle(sqlite, { schema });

export * from './schema.js';
