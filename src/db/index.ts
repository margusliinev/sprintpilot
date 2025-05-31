import { migrate } from 'drizzle-orm/bun-sqlite/migrator';
import { drizzle } from 'drizzle-orm/bun-sqlite';
import { Database } from 'bun:sqlite';
import { env } from '../helpers/env';

const sqlite = new Database(env.DATABASE_URL, { create: true });
sqlite.exec('PRAGMA journal_mode = WAL;');
sqlite.exec('PRAGMA foreign_keys = ON;');
sqlite.exec('PRAGMA synchronous = NORMAL;');

export const db = drizzle({ client: sqlite });

export function runMigrations() {
    try {
        console.info('🚧 Database migration started');
        migrate(db, { migrationsFolder: './src/db/migrations' });
        console.info('✅ Database migration completed');
    } catch (error) {
        console.error('❌ Database migration failed');
        throw error;
    }
}
