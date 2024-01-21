import { Button, Input, Label } from '@/components/ui';
import { Form, Link } from '@remix-run/react';

export default function Register() {
    return (
        <div className='w-screen-90 max-w-md rounded-lg border px-6 py-8 shadow-sm z-10 bg-card text-card-foreground my-20'>
            <div className='grid place-items-center text-center'>
                <img src='logo.svg' alt='logo' width={25} height={25} className='mb-2' />
                <h1 className='mb-1 text-2xl font-semibold'>Create an account</h1>
                <p className='mb-8 text-sm text-secondary-foreground'>And lets get you started with your free trial</p>
            </div>
            <Form className='grid gap-4' method='POST'>
                <fieldset className='space-y-1'>
                    <Label htmlFor='username'>Username</Label>
                    <Input type='text' name='username' id='username' />
                </fieldset>
                <fieldset className='space-y-1'>
                    <Label htmlFor='email'>Email</Label>
                    <Input type='email' name='email' id='email' />
                </fieldset>
                <fieldset className='space-y-1'>
                    <Label htmlFor='password'>Password</Label>
                    <Input type='password' name='password' id='password' />
                </fieldset>
                <Button type='submit' size={'sm'} className='mb-4 mt-2'>
                    Register
                </Button>
            </Form>
            <div className='flex justify-center gap-2 text-sm sm:text-base'>
                <p>Already have an account?</p>
                <Link to='/login' className='font-medium text-primary hover:text-primary-hover transition-colors'>
                    Login
                </Link>
            </div>
        </div>
    );
}
