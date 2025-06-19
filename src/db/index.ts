import { MySql2Database } from 'drizzle-orm/mysql2';
import { drizzle } from 'drizzle-orm/mysql2';
import { env } from '../helpers/env';
import mysql from 'mysql2/promise';

declare global {
    var db: MySql2Database | undefined;
}

const client = await mysql.createConnection({ uri: env.DATABASE_URL });
let db: MySql2Database;

if (env.NODE_ENV === 'production') {
    db = drizzle({ client });
} else {
    if (!global.db) global.db = drizzle({ client });
    db = global.db;
}

export { db };
