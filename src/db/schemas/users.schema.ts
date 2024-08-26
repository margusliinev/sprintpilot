import { bigint, mysqlTable, timestamp, varchar } from 'drizzle-orm/mysql-core';

// TABLES
export const usersTable = mysqlTable('users', {
    id: bigint('id', { unsigned: true, mode: 'number' }).autoincrement().primaryKey().notNull(),
    username: varchar('username', { length: 255 }).unique().notNull(),
    email: varchar('email', { length: 255 }).unique().notNull(),
    password: varchar('password', { length: 255 }).notNull(),
    created_at: timestamp('created_at').defaultNow().notNull(),
    updated_at: timestamp('updated_at').defaultNow().onUpdateNow().notNull()
});

// INFERRED TYPES
export type User = typeof usersTable.$inferSelect;
export type NewUser = typeof usersTable.$inferInsert;
