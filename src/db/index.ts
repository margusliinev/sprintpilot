import { MySql2Database } from 'drizzle-orm/mysql2';
import { migrate } from 'drizzle-orm/mysql2/migrator';
import { drizzle } from 'drizzle-orm/mysql2';
import { env } from '../helpers/env';
import mysql from 'mysql2/promise';

declare global {
    var db: MySql2Database | undefined;
}

const client = await mysql.createConnection({ uri: env.DATABASE_URL });
let db: MySql2Database;

if (env.NODE_ENV === 'production') {
    db = drizzle({ client });
} else {
    if (!global.db) global.db = drizzle({ client });
    db = global.db;
}

async function runMigrations() {
    const client = await mysql.createConnection({ uri: env.DATABASE_URL, connectionLimit: 1 });
    const db = drizzle({ client });

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
