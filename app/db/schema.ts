import { relations } from 'drizzle-orm';
import { mysqlTableCreator, bigint, varchar, timestamp, index } from 'drizzle-orm/mysql-core';

// SCHEMA PREFIX

export const mysqlTable = mysqlTableCreator((name) => `sprintpilot_${name}`);

// TABLES

export const usersTable = mysqlTable('users', {
    id: bigint('id', { unsigned: true, mode: 'number' }).autoincrement().primaryKey().notNull(),
    username: varchar('username', { length: 255 }).unique().notNull(),
    email: varchar('email', { length: 255 }).unique().notNull(),
    password: varchar('password', { length: 255 }).notNull(),
    created_at: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
    updated_at: timestamp('updated_at', { mode: 'date' }).defaultNow().onUpdateNow().notNull(),
});

export const sessionsTable = mysqlTable(
    'sessions',
    {
        id: bigint('id', { unsigned: true, mode: 'number' }).autoincrement().primaryKey().notNull(),
        expires_at: timestamp('expires_at', { mode: 'date' }).notNull(),
        created_at: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
        updated_at: timestamp('updated_at', { mode: 'date' }).defaultNow().onUpdateNow().notNull(),
        user_id: bigint('user_id', { unsigned: true, mode: 'number' })
            .references(() => usersTable.id, { onDelete: 'cascade', onUpdate: 'cascade' })
            .notNull(),
    },
    (table) => {
        return { user_id_idx: index('user_id_idx').on(table.user_id) };
    },
);

// RELATIONS

export const usersRelations = relations(usersTable, ({ many }) => ({
    sessions: many(sessionsTable),
}));

export const sessionsRelations = relations(sessionsTable, ({ one }) => ({
    user: one(usersTable, {
        fields: [sessionsTable.user_id],
        references: [usersTable.id],
    }),
}));

// INFERRED TYPES

export type User = typeof usersTable.$inferSelect;
export type NewUser = typeof usersTable.$inferInsert;
export type Session = typeof sessionsTable.$inferSelect;
export type NewSession = typeof sessionsTable.$inferInsert;
