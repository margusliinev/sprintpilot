import { InternalServerErrorException, BadRequestException } from '../../config';
import { userRepository } from '../../modules/users/users.repository';
import { loginDto, registerDto } from './auth.schema';
import bcrypt from 'bcryptjs';

async function register(data: registerDto) {
    const existingUsername = await userRepository.getUserByUsername(data.username);
    if (existingUsername) throw new BadRequestException({ field: 'username', message: 'Username already exists' });

    const existingEmail = await userRepository.getUserByEmail(data.email);
    if (existingEmail) throw new BadRequestException({ field: 'email', message: 'Email already exists' });

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const newUser = await userRepository.createUser({ ...data, password: hashedPassword });
    if (!newUser) throw new InternalServerErrorException();

    const session = await userRepository.createUserSession(newUser.id);
    if (!session) throw new InternalServerErrorException();

    return session;
}

async function login(data: loginDto) {
    const user = await userRepository.getUserByEmailWithPassword(data.email);
    if (!user) throw new BadRequestException({ field: 'email', message: 'Invalid email or password' });

    const validPassword = await bcrypt.compare(data.password, user.password);
    if (!validPassword) throw new BadRequestException({ field: 'email', message: 'Invalid email or password' });

    const session = await userRepository.createUserSession(user.id);
    if (!session) throw new InternalServerErrorException();

    return session;
}

export const authService = {
    register,
    login
};
