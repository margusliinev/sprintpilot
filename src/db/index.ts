import { migrate } from 'drizzle-orm/bun-sql/migrator';
import { drizzle } from 'drizzle-orm/bun-sql';
import { env } from '../helpers/env';

export const db = drizzle(env.DATABASE_URL);
export async function runMigrations() {
    try {
        console.log('Starting database migrations...');
        const start = performance.now();

        await migrate(db, { migrationsFolder: './src/db/migrations' });

        const end = performance.now();
        console.log(`Database migrations completed successfully in ${(end - start).toFixed(2)}ms`);

        return { success: true };
    } catch (error) {
        console.error('Database migration failed:', error);
        throw error;
    }
}
