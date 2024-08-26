import type { NewUser, Session, User } from '../../db/schemas';
import { usersTable, sessionsTable } from '../../db/schemas';
import { eq, and, gt, getTableColumns } from 'drizzle-orm';
import { db } from '../../db';

const SESSION_EXPIRATION_TIME = 1000 * 60 * 60 * 24 * 7;

const { password, ...userColumns } = getTableColumns(usersTable);

async function getUserById(id: User['id']) {
    const [user] = await db.select(userColumns).from(usersTable).where(eq(usersTable.id, id));
    return user;
}

async function getUserBySessionId(sessionId: Session['id']) {
    const [user] = await db
        .select(userColumns)
        .from(sessionsTable)
        .innerJoin(usersTable, eq(sessionsTable.user_id, usersTable.id))
        .where(and(eq(sessionsTable.id, sessionId), gt(sessionsTable.expires_at, new Date())));
    return user;
}

async function getUserByUsername(username: User['username']) {
    const [user] = await db.select(userColumns).from(usersTable).where(eq(usersTable.username, username.toLowerCase()));
    return user;
}

async function getUserByEmail(email: User['email']) {
    const [user] = await db.select(userColumns).from(usersTable).where(eq(usersTable.email, email.toLowerCase()));
    return user;
}

async function getUserByEmailWithPassword(email: User['email']) {
    const [user] = await db.select().from(usersTable).where(eq(usersTable.email, email.toLowerCase()));
    return user;
}

async function getUsers() {
    const [users] = await db.select(userColumns).from(usersTable);
    return users;
}

async function createUser(user: NewUser) {
    return db.transaction(async (tx) => {
        const [newUser] = await tx.insert(usersTable).values(user);
        const [createdUser] = await tx.select(userColumns).from(usersTable).where(eq(usersTable.id, newUser.insertId));
        return createdUser;
    });
}

async function createUserSession(userId: User['id']) {
    return db.transaction(async (tx) => {
        const [newSession] = await tx.insert(sessionsTable).values({ user_id: userId, expires_at: new Date(Date.now() + SESSION_EXPIRATION_TIME) });
        const [createdSession] = await tx.select().from(sessionsTable).where(eq(sessionsTable.id, newSession.insertId));
        return createdSession;
    });
}

async function deleteUserSessions(id: User['id']) {
    return db.delete(sessionsTable).where(eq(sessionsTable.user_id, id));
}

export const usersRepository = {
    getUserById,
    getUserBySessionId,
    getUserByUsername,
    getUserByEmail,
    getUserByEmailWithPassword,
    getUsers,
    createUser,
    createUserSession,
    deleteUserSessions
};
