import { createFileRoute } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';

export const Route = createFileRoute('/')({
    component: App,
});

const features = ['Real-time collaboration', 'Sprint planning', 'Task management', 'Team communication', 'Progress tracking', 'Agile workflows'];

function App() {
    return (
        <div className='min-h-screen w-full overflow-hidden bg-background'>
            {/* Gradient Background */}
            <div className='absolute inset-0 bg-gradient-to-br from-zinc-900 via-background to-zinc-900/90 -z-10' />

            {/* Hero Section */}
            <div className='container mx-auto px-4 py-24'>
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

                {/* Animated Background Accent */}
                <div className='relative flex justify-center'>
                    <div className='absolute left-1/2 -translate-x-1/2 -top-10 w-80 h-32 bg-gradient-to-r from-primary/10 via-zinc-700/10 to-primary/10 blur-2xl rounded-full opacity-70 pointer-events-none animate-pulse-slow' />
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
