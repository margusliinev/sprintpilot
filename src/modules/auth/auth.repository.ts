import { sessionsTable, User } from '../../db/schema';
import { eq } from 'drizzle-orm';
import { db } from '../../db';

async function deleteUserSessions(id: User['id']) {
    return db.delete(sessionsTable).where(eq(sessionsTable.user_id, id));
}

export const authRepository = {
    deleteUserSessions
};
