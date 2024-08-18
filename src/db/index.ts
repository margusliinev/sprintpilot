import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from './schema';
import { env } from '../config';

export const pool = mysql.createPool({
    uri: env.DATABASE_URL
});

export const db = drizzle(pool, { mode: 'default', schema: schema, logger: true });
