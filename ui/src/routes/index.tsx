import { createFileRoute } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { useEffect, useRef, useState } from 'react';

export const Route = createFileRoute('/')({
    component: HomePage,
});

const features = ['Real-time collaboration', 'Sprint planning', 'Task management', 'Team communication', 'Progress tracking', 'Agile workflows'];

function HomePage() {
    // Header fade state
    const [headerOpacity, setHeaderOpacity] = useState(1);
    const ticking = useRef(false);

    useEffect(() => {
        function onScroll() {
            if (!ticking.current) {
                window.requestAnimationFrame(() => {
                    const y = window.scrollY;
                    // Start fading after 16px, fully faded at 120px
                    let opacity = 1;
                    if (y > 16) {
                        opacity = Math.max(0, 1 - (y - 16) / 104);
                    }
                    setHeaderOpacity(opacity < 0.04 ? 0 : opacity);
                    ticking.current = false;
                });
                ticking.current = true;
            }
        }
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <div className='bg-background min-h-screen w-full overflow-hidden'>
            {/* Header */}
            <header className='fixed left-0 top-0 z-30 flex w-full justify-center bg-transparent transition-opacity duration-300' style={{ opacity: headerOpacity }}>
                <div className='container mx-auto mt-4 px-2 sm:px-4'>
                    <div className='relative flex min-h-[56px] items-center justify-between overflow-visible px-3 py-2 shadow-none sm:px-6 sm:py-3'>
                        {/* Soft gradient background, blurred, with no border or hard edge */}
                        <div
                            className='pointer-events-none absolute inset-0 rounded-full'
                            style={{
                                background: 'rgba(24,24,27,0.15)',
                                boxShadow: '0 0 2px rgba(24,24,27,0.1)',
                                filter: 'blur(20px)',
                                zIndex: 0,
                            }}
                        />
                        <div
                            className='pointer-events-none absolute inset-0'
                            style={{
                                background: 'transparent',
                                zIndex: 0,
                            }}
                        />
                        {/* Edge fade effect */}
                        <div className='pointer-events-none absolute inset-0 z-10 flex items-stretch justify-between'>
                            <div
                                style={{
                                    width: '64px',
                                    background: 'linear-gradient(90deg, rgba(24,24,27,0.18) 0%, rgba(24,24,27,0.01) 100%)',
                                    filter: 'blur(6px)',
                                }}
                            />
                            <div
                                style={{
                                    width: '64px',
                                    background: 'linear-gradient(270deg, rgba(24,24,27,0.18) 0%, rgba(24,24,27,0.01) 100%)',
                                    filter: 'blur(6px)',
                                }}
                            />
                        </div>
                        <a href='/' className='group relative z-10 flex min-w-0 items-center gap-2'>
                            <img src='/logo.svg' alt='SprintPilot Logo' className='h-8 w-8 flex-shrink-0' />
                            <span className='truncate text-base font-bold tracking-tight text-zinc-200 transition-colors duration-200 group-hover:text-zinc-400 sm:text-lg'>Sprintpilot</span>
                        </a>
                        <nav className='relative z-10 flex min-w-0 items-center gap-1 sm:gap-4'>
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

            <div className='container mx-auto px-4 py-24 pt-32'>
                <div className='flex flex-col items-center space-y-8 text-center'>
                    <div className='relative'>
                        <div className='absolute inset-0 -z-10 bg-gradient-to-br from-zinc-500/20 via-zinc-500/10 to-zinc-900/20 blur-3xl' />
                        <img src='/logo.svg' alt='SprintPilot Logo' className='mb-6 h-24 w-24' />
                    </div>

                    <h1 className='bg-gradient-to-br from-white to-zinc-400 bg-clip-text pb-1 text-4xl font-bold tracking-tight text-transparent md:text-6xl'>Sprint Planning for Small Teams</h1>

                    <p className='text-muted-foreground max-w-2xl text-lg md:text-xl'>
                        Sprintpilot is a project management tool of choice for developers around the world to improve real-time collaboration. Enjoy simple workflows without the enterprise bloat.
                    </p>

                    <div className='mt-8 flex gap-4'>
                        <Button size='lg' className='gap-2'>
                            Get Started <ArrowRight className='h-4 w-4' />
                        </Button>
                        <Button size='lg' variant='secondary'>
                            Learn More
                        </Button>
                    </div>
                </div>

                {/* Features Grid */}
                <div className='mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
                    {features.map((feature) => (
                        <div key={feature} className='border-border/50 bg-card/50 flex items-center gap-2 rounded-lg border p-4 backdrop-blur-sm'>
                            <Check className='text-primary h-5 w-5' />
                            <span className='text-foreground/90'>{feature}</span>
                        </div>
                    ))}
                </div>

                {/* Visual Connector */}
                <div className='my-6 flex flex-col items-center'>
                    <span className='animate-bounce text-zinc-500'>
                        <svg width='32' height='32' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' className='mx-auto'>
                            <path d='M16 4v24M8 20l8 8 8-8' />
                        </svg>
                    </span>
                </div>

                {/* Get Started Card Section */}
                <section className='mt-8 flex justify-center'>
                    <div className='w-full max-w-xl'>
                        <div className='bg-card/80 border-border/40 flex flex-col items-center rounded-2xl border p-8 shadow-xl'>
                            <h2 className='mb-2 bg-gradient-to-r from-zinc-200 to-zinc-400 bg-clip-text text-center text-2xl font-bold text-transparent'>Start your first sprint in seconds</h2>
                            <p className='text-muted-foreground mb-6 text-center'>Sign up with your email and see how Sprintpilot can help your small team move faster and stay in sync.</p>
                            <form className='flex w-full flex-col gap-2 md:flex-row'>
                                <input
                                    type='email'
                                    placeholder='Your email'
                                    className='border-border bg-background text-foreground focus:ring-primary/40 w-full flex-1 rounded-md border px-4 py-2 transition focus:outline-none focus:ring-2 md:w-auto'
                                />
                                <Button type='submit' size='lg' className='w-full md:w-auto'>
                                    Get Invite
                                </Button>
                            </form>
                        </div>
                    </div>
                </section>
            </div>

            {/* Benefits Section */}
            <section className='mx-auto mt-8 max-w-5xl'>
                <h2 className='mb-10 bg-gradient-to-r from-zinc-200 to-zinc-400 bg-clip-text text-center text-3xl font-semibold text-transparent'>Why small teams love Sprintpilot</h2>
                <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
                    <div className='bg-card/70 border-border/30 flex flex-col items-center rounded-xl border p-6 text-center'>
                        <span className='mb-2'>
                            <Badge variant='secondary'>Lightning Fast</Badge>
                        </span>
                        <h3 className='mb-2 text-lg font-semibold'>Instant Updates</h3>
                        <p className='text-muted-foreground'>See changes in real time. No more refreshes, no more waiting. Perfect for small, agile teams.</p>
                    </div>
                    <div className='bg-card/70 border-border/30 flex flex-col items-center rounded-xl border p-6 text-center'>
                        <span className='mb-2'>
                            <Badge variant='secondary'>No Bloat</Badge>
                        </span>
                        <h3 className='mb-2 text-lg font-semibold'>Simple & Focused</h3>
                        <p className='text-muted-foreground'>All the essentials for sprint planning and collaboration—nothing you don't need.</p>
                    </div>
                    <div className='bg-card/70 border-border/30 flex flex-col items-center rounded-xl border p-6 text-center'>
                        <span className='mb-2'>
                            <Badge variant='secondary'>Affordable</Badge>
                        </span>
                        <h3 className='mb-2 text-lg font-semibold'>Made for Small Teams</h3>
                        <p className='text-muted-foreground'>Sprintpilot is priced and designed for startups, indie teams, and small businesses—not enterprise.</p>
                    </div>
                </div>
            </section>

            {/* Team Avatars Section */}
            <section className='mx-auto mt-32 flex max-w-4xl flex-col items-center'>
                <h2 className='mb-6 bg-gradient-to-r from-zinc-200 to-zinc-400 bg-clip-text text-2xl font-semibold text-transparent'>Built for small teams of all sizes</h2>
                <div className='mb-4 flex -space-x-4'>
                    <Avatar>
                        <img src='https://randomuser.me/api/portraits/men/32.jpg' alt='User' />
                    </Avatar>
                    <Avatar>
                        <img src='https://randomuser.me/api/portraits/women/44.jpg' alt='User' />
                    </Avatar>
                    <Avatar>
                        <img src='https://randomuser.me/api/portraits/men/65.jpg' alt='User' />
                    </Avatar>
                    <Avatar>
                        <img src='https://randomuser.me/api/portraits/women/68.jpg' alt='User' />
                    </Avatar>
                    <Avatar>
                        <img src='https://randomuser.me/api/portraits/men/77.jpg' alt='User' />
                    </Avatar>
                </div>
                <p className='text-muted-foreground max-w-lg text-center'>From indie projects to growing startups, Sprintpilot helps small teams stay in sync and deliver results together.</p>
            </section>

            {/* Final Call to Action */}
            <section className='mx-auto mb-24 mt-32 max-w-2xl text-center'>
                <Separator className='mb-10' />
                <h2 className='mb-4 bg-gradient-to-r from-zinc-200 to-zinc-400 bg-clip-text text-3xl font-semibold text-transparent'>Ready to experience Sprintpilot?</h2>
                <Button size='lg' className='mt-4 gap-2 px-8 py-6 text-lg'>
                    Try for Free <ArrowRight className='h-5 w-5' />
                </Button>
            </section>
        </div>
    );
}
