import { ActionFunctionArgs, redirect } from '@remix-run/node';
import { authSessionStorage } from '@/utils/auth.server';

export async function action({ request }: ActionFunctionArgs) {
    const cookie = request.headers.get('cookie');
    const session = await authSessionStorage.getSession(cookie);

    return redirect('/login', { headers: { 'set-cookie': await authSessionStorage.destroySession(session) } });
}
