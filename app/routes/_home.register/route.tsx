import { Button, Input, Label } from '@/components/ui';
import { Github, Google, Spinner } from '@/components/icons';
import { Form, Link, useActionData, useNavigation } from '@remix-run/react';
import { ActionFunctionArgs, json } from '@remix-run/node';
import { validateAction } from '@/utils/validateAction';
import { registerSchema, actionData } from './schema';

export async function action({ request }: ActionFunctionArgs) {
    const { formData, errors } = await validateAction<actionData>({ request, schema: registerSchema });

    if (errors) {
        return json({ formData: null, errors }, { status: 400 });
    }

    return json({ formData, errors: null }, { status: 201 });
}

export default function Register() {
    const data = useActionData<typeof action>();
    const navigation = useNavigation();
    const submitting = navigation.formAction === '/register';

    return (
        <div className='w-screen-90 max-w-md rounded-lg border px-6 py-8 shadow-sm z-10 bg-card text-card-foreground my-20'>
            <div className='grid place-items-center text-center'>
                <img src='logo.svg' alt='logo' width={25} height={25} className='mb-2' />
                <h1 className='mb-1 text-2xl font-semibold'>Create an account</h1>
                <p className='mb-8 text-sm text-secondary-foreground'>And lets get you started with your free trial</p>
            </div>
            <Form className='grid gap-4' method='POST' action='/register' noValidate>
                <fieldset className='space-y-1'>
                    <Label htmlFor='username'>Username</Label>
                    <Input type='text' name='username' id='username' aria-invalid={data?.errors?.username ? true : undefined} />
                    {data?.errors?.username && <p className='text-sm text-destructive'>{data?.errors?.username}</p>}
                </fieldset>
                <fieldset className='space-y-1'>
                    <Label htmlFor='email'>Email</Label>
                    <Input type='email' name='email' id='email' aria-invalid={data?.errors?.email ? true : undefined} />
                    {data?.errors?.username && <p className='text-sm text-destructive'>{data?.errors?.email}</p>}
                </fieldset>
                <fieldset className='space-y-1'>
                    <Label htmlFor='password'>Password</Label>
                    <Input type='password' name='password' id='password' aria-invalid={data?.errors?.password ? true : undefined} />
                    {data?.errors?.username && <p className='text-sm text-destructive'>{data?.errors?.password}</p>}
                </fieldset>
                <Button type='submit' size={'sm'} className='mb-2 mt-2'>
                    {submitting ? <Spinner /> : 'Register'}
                </Button>
                <div className='flex items-center justify-between gap-4'>
                    <div className='border-t border-zinc-600 w-full'></div>
                    <div className='text-secondary-foreground uppercase text-xs whitespace-nowrap w-full text-center'>Or continue with</div>
                    <div className='border-t border-zinc-600 w-full'></div>
                </div>
                <div className='grid grid-cols-2 gap-6 mb-4'>
                    <Button variant='outline' size='sm'>
                        <Github /> Github
                    </Button>
                    <Button variant='outline' size='sm'>
                        <Google /> Google
                    </Button>
                </div>
            </Form>
            <div className='flex justify-center gap-2 text-sm mt-2'>
                <p>Already have an account?</p>
                <Link to='/login' className='font-medium text-primary hover:text-primary-hover transition-colors'>
                    Login
                </Link>
            </div>
        </div>
    );
}
