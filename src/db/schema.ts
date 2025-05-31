import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

export const usersTable = sqliteTable('users', {
    id: text().primaryKey().$defaultFn(() => Bun.randomUUIDv7()),
    name: text().notNull(),
    email: text().notNull().unique(),
    password: text().notNull(),
    createdAt: text().default(sql`(CURRENT_TIMESTAMP)`),
    updatedAt: text().default(sql`(CURRENT_TIMESTAMP)`).$onUpdate(() => sql`CURRENT_TIMESTAMP`),
});

export const sessionsTable = sqliteTable('sessions', {
    id: text().primaryKey().$defaultFn(() => Bun.randomUUIDv7()),
    user_id: text().notNull().references(() => usersTable.id),
    expires_at: text().notNull(),
    createdAt: text().default(sql`(CURRENT_TIMESTAMP)`),
    updatedAt: text().default(sql`(CURRENT_TIMESTAMP)`).$onUpdate(() => sql`CURRENT_TIMESTAMP`),
});

export type User = typeof usersTable.$inferSelect;
export type NewUser = typeof usersTable.$inferInsert;

export type Session = typeof sessionsTable.$inferSelect;
export type NewSession = typeof sessionsTable.$inferInsert;
