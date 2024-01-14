import { Link, Outlet } from '@remix-run/react';
import { X, Menu } from 'lucide-react';
import { useState } from 'react';

export default function Home() {
    const [isMobileMenuOpen, setisMobileMenuOpen] = useState(false);
    return (
        <main className='grid h-full min-h-screen w-full place-items-center'>
            <nav className='fixed top-0 z-50 grid h-16 w-full place-items-center border-b border-border'>
                <div className='flex w-screen-90 max-w-6xl items-center justify-between'>
                    <Link to={'/'} className='flex items-center gap-2' onClick={() => setisMobileMenuOpen(false)}>
                        <div className='flex items-center gap-2'>
                            <img src={'logo.png'} alt='logo' className='w-6 h-9' />
                            <h1 className='text-2xl font-medium'>sprintpilot</h1>
                        </div>
                    </Link>
                    <ul className='hidden items-center sm:flex'>
                        <li>
                            <Link to={'/pricing'} className='px-6 py-2.5 text-sm font-medium'>
                                Pricing
                            </Link>
                        </li>
                        <li>
                            <Link to={'/sign-in'} className='py-2.5 pl-6 pr-10 text-sm font-medium'>
                                Sign In
                            </Link>
                        </li>
                        <li>
                            <Link
                                to='/sign-up'
                                className='flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover'
                            >
                                Get Started
                                <span aria-hidden='true' className='font-semibold'>
                                    &rarr;
                                </span>
                            </Link>
                        </li>
                    </ul>
                    <button onClick={() => setisMobileMenuOpen(!isMobileMenuOpen)} className='block sm:hidden'>
                        {isMobileMenuOpen ? <X /> : <Menu />}
                    </button>
                    <div className={isMobileMenuOpen ? 'fixed inset-0 z-50 mt-16 w-full bg-white p-8 transition-all sm:hidden' : 'hidden'}>
                        <ul className='grid gap-4'>
                            <li className='border-b border-gray-300'>
                                <Link to='/sign-up' className='text-md flex items-center gap-2 py-6 font-semibold text-primary' onClick={() => setisMobileMenuOpen(!isMobileMenuOpen)}>
                                    Get Started
                                    <span aria-hidden='true' className='text-xl'>
                                        &rarr;
                                    </span>
                                </Link>
                            </li>
                            <li className='border-b border-gray-300'>
                                <Link to={'/sign-in'} className='text-md block py-6 font-semibold' onClick={() => setisMobileMenuOpen(!isMobileMenuOpen)}>
                                    Sign In
                                </Link>
                            </li>
                            <li className='border-b border-gray-300'>
                                <Link to={'/pricing'} className='text-md block py-6 font-semibold' onClick={() => setisMobileMenuOpen(!isMobileMenuOpen)}>
                                    Pricing
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <Outlet />
        </main>
    );
}
