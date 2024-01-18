'use client';

import { ThemeToggle } from '@/components/theme-toggle';
import { useTheme } from 'next-themes';
import Image from 'next/image';

export default function HomePage() {
    const { theme } = useTheme();
    return (
        <main className='h-screen w-screen grid place-items-center'>
            <span className='absolute top-8 right-8'>
                <ThemeToggle />
            </span>
            <span className='flex items-center gap-4'>
                {theme === 'dark' ? <Image src='/logo-light.svg' width={50} height={50} alt='logo light' /> : <Image src='/logo-dark.svg' width={50} height={50} alt='logo dark' />}
                <h1 className='text-5xl font-extrabold sm:text-[5rem]'>SprintPilot</h1>
            </span>
        </main>
    );
}
