import { Spinner, Button, Input, Label } from '@/components/ui';
import { Form, Link, useActionData, useNavigation } from '@remix-run/react';
import { ActionFunctionArgs, json } from '@remix-run/node';
import { validateAction } from '@/utils/validateAction';
import { registerSchema, registerDto } from './schema';
import { createUser, getUserByEmail, getUserByUsername } from '@/models/user.server';
import { useState, useEffect, useRef } from 'react';
import { hashPassword, setCookieSessionAndRedirect } from '@/utils/auth.server';
import { createSession } from '@/models/session.server';

type ActionResponse = {
    body?: registerDto;
    errors?: Record<string, string>;
};

export async function action({ request }: ActionFunctionArgs) {
    const { body, errors } = await validateAction<registerDto>({ request, schema: registerSchema });
    if (errors) return json<ActionResponse>({ errors }, { status: 400 });

    const existingUsername = await getUserByUsername(body.username);
    if (existingUsername) return json<ActionResponse>({ errors: { username: 'Username is already in use' } }, { status: 400 });

    const existingEmail = await getUserByEmail(body.email);
    if (existingEmail) return json<ActionResponse>({ errors: { email: 'Email is already in use' } }, { status: 400 });

    const hash = await hashPassword(body.password);
    if (!hash) return json<ActionResponse>({ errors: { default: 'Internal server error' } }, { status: 500 });

    const newUser = await createUser({ username: body.username, email: body.email, password: hash });
    if (!newUser) return json<ActionResponse>({ errors: { default: 'Internal server error' } }, { status: 500 });

    const session = await createSession(newUser.id);
    if (!session) return json<ActionResponse>({ errors: { default: 'Internal server error' } }, { status: 500 });

    return setCookieSessionAndRedirect(request, session, '/dashboard');
}

export default function Register() {
    const [isUsernameError, setIsUsernameError] = useState<true | undefined>(undefined);
    const [isEmailError, setIsEmailError] = useState<true | undefined>(undefined);
    const [isPasswordError, setIsPasswordError] = useState<true | undefined>(undefined);
    const usernameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const actionData = useActionData<typeof action>();
    const navigation = useNavigation();
    const submitting = navigation.formAction === '/register';

    useEffect(() => {
        setIsUsernameError(undefined);
        setIsEmailError(undefined);
        setIsPasswordError(undefined);

        for (const error in actionData?.errors) {
            if (error === 'username') setIsUsernameError(true);
            if (error === 'email') setIsEmailError(true);
            if (error === 'password') setIsPasswordError(true);
        }
    }, [actionData]);

    return (
        <div className='w-screen-90 max-w-md rounded-lg border px-6 py-8 shadow-sm z-10 bg-card text-card-foreground my-20'>
            <div className='grid place-items-center text-center'>
                <img src='logo.svg' alt='logo' width={25} height={25} className='mb-2' />
                <h1 className='mb-1 text-2xl font-semibold'>Create an account</h1>
                <p className='mb-8 text-sm text-secondary-foreground'>And lets get you started with your free trial</p>
            </div>
            <Form className='grid gap-4' method='POST' action='/register'>
                <fieldset className='space-y-1'>
                    <Label htmlFor='username'>Username</Label>
                    <Input ref={usernameRef} type='text' name='username' id='username' aria-invalid={isUsernameError} onChange={() => setIsUsernameError(undefined)} required />
                    {isUsernameError && <p className='text-sm text-destructive'>{actionData?.errors?.username}</p>}
                </fieldset>
                <fieldset className='space-y-1'>
                    <Label htmlFor='email'>Email</Label>
                    <Input ref={emailRef} type='email' name='email' id='email' aria-invalid={isEmailError} onChange={() => setIsEmailError(undefined)} required />
                    {isEmailError && <p className='text-sm text-destructive'>{actionData?.errors?.email}</p>}
                </fieldset>
                <fieldset className='space-y-1'>
                    <Label htmlFor='password'>Password</Label>
                    <Input ref={passwordRef} type='password' name='password' id='password' aria-invalid={isPasswordError} onChange={() => setIsPasswordError(undefined)} required />
                    {isPasswordError && <p className='text-sm text-destructive'>{actionData?.errors?.password}</p>}
                </fieldset>
                <Button type='submit' size={'sm'} className='mb-2 mt-2'>
                    {submitting ? <Spinner /> : 'Register'}
                </Button>
            </Form>
            <div className='flex justify-center gap-2 text-sm mt-2'>
                <p>Already have an account?</p>
                <Link to='/login' className='font-medium text-primary hover:text-primary-hover transition-colors'>
                    Login
                </Link>
            </div>
        </div>
    );
}
