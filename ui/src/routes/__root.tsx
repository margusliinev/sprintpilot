import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { Outlet, createRootRoute } from '@tanstack/react-router';

export const Route = createRootRoute({
    component: () => (
        <>
            <Outlet />
            <TanStackRouterDevtools position='bottom-right' />
        </>
    ),
});
