import { drizzle } from 'drizzle-orm/mysql2';
import { createConnection } from 'mysql2';
import { seedUsers } from './seeds';
import { env } from '../utils';
import * as schema from './schemas';

const connection = createConnection({ uri: env.DATABASE_URL });
const db = drizzle(connection, { mode: 'default', schema });

async function seed() {
    console.time(`🌱 Database has been seeded`);
    connection.connect();

    console.time('🧹 Cleaned up the database');
    await db.delete(schema.usersTable);
    await db.delete(schema.sessionsTable);
    console.timeEnd('🧹 Cleaned up the database');

    await seedUsers(db);

    connection.end();
    console.timeEnd(`🌱 Database has been seeded`);
}

seed()
    .catch((error) => {
        console.error('Error during seeding:', error);
    })
    .finally(() => process.exit(0));
