import 'dotenv/config';
import { migrate } from 'drizzle-orm/mysql2/migrator';
import { drizzle } from 'drizzle-orm/mysql2';
import * as schema from './schema';
import mysql from 'mysql2/promise';

if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not defined');
}

const connection = await mysql.createConnection({
    uri: process.env.DATABASE_URL,
});

const db = drizzle(connection, { schema, mode: 'planetscale' });

const start = async () => {
    await connection.connect();
    await migrate(db, { migrationsFolder: './app/db/migrations' });
    await connection.end();
};

start().catch((error) => {
    console.error(error);
    process.exit(1);
});
