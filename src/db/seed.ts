import { drizzle } from 'drizzle-orm/mysql2';
import { createConnection } from 'mysql2';
import * as schema from './schema';
import mockUsers from './users.json';
import { env } from '../config';
import bcrypt from 'bcryptjs';

const connection = createConnection(env.DATABASE_URL);
const db = drizzle(connection, { mode: 'default', schema });

async function seed() {
    console.log('🌱 Seeding started');
    console.time(`🌱 Database has been seeded`);
    connection.connect();

    console.time('🧹 Cleaned up the database');
    await db.delete(schema.usersTable);
    await db.delete(schema.sessionsTable);
    console.timeEnd('🧹 Cleaned up the database');

    console.time(`👤 Created ${mockUsers.length} users`);
    for (const user of mockUsers) {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        if (!hashedPassword) throw new Error('Error during hashing password');

        await db.insert(schema.usersTable).values({ username: user.username, email: user.email, password: hashedPassword });
    }
    console.timeEnd(`👤 Created ${mockUsers.length} users`);

    connection.end();
    console.timeEnd(`🌱 Database has been seeded`);
}

seed()
    .catch((error) => {
        console.error('Error during seeding:', error);
    })
    .finally(() => process.exit(0));
