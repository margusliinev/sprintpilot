import { bigint, index, mysqlTable, timestamp, varchar } from 'drizzle-orm/mysql-core';

// TABLES
export const usersTable = mysqlTable('users', {
    id: bigint('id', { unsigned: true, mode: 'number' }).autoincrement().primaryKey().notNull(),
    username: varchar('username', { length: 255 }).unique().notNull(),
    email: varchar('email', { length: 255 }).unique().notNull(),
    password: varchar('password', { length: 255 }).notNull(),
    created_at: timestamp('created_at').defaultNow().notNull(),
    updated_at: timestamp('updated_at').defaultNow().onUpdateNow().notNull()
});

export const sessionsTable = mysqlTable('sessions', {
    id: bigint('id', { unsigned: true, mode: 'number' }).autoincrement().primaryKey().notNull(),
    expires_at: timestamp('expires_at').notNull(),
    created_at: timestamp('created_at').defaultNow().notNull(),
    updated_at: timestamp('updated_at').defaultNow().onUpdateNow().notNull(),
    user_id: bigint('user_id', { unsigned: true, mode: 'number' }).references(() => usersTable.id, { onDelete: 'cascade', onUpdate: 'cascade' }).notNull()
    }, 
    (table) => { return { user_id_idx: index('user_id_idx').on(table.user_id) };
});

// INFERRED TYPES
export type User = typeof usersTable.$inferSelect;
export type NewUser = typeof usersTable.$inferInsert;
export type Session = typeof sessionsTable.$inferSelect;
export type NewSession = typeof sessionsTable.$inferInsert;
