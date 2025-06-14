import { createFileRoute } from '@tanstack/react-router';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export const Route = createFileRoute('/login')({
    component: LoginPage,
});

function LoginPage() {
    return (
        <div className='via-background flex min-h-screen w-full flex-col overflow-hidden bg-gradient-to-br from-zinc-900 to-zinc-900/90'>
            {/* Header */}
            <header className='fixed left-0 top-0 z-30 flex w-full justify-center bg-transparent'>
                <div className='container mx-auto mt-4 px-2 sm:px-4'>
                    <div className='bg-card/80 border-border/40 flex min-h-[56px] items-center justify-between rounded-2xl border px-3 py-2 shadow-lg backdrop-blur-md sm:px-6 sm:py-3'>
                        <a href='/' className='group flex min-w-0 items-center gap-2'>
                            <img src='/logo.svg' alt='SprintPilot Logo' className='h-8 w-8 flex-shrink-0' />
                            <span className='truncate text-base font-bold tracking-tight text-zinc-200 transition-colors duration-200 group-hover:text-zinc-400 sm:text-lg'>Sprintpilot</span>
                        </a>
                        <nav className='flex min-w-0 items-center gap-1 sm:gap-4'>
                            <a
                                href='/login'
                                className='text-muted-foreground hover:text-primary focus-visible:ring-primary/60 whitespace-nowrap rounded-md px-2 py-1.5 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 sm:text-base'
                            >
                                Login
                            </a>
                            <a href='/register' className='ml-0 sm:ml-1'>
                                <Button size='sm' className='px-3 text-sm font-semibold shadow-md sm:px-5 sm:text-base'>
                                    Register
                                </Button>
                            </a>
                        </nav>
                    </div>
                </div>
            </header>
            <div className='flex flex-1 items-center justify-center pt-32'>
                <div className='absolute inset-0 -z-10 bg-gradient-to-br from-zinc-500/20 via-zinc-500/10 to-zinc-900/20 blur-3xl' />
                <div className='bg-card/80 border-border/40 relative z-10 mx-auto flex w-full max-w-md flex-col items-center rounded-2xl border p-8 shadow-xl'>
                    <img src='/logo.svg' alt='SprintPilot Logo' className='mb-6 h-16 w-16' />
                    <h1 className='mb-2 bg-gradient-to-r from-zinc-200 to-zinc-400 bg-clip-text text-center text-2xl font-bold text-transparent'>Sign in to Sprintpilot</h1>
                    <p className='text-muted-foreground mb-6 text-center text-sm'>Welcome back! Please enter your details.</p>
                    <form className='flex w-full flex-col gap-4'>
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
                    <div className='text-muted-foreground mt-6 text-center text-sm'>
                        Don&apos;t have an account?{' '}
                        <a href='/register' className='text-primary underline transition hover:opacity-80'>
                            Register
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
