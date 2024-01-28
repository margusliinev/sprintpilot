import { Link, Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, isRouteErrorResponse, useRouteError } from '@remix-run/react';
import { LinksFunction, MetaFunction } from '@remix-run/node';
import './styles/fonts.css';
import './styles/index.css';

export const meta: MetaFunction = () => {
    return [
        { title: 'SprintPilot' },
        { name: 'description', content: 'SprintPilot is a project management tool for developers around the world for real-time collaboration around a shared, prioritized backlog.' },
        { name: 'keywords', content: 'SprintPilot, sprint, project management, software development, agile, scrum, kanban, sprint planning, sprint board' },
        { name: 'author', content: 'SprintPilot Team' },
        { name: 'theme-color', content: '#7dd3fc' },
        { name: 'twitter:title', content: 'SprintPilot' },
        { name: 'twitter:description', content: 'SprintPilot is a project management tool for developers around the world for real-time collaboration around a shared, prioritized backlog.' },
        { property: 'og:title', content: 'SprintPilot' },
        { property: 'og:description', content: 'SprintPilot is a project management tool for developers around the world for real-time collaboration around a shared, prioritized backlog.' }
    ];
};

export const links: LinksFunction = () => [
    { rel: 'apple-touch-icon', href: '/apple-touch-icon.png', sizes: '180x180' },
    { rel: 'icon', href: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    { rel: 'icon', href: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    { rel: 'icon', href: '/favicon.ico' },
    { rel: 'manifest', href: '/site.webmanifest' }
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
                <main className='grid h-full min-h-screen w-full place-items-center'>
                    <div className='w-screen-90 text-center'>
                        <p className='text-7xl font-bold text-primary'>{isRouteErrorResponse(error) ? `${error.status}` : '500'}</p>
                        <h1 className='mt-4 text-4xl font-semibold tracking-tight xxs:text-5xl'>
                            {isRouteErrorResponse(error) ? (error.status === 404 ? 'Page Not Found' : error.statusText) : 'Internal Server Error'}
                        </h1>
                        <p className='text-foreground/90 mt-6 text-lg'>
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
                        <div className='mt-8 flex items-center justify-center gap-6 text-sm font-semibold'>
                            <Link to={'/'} className='rounded-full bg-primary px-3.5 py-2.5 text-primary-foreground transition-colors hover:bg-primary-hover'>
                                Go Back Home
                            </Link>
                            <Link to='/login' className='group flex items-center gap-1'>
                                Login Page
                                <span aria-hidden='true' className='font-normal transition-colors group-hover:text-primary'>
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
