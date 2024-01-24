import { Button, Input, Label } from '@/components/ui';
import { Form, Link } from '@remix-run/react';

export default function Login() {
    return (
        <div className='w-screen-90 max-w-md rounded-lg border px-6 py-8 shadow-sm z-10 bg-card text-card-foreground my-20'>
            <div className='grid place-items-center text-center'>
                <img src='logo.svg' alt='logo' width={25} height={25} className='mb-2' />
                <h1 className='mb-1 text-2xl font-semibold'>Welcome back!</h1>
                <p className='mb-8 text-sm text-secondary-foreground'>Please enter your credentials to log in!</p>
            </div>
            <Form className='grid gap-4' method='POST'>
                <fieldset className='space-y-1'>
                    <Label htmlFor='email'>Email</Label>
                    <Input type='email' name='email' id='email' />
                </fieldset>
                <fieldset className='space-y-1'>
                    <Label htmlFor='password'>Password</Label>
                    <Input type='password' name='password' id='password' />
                </fieldset>
                <Button type='submit' size={'sm'} className='mb-2 mt-2'>
                    Login
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
