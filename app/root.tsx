import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';
import { LinksFunction, MetaFunction } from '@remix-run/node';
import './styles/fonts.css';
import './styles/index.css';

export const meta: MetaFunction = () => {
    return [
        { title: 'SprintPilot' },
        { charSet: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'SprintPilot is a project management tool for software development teams' },
        { name: 'keywords', content: 'sprintpilot, sprint, project management, software development, agile, scrum, kanban, sprint planning, sprint board' },
        { name: 'theme-color', content: '#18181b' },
    ];
};

export const links: LinksFunction = () => [
    { rel: 'preload', href: '/background.png', as: 'image' },
    { rel: 'preload', href: '/fonts/Inter-Light.woff2', as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' },
    { rel: 'preload', href: '/fonts/Inter-Regular.woff2', as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' },
    { rel: 'preload', href: '/fonts/Inter-Medium.woff2', as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' },
    { rel: 'preload', href: '/fonts/Inter-SemiBold.woff2', as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' },
    { rel: 'preload', href: '/fonts/Inter-Bold.woff2', as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' },
    { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
    { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
    { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
    { rel: 'manifest', href: '/site.webmanifest' },
];

export default function App() {
    return (
        <html lang='en'>
            <head>
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
