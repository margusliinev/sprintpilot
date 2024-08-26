import { drizzle } from 'drizzle-orm/mysql2';
import { createPool } from 'mysql2';
import { env } from '../utils';
import * as schema from './schemas';

const pool = createPool({ uri: env.DATABASE_URL });
export const db = drizzle(pool, { mode: 'default', schema });
