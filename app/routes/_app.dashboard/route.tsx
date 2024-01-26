import { LoaderFunctionArgs, json } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import { requireUserId } from '@/utils/auth.server';
import { Button } from '@/components/ui';

export async function loader({ request }: LoaderFunctionArgs) {
    await requireUserId(request);

    return json({ message: 'Authenticated' });
}

export default function Dashboard() {
    const loaderData = useLoaderData<typeof loader>();
    return (
        <main className='h-screen w-screen grid place-items-center'>
            <div className='text-center grid gap-4'>
                <h1 className='text-6xl font-bold text-primary'>{loaderData.message}</h1>
                <Form action='/logout' method='POST'>
                    <Button type='submit' size={'lg'} className='text-lg'>
                        Logout
                    </Button>
                </Form>
            </div>
        </main>
    );
}
