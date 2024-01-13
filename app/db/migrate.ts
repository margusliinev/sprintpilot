import 'dotenv/config';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './schema';
import pg from 'pg';

if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not defined');
}

const connection = new pg.Client({
    connectionString: process.env.DATABASE_URL,
});

const client = drizzle(connection, { schema });

const start = async () => {
    await connection.connect();
    console.log('🏁 Connected to db, starting migrations');

    console.time(`🏁 Migrations completed`);
    await migrate(client, { migrationsFolder: './app/db/migrations' });
    await connection.end();
    console.timeEnd(`🏁 Migrations completed`);
};

start().catch((error) => {
    console.error(error);
    process.exit(1);
});
