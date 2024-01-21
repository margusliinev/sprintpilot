import { Link, Outlet } from '@remix-run/react';
import { X, Menu } from 'lucide-react';
import { useState } from 'react';

export default function Home() {
    const [isMobileMenuOpen, setisMobileMenuOpen] = useState(false);
    return (
        <main className='grid min-h-screen h-full w-full place-items-center'>
            <div className='fixed inset-0 transform-gpu overflow-hidden opacity-40 blur-3xl' aria-hidden='true'>
                <div className='w-full h-full bg-gradient-to-tr from-background to-foreground opacity-10'></div>
            </div>
            <nav className='fixed top-0 z-50 h-16 w-full grid place-items-center border-b-2 border-zinc-800 bg-fill shadow-sm'>
                <div className='flex w-screen-90 max-w-6xl items-center justify-between'>
                    <Link to={'/'} className='flex items-center gap-3' onClick={() => setisMobileMenuOpen(false)}>
                        <img src='logo.svg' alt='logo' width={20} height={20} />
                        <span className='text-2xl font-semibold sm:text-3xl'>SprintPilot</span>
                    </Link>
                    <ul className='hidden sm:flex items-center font-medium text-sm'>
                        <li>
                            <Link to={'/pricing'} className='hover:text-primary-hover transition-colors px-6 py-2'>
                                Pricing
                            </Link>
                        </li>
                        <li>
                            <Link to={'/login'} className='hover:text-primary-hover transition-colors pl-6 pr-10 py-2'>
                                Login
                            </Link>
                        </li>
                        <li className='font-semibold'>
                            <Link to='/register' className='flex items-center gap-1 rounded-full px-4 py-2.5 bg-primary text-primary-foreground transition-colors hover:bg-primary-hover'>
                                Register
                                <span aria-hidden='true'>&rarr;</span>
                            </Link>
                        </li>
                    </ul>
                    <button onClick={() => setisMobileMenuOpen(!isMobileMenuOpen)} className='block sm:hidden' aria-label='toggle menu'>
                        {isMobileMenuOpen ? <X /> : <Menu />}
                    </button>
                    <div className={isMobileMenuOpen ? 'fixed inset-0 z-50 mt-16 bg-fill p-8 sm:hidden' : 'hidden'}>
                        <ul className='font-medium text-md'>
                            <li>
                                <Link to='/register' className='flex items-center gap-2 hover:text-primary-hover py-6 border-b border-ring' onClick={() => setisMobileMenuOpen(!isMobileMenuOpen)}>
                                    Register
                                    <span aria-hidden='true' className='font-medium'>
                                        &rarr;
                                    </span>
                                </Link>
                            </li>
                            <li>
                                <Link to={'/login'} className='hover:text-primary-hover block py-6 border-b border-ring' onClick={() => setisMobileMenuOpen(!isMobileMenuOpen)}>
                                    login
                                </Link>
                            </li>
                            <li>
                                <Link to={'/pricing'} className='hover:text-primary-hover block py-6 border-b border-ring' onClick={() => setisMobileMenuOpen(!isMobileMenuOpen)}>
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
