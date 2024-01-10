import type { MetaFunction } from '@remix-run/node';

export const meta: MetaFunction = () => {
    return [{ title: 'SprintPilot' }, { name: 'description', content: 'SprintPilot is a project management tool for software development teams.' }];
};

export default function Index() {
    return (
        <main>
            <h1>Hello World</h1>
        </main>
    );
}
