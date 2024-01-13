import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { usersTable } from './schema';
import * as schema from './schema';
import mockUsers from './users.json';
import bcrypt from 'bcryptjs';
import pg from 'pg';

if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not defined');
}

const connection = new pg.Client({
    connectionString: process.env.DATABASE_URL,
});

const client = drizzle(connection, { schema });

async function seed() {
    console.log('🌱 Seeding started');
    console.time(`🌱 Database has been seeded`);
    await connection.connect();

    console.time('🧹 Cleaned up the database');
    await client.delete(usersTable);
    console.timeEnd('🧹 Cleaned up the database');

    console.time(`👤 Created ${mockUsers.length} users`);
    for (const user of mockUsers) {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        await client.insert(usersTable).values({ username: user.username, email: user.email, password: hashedPassword });
    }
    console.timeEnd(`👤 Created ${mockUsers.length} users`);

    await connection.end();
    console.timeEnd(`🌱 Database has been seeded`);
}

seed().catch((error) => {
    console.error('Error during seeding:', error);
    process.exit(1);
});
