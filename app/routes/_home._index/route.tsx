import { Link } from '@remix-run/react';

export default function Index() {
    const currentDate = new Date(Date.now()).toUTCString().split(' ').slice(1, 3).join(' ');

    return (
        <header className='z-10 w-screen-90 max-w-4xl text-center my-32'>
            <div className='mb-6 flex justify-center'>
                <div className='text-sm font-semibold rounded-full px-6 py-2.5 ring-1 ring-ring/70'>{currentDate}: We are now in open beta!</div>
            </div>
            <h1 className='grid font-bold tracking-tight text-3xl xxxs:text-4xl xs:text-5xl md:text-6xl lg:text-7xl'>
                <span className='mb-2'>Build better software</span>
                <span>with SprintPilot</span>
            </h1>
            <p className='mx-auto mt-6 max-w-2xl text-foreground/90 text-md md:text-lg'>
                SprintPilot is a project management tool of choice for developers around the world to improve real-time collaboration. With its built-in sprint planner and progress tracker,
                SprintPilot helps you ship better software, faster.
            </p>
            <div className='flex items-center justify-center gap-6 text-sm mt-6 md:mt-12'>
                <Link to='/register' className='rounded-full px-6 py-3 bg-primary font-semibold text-primary-foreground transition-colors hover:bg-primary/80'>
                    Get Started
                </Link>
                <Link to='/login' className='group flex items-center gap-1 font-medium'>
                    Want to demo?
                    <span aria-hidden='true' className='font-normal transition-colors group-hover:text-foreground/60'>
                        &rarr;
                    </span>
                </Link>
            </div>
        </header>
    );
}
