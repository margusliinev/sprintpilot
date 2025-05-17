import type { Session, NewSession } from '../db/schema.ts';
import { InternalServerErrorException } from '../helpers/index.ts';
import { sessionsTable } from '../db/schema.ts';
import { db } from '../db/index.ts';
import { eq } from 'drizzle-orm';

async function createNewSession(session: NewSession) {
    const result = await db.transaction(async (tx) => {
        const [newSession] = await tx.insert(sessionsTable).values(session).$returningId();
        if (!newSession) throw new InternalServerErrorException();

        const [createdSession] = await tx.select().from(sessionsTable).where(eq(sessionsTable.id, newSession.id));
        return createdSession;
    });

    return result;
}

async function updateSession(sessionId: Session['id'], session: Partial<Session>) {
    await db.update(sessionsTable).set(session).where(eq(sessionsTable.id, sessionId));
}

async function deleteSession(sessionId: Session['id']) {
    await db.delete(sessionsTable).where(eq(sessionsTable.id, sessionId));
}

export { createNewSession, updateSession, deleteSession };
