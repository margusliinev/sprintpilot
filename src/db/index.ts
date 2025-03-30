import { drizzle } from 'drizzle-orm/mysql2';
import { env } from '../helpers/env';

export const db = drizzle({ connection: env.DATABASE_URL });
