import { createFileRoute } from '@tanstack/react-router';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export const Route = createFileRoute('/login')({
    component: LoginPage,
});

function LoginPage() {
    return (
        <div className='min-h-screen w-full bg-gradient-to-br from-zinc-900 via-background to-zinc-900/90 flex flex-col overflow-hidden'>
            {/* Header */}
            <header className='w-full flex justify-center fixed top-0 left-0 z-30 bg-transparent'>
                <div className='container mx-auto mt-4 px-2 sm:px-4'>
                    <div className='flex items-center justify-between bg-card/80 border border-border/40 rounded-2xl shadow-lg px-3 py-2 sm:px-6 sm:py-3 backdrop-blur-md min-h-[56px]'>
                        <a href='/' className='flex items-center gap-2 group min-w-0'>
                            <img src='/logo.svg' alt='SprintPilot Logo' className='w-8 h-8 flex-shrink-0' />
                            <span className='font-bold text-base sm:text-lg tracking-tight text-zinc-200 transition-colors duration-200 group-hover:text-zinc-400 truncate'>Sprintpilot</span>
                        </a>
                        <nav className='flex gap-1 sm:gap-4 items-center min-w-0'>
                            <a
                                href='/login'
                                className='text-muted-foreground hover:text-primary transition font-medium px-2 py-1.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 text-sm sm:text-base whitespace-nowrap'
                            >
                                Login
                            </a>
                            <a href='/register' className='ml-0 sm:ml-1'>
                                <Button size='sm' className='px-3 sm:px-5 font-semibold shadow-md text-sm sm:text-base'>
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
                    <h1 className='text-2xl font-bold mb-2 text-center bg-gradient-to-r from-zinc-200 to-zinc-400 bg-clip-text text-transparent'>Sign in to Sprintpilot</h1>
                    <p className='text-muted-foreground mb-6 text-center text-sm'>Welcome back! Please enter your details.</p>
                    <form className='w-full flex flex-col gap-4'>
                        <div className='flex flex-col gap-1'>
                            <Label htmlFor='email'>Email</Label>
                            <Input id='email' type='email' placeholder='you@email.com' autoComplete='email' required className='mt-1' />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <Label htmlFor='password'>Password</Label>
                            <Input id='password' type='password' placeholder='••••••••' autoComplete='current-password' required className='mt-1' />
                        </div>
                        <Button type='submit' size='lg' className='mt-2 w-full'>
                            Sign In
                        </Button>
                    </form>
                    <div className='mt-6 text-sm text-muted-foreground text-center'>
                        Don&apos;t have an account?{' '}
                        <a href='/register' className='text-primary underline hover:opacity-80 transition'>
                            Register
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
