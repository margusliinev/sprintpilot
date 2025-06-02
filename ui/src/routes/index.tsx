import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

export const Route = createFileRoute('/')({
    component: App,
});

function App() {
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState<boolean | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    useEffect(() => {
        const fetchMessage = async () => {
            try {
                setLoading(true);
                const response = await fetch('/api/health/ok');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = (await response.json()) as { success: boolean; message: string };
                setMessage(data.message);
                setSuccess(data.success);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching message:', error);
            }
        };
        fetchMessage();
    }, []);

    if (loading) {
        return (
            <div className='App'>
                <h1>Loading...</h1>
            </div>
        );
    }

    if (success === false) {
        return (
            <div className='App'>
                <h1>Error: {message}</h1>
            </div>
        );
    }

    return (
        <div className='App'>
            <div>
                <img src='/logo.svg' alt='Logo' />
                <h1>{message}</h1>
            </div>
        </div>
    );
}
