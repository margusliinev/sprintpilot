import { migrate } from 'drizzle-orm/mysql2/migrator';
import { drizzle } from 'drizzle-orm/mysql2';
import { env } from '../helpers/index.ts';

export const db = drizzle({ connection: env.DATABASE_URL });
await migrate(db, { migrationsFolder: './src/db/migrations' });
