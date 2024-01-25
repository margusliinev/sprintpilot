import { usersTable, User, NewUser } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { db } from '@/db';

export async function getUserById(id: User['id']) {
    try {
        return await db.query.usersTable.findFirst({ where: eq(usersTable.id, id), columns: { password: false } });
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function getUserByUsername(username: User['username']) {
    try {
        return await db.query.usersTable.findFirst({ where: eq(usersTable.username, username.toLowerCase()), columns: { password: false } });
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function getUserByEmail(email: User['email']) {
    try {
        return await db.query.usersTable.findFirst({ where: eq(usersTable.email, email.toLowerCase()), columns: { password: false } });
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function getUserByEmailWithPassword(email: User['email']) {
    try {
        return await db.query.usersTable.findFirst({ where: eq(usersTable.email, email.toLowerCase()) });
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function createUser(user: NewUser) {
    try {
        return await db.transaction(async (tx) => {
            const createUser = await tx.insert(usersTable).values(user);
            const getUser = await tx.query.usersTable.findFirst({ where: eq(usersTable.id, createUser[0].insertId), columns: { password: false } });
            return getUser;
        });
    } catch (error) {
        console.error(error);
        return null;
    }
}
