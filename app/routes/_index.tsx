import type { MetaFunction } from '@remix-run/node';

export const meta: MetaFunction = () => {
    return [{ title: 'SprintPilot' }, { name: 'description', content: 'SprintPilot is a project management tool for software development teams.' }];
};

export default function Index() {
    return (
        <main className='h-screen w-screen grid place-items-center'>
            <h1 className='text-2xl font-medium'>Hello World</h1>
        </main>
    );
}
