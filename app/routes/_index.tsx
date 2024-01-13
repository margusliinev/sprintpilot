import { Button, Input, Label } from '@/components/ui';
import { User } from 'lucide-react';

export default function Index() {
    return (
        <main className='h-screen w-screen grid place-items-center'>
            <nav className='fixed top-0 h-20 w-full grid place-items-center p-2 border-b-2 shadow-lg'>
                <div className='flex items-center justify-between w-screen-90'>
                    <div className='flex items-center gap-2'>
                        <img src={'logo.png'} alt='logo' className='w-7 h-10' />
                        <h1 className='text-4xl font-medium'>sprintpilot</h1>
                    </div>
                    <div className='flex items-center gap-4'>
                        <p className='text-xl'>John Doe</p>
                        <span className='bg-transparent p-2 rounded-full border-white border-2'>
                            <User size={24} />
                        </span>
                    </div>
                </div>
            </nav>
            <form className='grid gap-4 w-screen-90 max-w-sm p-6 bg-background shadow-md border rounded-md' noValidate autoComplete='off'>
                <h1 className='text-lg font-semibold text-center'>Create an account</h1>
                <fieldset className='space-y-1'>
                    <Label htmlFor='username'>Username</Label>
                    <Input id='username' name='username' type='text'></Input>
                </fieldset>
                <fieldset className='space-y-1'>
                    <Label htmlFor='email'>Email</Label>
                    <Input id='email' name='email' type='email'></Input>
                </fieldset>
                <fieldset className='space-y-1'>
                    <Label htmlFor='password'>Password</Label>
                    <Input id='password' name='password' type='password'></Input>
                </fieldset>
                <Button type='submit' size={'sm'} className='mt-2'>
                    Register
                </Button>
            </form>
        </main>
    );
}
