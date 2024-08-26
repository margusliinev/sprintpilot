import { hashPassword } from '../../utils';
import { usersTable } from '../schemas';
import mockUsers from './users.json';

export async function seedUsers(db: any) {
    console.time(`👤 Created ${mockUsers.length} users`);
    for (const user of mockUsers) {
        const hashedPassword = await hashPassword(user.password);
        if (!hashedPassword) throw new Error('Error during hashing password');

        await db.insert(usersTable).values({ username: user.username, email: user.email, password: hashedPassword });
    }
    console.timeEnd(`👤 Created ${mockUsers.length} users`);
}
