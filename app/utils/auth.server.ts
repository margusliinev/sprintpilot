import bcrypt from 'bcryptjs';

export async function hashPassword(password: string) {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        return hashedPassword;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function verifyPassword(password: string, hashedPassword: string) {
    try {
        const isMatch = await bcrypt.compare(password, hashedPassword);
        return isMatch;
    } catch (error) {
        console.log(error);
        return false;
    }
}
