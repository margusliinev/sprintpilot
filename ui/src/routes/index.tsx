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
        <div className='min-h-screen w-full overflow-hidden bg-background'>
            {/* Header */}
            <header className='w-full flex justify-center fixed top-0 left-0 z-30 bg-transparent transition-opacity duration-300' style={{ opacity: headerOpacity }}>
                <div className='container mx-auto mt-4 px-2 sm:px-4'>
                    <div className='flex items-center justify-between px-3 py-2 sm:px-6 sm:py-3 min-h-[56px] shadow-none relative overflow-visible'>
                        {/* Soft gradient background, blurred, with no border or hard edge */}
                        <div
                            className='absolute inset-0 rounded-full pointer-events-none'
                            style={{
                                background: 'rgba(24,24,27,0.15)',
                                boxShadow: '0 0 2px rgba(24,24,27,0.1)',
                                filter: 'blur(20px)',
                                zIndex: 0,
                            }}
                        />
                        <div
                            className='absolute inset-0 pointer-events-none'
                            style={{
                                background: 'transparent',
                                zIndex: 0,
                            }}
                        />
                        {/* Edge fade effect */}
                        <div className='absolute inset-0 pointer-events-none flex justify-between items-stretch z-10'>
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
                        <a href='/' className='flex items-center gap-2 group min-w-0 relative z-10'>
                            <img src='/logo.svg' alt='SprintPilot Logo' className='w-8 h-8 flex-shrink-0' />
                            <span className='font-bold text-base sm:text-lg tracking-tight text-zinc-200 transition-colors duration-200 group-hover:text-zinc-400 truncate'>Sprintpilot</span>
                        </a>
                        <nav className='flex gap-1 sm:gap-4 items-center min-w-0 relative z-10'>
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

            <div className='container mx-auto px-4 py-24 pt-32'>
                <div className='flex flex-col items-center text-center space-y-8'>
                    <div className='relative'>
                        <div className='absolute inset-0 blur-3xl bg-gradient-to-br from-zinc-500/20 via-zinc-500/10 to-zinc-900/20 -z-10' />
                        <img src='/logo.svg' alt='SprintPilot Logo' className='w-24 h-24 mb-6' />
                    </div>

                    <h1 className='text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-br pb-1 from-white to-zinc-400 bg-clip-text text-transparent'>Sprint Planning for Small Teams</h1>

                    <p className='text-lg md:text-xl text-muted-foreground max-w-2xl'>
                        Sprintpilot is the project management tool designed for small, nimble teams. Enjoy real-time collaboration and simple workflows—without the enterprise bloat.
                    </p>

                    <div className='flex gap-4 mt-8'>
                        <Button size='lg' className='gap-2'>
                            Get Started <ArrowRight className='w-4 h-4' />
                        </Button>
                        <Button size='lg' variant='secondary'>
                            Learn More
                        </Button>
                    </div>
                </div>

                {/* Features Grid */}
                <div className='mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto'>
                    {features.map((feature) => (
                        <div key={feature} className='flex items-center gap-2 p-4 rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm'>
                            <Check className='w-5 h-5 text-primary' />
                            <span className='text-foreground/90'>{feature}</span>
                        </div>
                    ))}
                </div>

                {/* Visual Connector */}
                <div className='flex flex-col items-center my-6'>
                    <span className='animate-bounce text-zinc-500'>
                        <svg width='32' height='32' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' className='mx-auto'>
                            <path d='M16 4v24M8 20l8 8 8-8' />
                        </svg>
                    </span>
                </div>

                {/* Get Started Card Section */}
                <section className='flex justify-center mt-8'>
                    <div className='w-full max-w-xl'>
                        <div className='bg-card/80 rounded-2xl shadow-xl p-8 flex flex-col items-center border border-border/40'>
                            <h2 className='text-2xl font-bold mb-2 text-center bg-gradient-to-r from-zinc-200 to-zinc-400 bg-clip-text text-transparent'>Start your first sprint in seconds</h2>
                            <p className='text-muted-foreground mb-6 text-center'>Sign up with your email and see how Sprintpilot can help your small team move faster and stay in sync.</p>
                            <form className='flex flex-col md:flex-row w-full gap-2'>
                                <input
                                    type='email'
                                    placeholder='Your email'
                                    className='flex-1 px-4 py-2 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition w-full md:w-auto'
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
            <section className='max-w-5xl mx-auto mt-8'>
                <h2 className='text-3xl font-semibold text-center mb-10 bg-gradient-to-r from-zinc-200 to-zinc-400 bg-clip-text text-transparent'>Why small teams love Sprintpilot</h2>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                    <div className='flex flex-col items-center text-center bg-card/70 rounded-xl p-6 border border-border/30'>
                        <span className='mb-2'>
                            <Badge variant='secondary'>Lightning Fast</Badge>
                        </span>
                        <h3 className='font-semibold text-lg mb-2'>Instant Updates</h3>
                        <p className='text-muted-foreground'>See changes in real time. No more refreshes, no more waiting. Perfect for small, agile teams.</p>
                    </div>
                    <div className='flex flex-col items-center text-center bg-card/70 rounded-xl p-6 border border-border/30'>
                        <span className='mb-2'>
                            <Badge variant='secondary'>No Bloat</Badge>
                        </span>
                        <h3 className='font-semibold text-lg mb-2'>Simple & Focused</h3>
                        <p className='text-muted-foreground'>All the essentials for sprint planning and collaboration—nothing you don't need.</p>
                    </div>
                    <div className='flex flex-col items-center text-center bg-card/70 rounded-xl p-6 border border-border/30'>
                        <span className='mb-2'>
                            <Badge variant='secondary'>Affordable</Badge>
                        </span>
                        <h3 className='font-semibold text-lg mb-2'>Made for Small Teams</h3>
                        <p className='text-muted-foreground'>Sprintpilot is priced and designed for startups, indie teams, and small businesses—not enterprise.</p>
                    </div>
                </div>
            </section>

            {/* Team Avatars Section */}
            <section className='max-w-4xl mx-auto mt-32 flex flex-col items-center'>
                <h2 className='text-2xl font-semibold mb-6 bg-gradient-to-r from-zinc-200 to-zinc-400 bg-clip-text text-transparent'>Built for small teams of all sizes</h2>
                <div className='flex -space-x-4 mb-4'>
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
                <p className='text-muted-foreground text-center max-w-lg'>From indie projects to growing startups, Sprintpilot helps small teams stay in sync and deliver results together.</p>
            </section>

            {/* Final Call to Action */}
            <section className='max-w-2xl mx-auto mt-32 mb-24 text-center'>
                <Separator className='mb-10' />
                <h2 className='text-3xl font-semibold mb-4 bg-gradient-to-r from-zinc-200 to-zinc-400 bg-clip-text text-transparent'>Ready to experience Sprintpilot?</h2>
                <Button size='lg' className='gap-2 text-lg px-8 py-6 mt-4'>
                    Try for Free <ArrowRight className='w-5 h-5' />
                </Button>
            </section>
        </div>
    );
}
