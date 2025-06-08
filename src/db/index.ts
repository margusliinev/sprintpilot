import type { BunSQLDatabase } from 'drizzle-orm/bun-sql';
import { migrate } from 'drizzle-orm/bun-sql/migrator';
import { drizzle } from 'drizzle-orm/bun-sql';
import { env } from '../helpers/env';
import { SQL } from 'bun';

declare global {
    var db: BunSQLDatabase | undefined;
}

const client = new SQL(env.DATABASE_URL);
let db: BunSQLDatabase;

if (env.NODE_ENV === 'production') {
    db = drizzle({ client });
} else {
    if (!global.db) global.db = drizzle({ client });
    db = global.db;
}

async function runMigrations() {
    try {
        console.info('🚧 Database migrations started');
        await migrate(db, { migrationsFolder: './src/db/migrations' });
        console.info('✅ Database migrations completed');
    } catch (error) {
        console.error('❌ Database migrations failed');
        throw error;
    }
}

export { db, runMigrations };
