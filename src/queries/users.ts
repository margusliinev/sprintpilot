import type { User, NewUser, Session } from '../db/schema.ts';
import { InternalServerErrorException } from '../helpers/index.ts';
import { usersTable, sessionsTable } from '../db/schema.ts';
import { eq, getTableColumns } from 'drizzle-orm';
import { db } from '../db/index.ts';

const { password, ...userColumns } = getTableColumns(usersTable);

async function getUserByEmail(email: User['email']) {
    const [result] = await db.select(userColumns).from(usersTable).where(eq(usersTable.email, email.toLowerCase()));
    return result;
}

async function getUserByEmailWithPassword(email: User['email']) {
    const [result] = await db.select().from(usersTable).where(eq(usersTable.email, email.toLowerCase()));
    return result;
}

async function getUserWithSession(sessionId: Session['id']) {
    const [result] = await db
        .select({
            user: userColumns,
            session: sessionsTable,
        })
        .from(sessionsTable)
        .innerJoin(usersTable, eq(sessionsTable.user_id, usersTable.id))
        .where(eq(sessionsTable.id, sessionId));
    return result;
}

async function createNewUser(user: NewUser) {
    const result = await db.transaction(async (tx) => {
        const [newUser] = await tx.insert(usersTable).values(user).$returningId();
        if (!newUser) throw new InternalServerErrorException();

        const [createdUser] = await tx.select(userColumns).from(usersTable).where(eq(usersTable.id, newUser.id));
        return createdUser;
    });
    return result;
}

async function deleteUserSessions(userId: User['id']) {
    await db.delete(sessionsTable).where(eq(sessionsTable.user_id, userId));
}

export { getUserByEmail, getUserByEmailWithPassword, getUserWithSession, createNewUser, deleteUserSessions };
