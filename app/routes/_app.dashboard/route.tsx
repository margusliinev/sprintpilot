import { LoaderFunctionArgs, json } from '@remix-run/node';
import { requireUserId } from '@/utils/auth.server';
import { useLoaderData } from '@remix-run/react';

export async function loader({ request }: LoaderFunctionArgs) {
    await requireUserId(request);

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
