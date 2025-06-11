import type { Session, NewSession } from '../db/schema';
import { InternalServerErrorException } from '../helpers/errors';
import { sessionsTable } from '../db/schema';
import { db } from '../db/index';
import { eq } from 'drizzle-orm';

async function getSessionByUserId(userId: Session['user_id']) {
    return db.select().from(sessionsTable).where(eq(sessionsTable.user_id, userId));
}

async function getAllSessions() {
    return db.select().from(sessionsTable);
}

async function createNewSession(session: NewSession) {
    return db.transaction(async (tx) => {
        const [newSession] = await tx.insert(sessionsTable).values(session).returning();
        if (!newSession) throw new InternalServerErrorException();

        const [createdSession] = await tx.select().from(sessionsTable).where(eq(sessionsTable.id, newSession.id));
        return createdSession;
    });
}

async function updateSession(sessionId: Session['id'], session: Partial<Session>) {
    return db.update(sessionsTable).set(session).where(eq(sessionsTable.id, sessionId));
}

async function deleteSession(sessionId: Session['id']) {
    return db.delete(sessionsTable).where(eq(sessionsTable.id, sessionId));
}

export const sessionModel = {
    getSessionByUserId,
    getAllSessions,
    createNewSession,
    updateSession,
    deleteSession,
};
