import { Button, Input, Label, Spinner } from '@/components/ui';
import { ActionFunctionArgs, json } from '@remix-run/node';
import { getUserByEmailWithPassword } from '@/models/user.server';
import { validateAction } from '@/utils/validateAction';
import { setCookieSessionAndRedirect, verifyPassword } from '@/utils/auth.server';
import { createSession } from '@/models/session.server';
import { loginSchema, loginDto } from './schema';
import { Form, Link, useActionData, useNavigation } from '@remix-run/react';
import { useEffect, useState } from 'react';

type ActionResponse = {
    body?: loginDto;
    errors?: Record<string, string>;
};

export async function action({ request }: ActionFunctionArgs) {
    const { body, errors } = await validateAction<loginDto>({ request, schema: loginSchema });
    if (errors) return json<ActionResponse>({ errors }, { status: 400 });

    const user = await getUserByEmailWithPassword(body.email);
    if (!user) return json<ActionResponse>({ errors: { all: 'Email or password is incorrect' } }, { status: 400 });

    const passwordMatch = await verifyPassword(body.password, user.password);
    if (!passwordMatch) return json<ActionResponse>({ errors: { all: 'Email or password is incorrect' } }, { status: 500 });

    const session = await createSession(user.id);
    if (!session) return json<ActionResponse>({ errors: { default: 'Internal server error' } }, { status: 500 });

    return setCookieSessionAndRedirect(request, session, '/dashboard');
}

export default function Login() {
    const [isEmailError, setIsEmailError] = useState<true | undefined>(undefined);
    const [isPasswordError, setIsPasswordError] = useState<true | undefined>(undefined);
    const actionData = useActionData<typeof action>();
    const navigation = useNavigation();
    const submitting = navigation.formAction === '/login';

    useEffect(() => {
        setIsEmailError(undefined);
        setIsPasswordError(undefined);

        for (const error in actionData?.errors) {
            if (error === 'all') {
                setIsEmailError(true);
                setIsPasswordError(true);
            }
            if (error === 'email') setIsEmailError(true);
            if (error === 'password') setIsPasswordError(true);
        }
    }, [actionData]);

    return (
        <div className='w-screen-90 max-w-md rounded-lg border px-6 py-8 shadow-sm z-10 bg-card text-card-foreground my-20'>
            <div className='grid place-items-center text-center'>
                <img src='logo.svg' alt='logo' width={25} height={25} className='mb-2' />
                <h1 className='mb-1 text-2xl font-semibold'>Welcome back!</h1>
                <p className='mb-8 text-sm text-secondary-foreground'>Please enter your credentials to log in!</p>
            </div>
            <Form className='grid gap-4' method='POST' noValidate>
                <fieldset className='space-y-1'>
                    <Label htmlFor='email'>Email</Label>
                    <Input
                        type='email'
                        name='email'
                        id='email'
                        aria-invalid={isEmailError}
                        aria-describedby='email-error'
                        onChange={() => {
                            setIsEmailError(undefined);
                            setIsPasswordError(undefined);
                        }}
                    />
                    {isEmailError && (
                        <p className='text-sm text-destructive' id='email-error'>
                            {actionData?.errors?.email || actionData?.errors?.all}
                        </p>
                    )}
                </fieldset>
                <fieldset className='space-y-1'>
                    <Label htmlFor='password'>Password</Label>
                    <Input
                        type='password'
                        name='password'
                        id='password'
                        aria-invalid={isPasswordError}
                        aria-describedby='password-error'
                        onChange={() => {
                            setIsEmailError(undefined);
                            setIsPasswordError(undefined);
                        }}
                    />
                    {isPasswordError && (
                        <p className='text-sm text-destructive' id='password-error'>
                            {actionData?.errors?.password}
                        </p>
                    )}
                </fieldset>
                <Button type='submit' size={'sm'} className='mb-2 mt-2' disabled={submitting}>
                    {submitting ? <Spinner /> : 'Login'}
                </Button>
            </Form>
            <div className='flex justify-center gap-2 text-sm mt-2'>
                <p>Don&apos;t have an account?</p>
                <Link to='/register' className='font-medium text-primary hover:text-primary-hover transition-colors'>
                    Register
                </Link>
            </div>
        </div>
    );
}
