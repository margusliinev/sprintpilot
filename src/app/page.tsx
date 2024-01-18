import Image from 'next/image';

export default function HomePage() {
    return (
        <main className='flex min-h-screen flex-col items-center justify-center'>
            <div className='container flex flex-col items-center justify-center gap-12 px-4 py-16 '>
                <span className='flex items-center gap-4'>
                    <Image src='/logo-dark.svg' width={50} height={50} alt='logo dark' />
                    <h1 className='text-5xl font-extrabold sm:text-[5rem]'>SprintPilot</h1>
                </span>
            </div>
        </main>
    );
}
