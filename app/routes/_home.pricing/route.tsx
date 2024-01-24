import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui';
import { Link } from '@remix-run/react';
import { Check } from 'lucide-react';

export default function Pricing() {
    return (
        <>
            <section className='my-16 z-10'>
                <div className='py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6'>
                    <div className='mx-auto max-w-screen-md text-center mb-8 lg:mb-12'>
                        <h1 className='mb-4 text-5xl tracking-tight font-bold'>Pricing</h1>
                        <h2 className='mb-4 text-3xl tracking-tight font-semibold'>Designed for business teams like yours</h2>
                        <p className='mb-5 font-light sm:text-xl text-secondary-foreground'>
                            We have you covered, no matter the size of your team. Unsure which plan is right for you? Start with the plan that suits your needs today, and upgrade later.
                        </p>
                    </div>
                    <div className='space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0'>
                        <div className='flex flex-col p-6 mx-auto max-w-lg text-center rounded-lg border border-border xl:p-8 bg-card text-card-foreground shadow-lg'>
                            <h3 className='mb-4 text-2xl font-semibold'>Hobby</h3>
                            <p className='font-light sm:text-lg text-secondary-foreground'>Best option for personal use & for your next project.</p>
                            <div className='flex justify-center items-baseline my-8'>
                                <span className='mr-2 text-5xl font-semibold'>$0</span>
                                <span>/month</span>
                            </div>
                            <ul className='mb-8 space-y-4 text-left'>
                                <li className='flex items-center space-x-3'>
                                    <Check className='text-success' />
                                    <span>Community support</span>
                                </li>
                                <li className='flex items-center space-x-3'>
                                    <Check className='text-success' />
                                    <span>Up to 10 project boards</span>
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
                            <Link to='/register' className='bg-zinc-200 text-primary-foreground hover:bg-zinc-100 transition-colors font-semibold rounded-full text-sm px-5 py-2.5 text-center'>
                                Sign up for free
                            </Link>
                        </div>
                        <div className='flex flex-col p-6 mx-auto max-w-lg text-center rounded-lg border border-border xl:p-8 bg-card text-card-foreground shadow-lg'>
                            <h3 className='mb-4 text-2xl font-semibold'>Startup</h3>
                            <p className='font-light sm:text-lg text-secondary-foreground'>Relevant for small agile teams with extended support</p>
                            <div className='flex justify-center items-baseline my-8'>
                                <span className='mr-2 text-5xl font-semibold'>$99</span>
                                <span>/month</span>
                            </div>
                            <ul className='mb-8 space-y-4 text-left'>
                                <li className='flex items-center space-x-3'>
                                    <Check className='text-success' />
                                    <span>Business hour support</span>
                                </li>
                                <li className='flex items-center space-x-3'>
                                    <Check className='text-success' />
                                    <span>Unlimited project boards</span>
                                </li>
                                <li className='flex items-center space-x-3'>
                                    <Check className='text-success' />
                                    <span>
                                        Team size: <span className='font-semibold'>12 developers</span>
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
                            <Link to='/register' className='bg-primary text-primary-foreground hover:bg-primary-hover transition-colors font-semibold rounded-full text-sm px-5 py-2.5 text-center'>
                                Get started
                            </Link>
                        </div>
                        <div className='flex flex-col p-6 mx-auto max-w-lg text-center rounded-lg border border-border xl:p-8 bg-card text-card-foreground shadow-lg'>
                            <h3 className='mb-4 text-2xl font-semibold'>Enterprise</h3>
                            <p className='font-light sm:text-lg text-secondary-foreground'>Best for large teams with high usage and need for premium support.</p>
                            <div className='flex justify-center items-baseline my-8'>
                                <span className='mr-2 text-5xl font-semibold'>$799</span>
                                <span>/month</span>
                            </div>
                            <ul className='mb-8 space-y-4 text-left'>
                                <li className='flex items-center space-x-3'>
                                    <Check className='text-success' />
                                    <span>24/7 Priority support</span>
                                </li>
                                <li className='flex items-center space-x-3'>
                                    <Check className='text-success' />
                                    <span>Unlimited project boards</span>
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
                            <Link to='/register' className='bg-yellow-200 text-primary-foreground hover:bg-yellow-100 transition-colors font-semibold rounded-full text-sm px-5 py-2.5 text-center'>
                                Available soon
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
            <section className='z-10 mx-auto w-screen-90 max-w-screen-xl px-2.5 py-12 md:px-20'>
                <div className='px-6sm:rounded-3xl relative isolate overflow-hidden rounded-2xl border border-border shadow-sm sm:px-10 xl:px-24 bg-card'>
                    <div className='mx-auto max-w-7xl px-6 py-24 sm:py-20 lg:px-8 lg:py-24'>
                        <div className='mx-auto max-w-4xl divide-y divide-ring'>
                            <h2 className='mb-16 text-4xl font-semibold lg:text-5xl'>Frequently asked questions</h2>
                            <Accordion type='single' collapsible>
                                <AccordionItem value='item-1' className='py-2'>
                                    <AccordionTrigger className='text-lg'>Can I use SprintPilot for free?</AccordionTrigger>
                                    <AccordionContent className='text-base text-card-foreground'>
                                        Yes, SprintPilot is free for personal usage. If you have a bigger team or need extra features, you can upgrade to a paid plan.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value='item-2' className='py-2'>
                                    <AccordionTrigger className='text-lg'>What if I need help?</AccordionTrigger>
                                    <AccordionContent className='text-base text-card-foreground'>
                                        If you&apos;re stuck with anything, don&apos;t hesitate to get in touch with us. You can always reach us at support@sprintpilot.com, we&apos;ll glady help you
                                        out!
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value='item-3' className='py-2'>
                                    <AccordionTrigger className='text-lg'>How do you handle payments?</AccordionTrigger>
                                    <AccordionContent className='text-base text-card-foreground'>
                                        We use Stripe to handle our payments, which means you can use any credit or debit card to pay for your subscription.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value='item-4' className='py-2'>
                                    <AccordionTrigger className='text-lg'>Can I cancel my subscription at any time?</AccordionTrigger>
                                    <AccordionContent className='text-base text-card-foreground'>
                                        Yes, you can cancel your subscription at any time. If you cancel your subscription, you will still be able to use SprintPilot pro features until the end of your
                                        billing period.
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}