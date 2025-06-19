import { sessionsTable, usersTable } from '../src/db/schema';
import { beforeAll, beforeEach } from 'bun:test';
import { db } from '../src/db';

beforeAll(async () => {
    Bun.env.PORT = '4000';
    Bun.env.NODE_ENV = 'test';
    Bun.env.DATABASE_URL = 'mysql://user:password@localhost:3307/db_test';
    Bun.env.SESSION_SECRET = 'your_secret_here';
});

beforeEach(async () => {
    await db.delete(sessionsTable);
    await db.delete(usersTable);
});
