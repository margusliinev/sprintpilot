import { pgTable, uuid, varchar, timestamp } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const usersTable = pgTable('users', {
    id: uuid().primaryKey().$defaultFn(() => Bun.randomUUIDv7()),
    name: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
    password: varchar({ length: 255 }).notNull(),
    created_at: timestamp({ mode: 'string', withTimezone: true }).defaultNow().notNull(),
    updated_at: timestamp({ mode: 'string', withTimezone: true }).defaultNow().notNull().$onUpdate(() => sql`CURRENT_TIMESTAMP`),
});

export const sessionsTable = pgTable('sessions', {
    id: uuid().primaryKey().$defaultFn(() => Bun.randomUUIDv7()),
    user_id: uuid().notNull().references(() => usersTable.id),
    expires_at: timestamp({ mode: 'string', withTimezone: true }).notNull(),
    created_at: timestamp({ mode: 'string', withTimezone: true }).notNull().defaultNow(),
    updated_at: timestamp({ mode: 'string', withTimezone: true }).notNull().defaultNow().$onUpdate(() => sql`CURRENT_TIMESTAMP`),
});

export type User = typeof usersTable.$inferSelect;
export type Session = typeof sessionsTable.$inferSelect;

export type NewUser = typeof usersTable.$inferInsert;
export type NewSession = typeof sessionsTable.$inferInsert;
