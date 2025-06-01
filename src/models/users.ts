import type { User, NewUser, Session } from '../db/schema.ts';
import { InternalServerErrorException } from '../helpers/errors';
import { usersTable, sessionsTable } from '../db/schema';
import { eq, getTableColumns } from 'drizzle-orm';
import { db } from '../db/index';

const { password, ...userColumns } = getTableColumns(usersTable);

async function getUserByEmail(email: User['email']) {
    return db.select(userColumns).from(usersTable).where(eq(usersTable.email, email.toLowerCase()));
}

async function getUserByEmailWithPassword(email: User['email']) {
    return db.select().from(usersTable).where(eq(usersTable.email, email.toLowerCase()));
}

async function getUserWithSession(sessionId: Session['id']) {
    return db
        .select({
            user: userColumns,
            session: sessionsTable,
        })
        .from(sessionsTable)
        .innerJoin(usersTable, eq(sessionsTable.user_id, usersTable.id))
        .where(eq(sessionsTable.id, sessionId));
}

async function createNewUser(user: NewUser) {
    return db.transaction(async (tx) => {
        const [newUser] = await tx.insert(usersTable).values(user).returning();
        if (!newUser) throw new InternalServerErrorException();

        const [createdUser] = await tx.select(userColumns).from(usersTable).where(eq(usersTable.id, newUser.id));
        return createdUser;
    });
}

async function deleteUserSessions(userId: User['id']) {
    return db.delete(sessionsTable).where(eq(sessionsTable.user_id, userId));
}

export const userModel = {
    getUserByEmail,
    getUserByEmailWithPassword,
    getUserWithSession,
    createNewUser,
    deleteUserSessions,
};
