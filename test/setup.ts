import { sessionsTable, usersTable } from '../src/db/schema';
import { beforeAll, beforeEach } from 'bun:test';
import { db, runMigrations } from '../src/db';

beforeAll(async () => {
    runMigrations();
});

beforeEach(async () => {
    await db.delete(sessionsTable);
    await db.delete(usersTable);
});
