import { BadRequestException, InternalServerErrorException } from '../../helpers/errors';
import { createSession, generateSessionToken } from '../../helpers/auth';
import { usersRepository } from '../users/users.repository';
import { loginDto, registerDto } from './auth.schema';

async function register(data: registerDto) {
    const existingEmail = await usersRepository.getUserByEmail(data.email);
    if (existingEmail) throw new BadRequestException({ email: 'Email already exists' });

    const hashedPassword = await Bun.password.hash(data.password, { algorithm: 'bcrypt' });

    const newUser = await usersRepository.createUser({ ...data, password: hashedPassword });
    if (!newUser) throw new InternalServerErrorException();

    const sessionToken = generateSessionToken();

    const session = await createSession(sessionToken, newUser.id);
    if (!session) throw new InternalServerErrorException();

    return { sessionToken, session };
}

async function login(data: loginDto) {
    const user = await usersRepository.getUserByEmailWithPassword(data.email);
    if (!user) throw new BadRequestException({ email: 'Invalid email or password' });

    const validPassword = await Bun.password.verify(data.password, user.password);
    if (!validPassword) throw new BadRequestException({ email: 'Invalid email or password' });

    const sessionToken = generateSessionToken();

    const session = await createSession(sessionToken, user.id);
    if (!session) throw new InternalServerErrorException();

    return { sessionToken, session };
}

export const authService = {
    register,
    login,
};
