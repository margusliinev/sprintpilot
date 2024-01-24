import { NewUser, User, usersTable } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { db } from '@/db';

export function getUserById(id: User['id']) {
    try {
        const result = db.query.usersTable.findFirst({ where: eq(usersTable.id, id), columns: { password: false } });
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export function getUserByUsername(username: User['username']) {
    try {
        const result = db.query.usersTable.findFirst({ where: eq(usersTable.username, username.toLowerCase()), columns: { password: false } });
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export function getUserByEmail(email: User['email']) {
    try {
        const result = db.query.usersTable.findFirst({ where: eq(usersTable.email, email.toLowerCase()), columns: { password: false } });
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export function createUser(user: NewUser) {
    try {
        const result = db.transaction(async (tx) => {
            const createUser = await tx.insert(usersTable).values(user);
            const getUser = await tx.query.usersTable.findFirst({ where: eq(usersTable.id, createUser[0].insertId), columns: { password: false } });
            return getUser;
        });
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}
