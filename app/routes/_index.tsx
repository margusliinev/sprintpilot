export default function Index() {
    const currentDate = new Date(Date.now()).toUTCString().split(' ').slice(1, 3).join(' ');

    return (
        <main className='grid h-screen w-screen place-items-center'>
            <header className='z-10 my-32 w-screen-90 max-w-4xl text-center'>
                <h3 className='mx-auto mb-6 w-fit rounded-full border border-white/60 px-7 py-2.5 text-sm font-medium'>{currentDate}: We are now in open beta!</h3>
                <h1 className=' grid text-3xl font-bold tracking-tight xxs:text-4xl xs:text-5xl sm:text-5xl md:text-6xl lg:text-7xl'>
                    <span className='mb-2 text-primary'>Build better software</span>
                    <span>with SprintPilot</span>
                </h1>
                <h2 className='text-md mx-auto mt-6 max-w-2xl text-white/80 md:text-lg'>
                    SprintPilot is a project management tool of choice for developers around the world to improve real-time collaboration. With its built-in sprint planner and progress tracker,
                    SprintPilot helps you ship better software, faster.
                </h2>
                <div className='mt-6 flex items-center justify-center gap-6 text-sm md:mt-12'>
                    <a href='/register' className='rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary-hover'>
                        Get Started
                    </a>
                    <a href='/login' className='group flex items-center gap-1 font-medium'>
                        Want to demo?
                        <span aria-hidden='true' className='font-light transition-colors group-hover:text-primary'>
                            &rarr;
                        </span>
                    </a>
                </div>
            </header>
        </main>
    );
}
