import { createFileRoute } from '@tanstack/react-router';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export const Route = createFileRoute('/register')({
    component: RegisterPage,
});

function RegisterPage() {
    return (
        <div className='min-h-screen w-full bg-gradient-to-br from-zinc-900 via-background to-zinc-900/90 flex flex-col overflow-hidden'>
            {/* Header */}
            <header className='w-full flex justify-center fixed top-0 left-0 z-30 bg-transparent'>
                <div className='container mx-auto mt-4 px-4'>
                    <div className='flex items-center justify-between bg-card/80 border border-border/40 rounded-2xl shadow-lg px-6 py-3 backdrop-blur-md'>
                        <a href='/' className='flex items-center gap-2 group'>
                            <img src='/logo.svg' alt='SprintPilot Logo' className='w-8 h-8' />
                            <span className='font-bold text-lg tracking-tight text-zinc-200 transition-colors duration-200 group-hover:text-zinc-400'>Sprintpilot</span>
                        </a>
                        <nav className='flex gap-2 md:gap-4 items-center'>
                            <a
                                href='/login'
                                className='text-muted-foreground hover:text-primary transition font-medium px-3 py-1.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60'
                            >
                                Login
                            </a>
                            <a href='/register' className='ml-1'>
                                <Button size='sm' className='px-5 font-semibold shadow-md'>
                                    Register
                                </Button>
                            </a>
                        </nav>
                    </div>
                </div>
            </header>
            <div className='flex-1 flex items-center justify-center pt-32'>
                <div className='absolute inset-0 blur-3xl bg-gradient-to-br from-zinc-500/20 via-zinc-500/10 to-zinc-900/20 -z-10' />
                <div className='relative z-10 w-full max-w-md mx-auto bg-card/80 rounded-2xl shadow-xl p-8 border border-border/40 flex flex-col items-center'>
                    <img src='/logo.svg' alt='SprintPilot Logo' className='w-16 h-16 mb-6' />
                    <h1 className='text-2xl font-bold mb-2 text-center bg-gradient-to-r from-zinc-200 to-zinc-400 bg-clip-text text-transparent'>Create your account</h1>
                    <p className='text-muted-foreground mb-6 text-center text-sm'>Join Sprintpilot and start planning your first sprint.</p>
                    <form className='w-full flex flex-col gap-4'>
                        <div>
                            <Label htmlFor='name'>Name</Label>
                            <Input id='name' type='text' placeholder='Your name' autoComplete='name' required className='mt-1' />
                        </div>
                        <div>
                            <Label htmlFor='email'>Email</Label>
                            <Input id='email' type='email' placeholder='you@email.com' autoComplete='email' required className='mt-1' />
                        </div>
                        <div>
                            <Label htmlFor='password'>Password</Label>
                            <Input id='password' type='password' placeholder='••••••••' autoComplete='new-password' required className='mt-1' />
                        </div>
                        <div>
                            <Label htmlFor='confirm_password'>Confirm Password</Label>
                            <Input id='confirm_password' type='password' placeholder='••••••••' autoComplete='new-password' required className='mt-1' />
                        </div>
                        <Button type='submit' size='lg' className='mt-2 w-full'>
                            Create Account
                        </Button>
                    </form>
                    <div className='mt-6 text-sm text-muted-foreground text-center'>
                        Already have an account?{' '}
                        <a href='/login' className='text-primary underline hover:opacity-80 transition'>
                            Sign in
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
