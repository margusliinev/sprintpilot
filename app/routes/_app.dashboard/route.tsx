import { LoaderFunctionArgs, json, redirect } from '@remix-run/node';
import { requireUserId } from '@/utils/auth.server';
import { useLoaderData } from '@remix-run/react';

export async function loader({ request }: LoaderFunctionArgs) {
    const userId = await requireUserId(request);
    if (!userId) throw redirect('/login');

    return json({ message: 'Authentication successful!' });
}

export default function Dashboard() {
    const loaderData = useLoaderData<typeof loader>();
    return (
        <main className='h-screen w-screen grid place-items-center'>
            <h1 className='text-7xl font-bold text-primary'>{loaderData.message}</h1>
        </main>
    );
}
