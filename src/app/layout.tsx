import '@/styles/globals.css';
import type { Viewport, Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-sans',
});

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: '#fafafa' },
        { media: '(prefers-color-scheme: dark)', color: '#18181b' },
    ],
};

export const metadata: Metadata = {
    title: 'Sprintpilot',
    description: 'Sprintpilot is a project management tool for software development teams.',
    keywords: ['sprintpilot', 'project management', 'software development', 'sprint planning', 'sprint board', 'agile', 'scrum', 'kanban'],
    icons: {
        icon: [{ url: '/favicon.ico' }, { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' }, { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' }],
        apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
    },
    robots: { index: true, follow: true, nosnippet: false, 'max-image-preview': 'large' },
    manifest: '/site.webmanifest',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='en'>
            <body className={inter.variable}>{children}</body>
        </html>
    );
}
