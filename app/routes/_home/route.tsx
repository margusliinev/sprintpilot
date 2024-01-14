import { Link, Outlet } from '@remix-run/react';
import { X, Menu } from 'lucide-react';
import { useState } from 'react';

export default function Home() {
    const [isMobileMenuOpen, setisMobileMenuOpen] = useState(false);
    return (
        <main className='h-screen w-screen min-h-screen grid place-items-center'>
            <nav className='fixed h-16 z-50 top-0 w-full grid place-items-center border-b shadow-md bg-background'>
                <div className='w-screen-90 max-w-6xl flex items-center justify-between'>
                    <Link to={'/'} className='flex items-center gap-2' onClick={() => setisMobileMenuOpen(false)}>
                        <img src={'logo.png'} alt='logo' className='w-6 h-8' />
                        <h1 className='text-2xl font-medium'>SprintPilot</h1>
                    </Link>
                    <ul className='hidden items-center sm:flex font-medium text-sm'>
                        <li>
                            <Link to={'/pricing'} className='px-6 py-2.5 transition-colors hover:text-primary-hover'>
                                Pricing
                            </Link>
                        </li>
                        <li>
                            <Link to={'/login'} className='py-2.5 pl-6 pr-10 transition-colors hover:text-primary-hover'>
                                Login
                            </Link>
                        </li>
                        <li>
                            <Link to='/register' className='flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-primary-foreground transition-colors hover:bg-primary-hover'>
                                Register
                                <span aria-hidden='true' className='font-semibold'>
                                    &rarr;
                                </span>
                            </Link>
                        </li>
                    </ul>
                    <button onClick={() => setisMobileMenuOpen(!isMobileMenuOpen)} className='block sm:hidden'>
                        {isMobileMenuOpen ? <X /> : <Menu />}
                    </button>
                    <div className={isMobileMenuOpen ? 'fixed inset-0 z-50 mt-16 w-full p-8 transition-all sm:hidden bg-background' : 'hidden'}>
                        <ul className='grid gap-4 font-medium'>
                            <li className='border-b border-border'>
                                <Link to='/register' className='text-md flex items-center gap-2 py-6 text-primary-hover' onClick={() => setisMobileMenuOpen(!isMobileMenuOpen)}>
                                    Register
                                    <span aria-hidden='true'>&rarr;</span>
                                </Link>
                            </li>
                            <li className='border-b border-border'>
                                <Link to={'/login'} className='text-md block py-6' onClick={() => setisMobileMenuOpen(!isMobileMenuOpen)}>
                                    Login
                                </Link>
                            </li>
                            <li className='border-b border-border'>
                                <Link to={'/pricing'} className='text-md block py-6' onClick={() => setisMobileMenuOpen(!isMobileMenuOpen)}>
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
