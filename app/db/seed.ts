import 'dotenv/config';
import { usersTable } from './schema';
import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import mockUsers from './users.json';
import bcrypt from 'bcryptjs';
import * as schema from './schema';

if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not defined');
}

const connection = await mysql.createConnection({
    uri: process.env.DATABASE_URL,
});

export const db = drizzle(connection, { schema, mode: 'planetscale' });

async function seed() {
    console.log('🌱 Seeding started');
    console.time(`🌱 Database has been seeded`);
    await connection.connect();

    console.time('🧹 Cleaned up the database');
    await db.delete(usersTable);
    console.timeEnd('🧹 Cleaned up the database');

    console.time(`👤 Created ${mockUsers.length} users`);
    for (const user of mockUsers) {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        await db.insert(usersTable).values({ username: user.username, email: user.email, password: hashedPassword });
    }
    console.timeEnd(`👤 Created ${mockUsers.length} users`);

    await connection.end();
    console.timeEnd(`🌱 Database has been seeded`);
}

seed().catch((error) => {
    console.error('Error during seeding:', error);
    process.exit(1);
});
