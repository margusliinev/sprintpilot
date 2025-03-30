import { InternalServerErrorException } from '../../helpers/errors';
import { eq, getTableColumns } from 'drizzle-orm';
import { User, NewUser } from '../../db/schema';
import { usersTable } from '../../db/schema';
import { db } from '../../db';

const { password, ...userColumns } = getTableColumns(usersTable);

async function getUserByEmail(email: User['email']) {
    const [user] = await db.select(userColumns).from(usersTable).where(eq(usersTable.email, email.toLowerCase()));
    return user;
}

async function getUserByEmailWithPassword(email: User['email']) {
    const [user] = await db.select().from(usersTable).where(eq(usersTable.email, email.toLowerCase()));
    return user;
}

async function createUser(user: NewUser) {
    return db.transaction(async (tx) => {
        const [newUser] = await tx.insert(usersTable).values(user).$returningId();
        if (!newUser) throw new InternalServerErrorException();

        const [createdUser] = await tx.select(userColumns).from(usersTable).where(eq(usersTable.id, newUser.id));
        return createdUser;
    });
}

export const usersRepository = {
    getUserByEmail,
    getUserByEmailWithPassword,
    createUser,
};
