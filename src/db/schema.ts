import { mysqlTable, varchar, timestamp } from 'drizzle-orm/mysql-core';
import { ulid } from 'ulid';

export const usersTable = mysqlTable('users', {
    id: varchar({ length: 255 }).primaryKey().$defaultFn(() => ulid()),
    name: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
    password: varchar({ length: 255 }).notNull(),
    created_at: timestamp({ mode: 'date' }).notNull().defaultNow(),
    updated_at: timestamp({ mode: 'date' }).notNull().defaultNow().onUpdateNow(),
});

export const sessionsTable = mysqlTable('sessions', {
    id: varchar({ length: 255 }).primaryKey().$defaultFn(() => ulid()),
    user_id: varchar({ length: 255 }).notNull().references(() => usersTable.id),
    expires_at: timestamp({ mode: 'date' }).notNull(),
    created_at: timestamp({ mode: 'date' }).notNull().defaultNow(),
    updated_at: timestamp({ mode: 'date' }).notNull().defaultNow().onUpdateNow(),
});

export type User = typeof usersTable.$inferSelect;
export type Session = typeof sessionsTable.$inferSelect;

export type NewUser = typeof usersTable.$inferInsert;
export type NewSession = typeof sessionsTable.$inferInsert;
