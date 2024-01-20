import { Link, Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, isRouteErrorResponse, useRouteError } from '@remix-run/react';
import { LinksFunction, MetaFunction } from '@remix-run/node';
import './styles/fonts.css';
import './styles/index.css';

export const meta: MetaFunction = () => {
    return [
        { title: 'SprintPilot' },
        { name: 'description', content: 'SprintPilot is a project management tool for developers around the world for real-time collaboration around a shared, prioritized backlog.' },
        { name: 'keywords', content: 'sprintpilot, sprint, project management, software development, agile, scrum, kanban, sprint planning, sprint board' },
    ];
};

export const links: LinksFunction = () => [
    { rel: 'preconnect', href: '/fonts/Inter-Light.woff2', as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' },
    { rel: 'preconnect', href: '/fonts/Inter-Regular.woff2', as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' },
    { rel: 'preconnect', href: '/fonts/Inter-Medium.woff2', as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' },
    { rel: 'preconnect', href: '/fonts/Inter-SemiBold.woff2', as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' },
    { rel: 'preconnect', href: '/fonts/Inter-Bold.woff2', as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' },
    { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
    { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
    { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
    { rel: 'manifest', href: '/site.webmanifest' },
];

export default function App() {
    return (
        <html lang='en'>
            <head>
                <meta charSet='utf-8' />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
                <Meta />
                <Links />
            </head>
            <body>
                <Outlet />
                <ScrollRestoration />
                <Scripts />
                <LiveReload />
            </body>
        </html>
    );
}

export function ErrorBoundary() {
    const error = useRouteError();
    return (
        <html lang='en'>
            <head>
                <meta charSet='utf-8' />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
                <Meta />
                <Links />
            </head>
            <body>
                <main className='grid place-items-center h-full w-full min-h-screen'>
                    <div className='absolute inset-0 transform-gpu overflow-hidden opacity-40 blur-3xl' aria-hidden='true'>
                        <div className='w-full h-full bg-gradient-to-tr from-background to-foreground opacity-10 '></div>
                    </div>
                    <div className='z-10 w-screen-90 text-center'>
                        <p className='text-5xl font-bold text-primary'>{isRouteErrorResponse(error) ? `${error.status}` : '500'}</p>
                        <h1 className='mt-4 text-4xl font-bold tracking-tight xxs:text-5xl'>
                            {isRouteErrorResponse(error) ? (error.status === 404 ? 'Page Not Found' : error.statusText) : 'Internal Server Error'}
                        </h1>
                        <p className='mt-6 text-lg text-foreground/90'>
                            {isRouteErrorResponse(error)
                                ? `${
                                      error.status === 404
                                          ? ' Sorry, the page you are looking for could not be found.'
                                          : error instanceof Error
                                            ? error.message
                                            : 'We encountered an error and cannot fulfill the request.'
                                  }`
                                : `We encountered an error and cannot fulfill the request.`}
                        </p>
                        <div className='flex items-center justify-center text-sm font-semibold gap-6 mt-8'>
                            <Link to={'/'} className='rounded-full bg-primary text-primary-foreground px-3.5 py-2.5 transition-colors hover:bg-primary/80'>
                                Go Back Home
                            </Link>
                            <Link to='/login' className='group flex items-center gap-1'>
                                Login Page
                                <span aria-hidden='true' className='font-normal transition-colors group-hover:text-foreground/60'>
                                    &rarr;
                                </span>
                            </Link>
                        </div>
                    </div>
                </main>
                <Scripts />
            </body>
        </html>
    );
}
