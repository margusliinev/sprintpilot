export default function HomePage() {
    return (
        <main className='flex min-h-screen flex-col items-center justify-center bg-zinc-900 text-white'>
            <div className='container flex flex-col items-center justify-center gap-12 px-4 py-16 '>
                <h1 className='text-5xl font-extrabold text-white sm:text-[5rem]'>SprintPilot</h1>
                <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8'>
                    <div className='flex max-w-sm flex-col gap-4 rounded-xl bg-white/10 p-12 text-white hover:bg-white/20 text-2xl'>Project Management</div>
                    <div className='flex max-w-sm flex-col gap-4 rounded-xl bg-white/10 p-12 text-white hover:bg-white/20 text-2xl'>Real time collaboration</div>
                </div>
            </div>
        </main>
    );
}
