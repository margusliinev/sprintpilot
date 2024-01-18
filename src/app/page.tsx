import Image from 'next/image';

export default function HomePage() {
    return (
        <main className='flex min-h-screen flex-col items-center justify-center'>
            <div className='container flex flex-col items-center justify-center gap-12 px-4 py-16 '>
                <span className='flex items-center gap-4'>
                    <Image src='/logo-light.svg' width={50} height={50} alt='logo light' />
                    <h1 className='text-5xl font-extrabold sm:text-[5rem]'>SprintPilot</h1>
                </span>
                <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8'>
                    <div className='flex max-w-sm flex-col gap-4 rounded-xl font-semibold bg-zinc-300 text-zinc-900 p-12 text-2xl'>Project Management</div>
                    <div className='flex max-w-sm flex-col gap-4 rounded-xl font-semibold bg-zinc-300 text-zinc-900 p-12 text-2xl'>Real time collaboration</div>
                </div>
            </div>
        </main>
    );
}
