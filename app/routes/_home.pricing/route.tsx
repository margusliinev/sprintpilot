import { Link } from '@remix-run/react';
import { Check } from 'lucide-react';

export default function Pricing() {
    return (
        <section className='my-16 z-10'>
            <div className='py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6'>
                <div className='mx-auto max-w-screen-md text-center mb-8 lg:mb-12'>
                    <h1 className='mb-4 text-5xl tracking-tight font-bold'>Pricing</h1>
                    <h2 className='mb-4 text-3xl tracking-tight font-semibold'>Designed for business teams like yours</h2>
                    <p className='mb-5 font-light sm:text-xl '>
                        We have you covered, no matter the size of your team. Unsure which plan is right for you? Start with the plan that suits your needs today, and upgrade later.
                    </p>
                </div>
                <div className='space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0'>
                    <div className='flex flex-col p-6 mx-auto max-w-lg text-center rounded-lg border border-border xl:p-8 bg-card text-card-foreground shadow-lg'>
                        <h3 className='mb-4 text-2xl font-semibold'>Starter</h3>
                        <p className='font-light sm:text-lg '>Best option for personal use & for your next project.</p>
                        <div className='flex justify-center items-baseline my-8'>
                            <span className='mr-2 text-5xl font-semibold'>$29</span>
                            <span>/month</span>
                        </div>
                        <ul className='mb-8 space-y-4 text-left'>
                            <li className='flex items-center space-x-3'>
                                <Check className='text-success' />
                                <span>Individual configuration</span>
                            </li>
                            <li className='flex items-center space-x-3'>
                                <Check className='text-success' />
                                <span>No setup, or hidden fees</span>
                            </li>
                            <li className='flex items-center space-x-3'>
                                <Check className='text-success' />
                                <span>
                                    Team size: <span className='font-semibold'>1 developer</span>
                                </span>
                            </li>
                            <li className='flex items-center space-x-3'>
                                <Check className='text-success' />
                                <span>
                                    Premium support: <span className='font-semibold'>6 months</span>
                                </span>
                            </li>
                            <li className='flex items-center space-x-3'>
                                <Check className='text-success' />
                                <span>
                                    Free updates: <span className='font-semibold'>6 months</span>
                                </span>
                            </li>
                        </ul>
                        <Link
                            to='/register'
                            className='bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center focus:ring-primary-900'
                        >
                            Get started
                        </Link>
                    </div>
                    <div className='flex flex-col p-6 mx-auto max-w-lg text-center rounded-lg border border-border xl:p-8 bg-card text-card-foreground shadow-lg'>
                        <h3 className='mb-4 text-2xl font-semibold'>Company</h3>
                        <p className='font-light sm:text-lg '>Relevant for multiple users, extended & premium support.</p>
                        <div className='flex justify-center items-baseline my-8'>
                            <span className='mr-2 text-5xl font-semibold'>$99</span>
                            <span>/month</span>
                        </div>
                        <ul className='mb-8 space-y-4 text-left'>
                            <li className='flex items-center space-x-3'>
                                <Check className='text-success' />
                                <span>Individual configuration</span>
                            </li>
                            <li className='flex items-center space-x-3'>
                                <Check className='text-success' />
                                <span>No setup, or hidden fees</span>
                            </li>
                            <li className='flex items-center space-x-3'>
                                <Check className='text-success' />
                                <span>
                                    Team size: <span className='font-semibold'>10 developers</span>
                                </span>
                            </li>
                            <li className='flex items-center space-x-3'>
                                <Check className='text-success' />
                                <span>
                                    Premium support: <span className='font-semibold'>24 months</span>
                                </span>
                            </li>
                            <li className='flex items-center space-x-3'>
                                <Check className='text-success' />
                                <span>
                                    Free updates: <span className='font-semibold'>24 months</span>
                                </span>
                            </li>
                        </ul>
                        <Link
                            to='/register'
                            className='bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center focus:ring-primary-900'
                        >
                            Get started
                        </Link>
                    </div>
                    <div className='flex flex-col p-6 mx-auto max-w-lg text-center rounded-lg border border-border xl:p-8 bg-card text-card-foreground shadow-lg'>
                        <h3 className='mb-4 text-2xl font-semibold'>Enterprise</h3>
                        <p className='font-light sm:text-lg '>Best for large scale uses and extended redistribution rights.</p>
                        <div className='flex justify-center items-baseline my-8'>
                            <span className='mr-2 text-5xl font-semibold'>$499</span>
                            <span>/month</span>
                        </div>
                        <ul className='mb-8 space-y-4 text-left'>
                            <li className='flex items-center space-x-3'>
                                <Check className='text-success' />
                                <span>Individual configuration</span>
                            </li>
                            <li className='flex items-center space-x-3'>
                                <Check className='text-success' />
                                <span>No setup, or hidden fees</span>
                            </li>
                            <li className='flex items-center space-x-3'>
                                <Check className='text-success' />
                                <span>
                                    Team size: <span className='font-semibold'>100+ developers</span>
                                </span>
                            </li>
                            <li className='flex items-center space-x-3'>
                                <Check className='text-success' />
                                <span>
                                    Premium support: <span className='font-semibold'>36 months</span>
                                </span>
                            </li>
                            <li className='flex items-center space-x-3'>
                                <Check className='text-success' />
                                <span>
                                    Free updates: <span className='font-semibold'>36 months</span>
                                </span>
                            </li>
                        </ul>
                        <Link
                            to='/register'
                            className='bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center focus:ring-primary-900'
                        >
                            Get started
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
