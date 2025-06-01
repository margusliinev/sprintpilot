import type { User, NewUser } from '../../db/schema';
import type { Context } from 'hono';

async function getUserByEmail(ctx: Context, email: User['email']) {
    return ctx.var.models.user.getUserByEmail(email);
}

async function getUserByEmailWithPassword(ctx: Context, email: User['email']) {
    return ctx.var.models.user.getUserByEmailWithPassword(email);
}

async function createNewUser(ctx: Context, newUser: NewUser) {
    return ctx.var.models.user.createNewUser(newUser);
}

export const userService = {
    getUserByEmail,
    getUserByEmailWithPassword,
    createNewUser,
};
