import '@/styles/globals.css';

import { Inter } from 'next/font/google';

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-sans',
});

export const metadata = {
    title: 'Sprintpilot',
    description: 'Sprintpilot is a project management tool for software development teams.',
    icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='en'>
            <body className={`font-sans ${inter.variable}`}>{children}</body>
        </html>
    );
}
