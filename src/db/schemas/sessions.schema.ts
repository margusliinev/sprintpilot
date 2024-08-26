import { bigint, index, mysqlTable, timestamp } from 'drizzle-orm/mysql-core';
import { usersTable } from './users.schema';

// TABLES
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
export type Session = typeof sessionsTable.$inferSelect;
export type NewSession = typeof sessionsTable.$inferInsert;
