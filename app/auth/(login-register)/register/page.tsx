'use client';

import Link from 'next/link';
import {useRouter} from 'next/navigation';
import {signIn} from 'next-auth/react';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {toast} from 'react-toastify';

import {Icon, PasswordInput} from '@/components/commons';
import {Button, Input, Separator} from '@/components/ui';
import {IRegisterRequest} from '@/modules/auth/auth.interface';
import {AuthService} from '@/modules/auth/auth.service';
import {registerResolver} from '@/modules/auth/auth.validate';
import {ROUTES} from '@/routes/routes.enum';

type FormValues = IRegisterRequest & {
    confirmPassword: string;
};

export default function RegisterPage() {
    const {
        control,
        handleSubmit,
        formState: {errors},
    } = useForm<FormValues>({
        resolver: registerResolver,
        defaultValues: {
            email: '',
            username: '',
            password: '',
            confirmPassword: '',
        },
    });

    const router = useRouter();

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        try {
            const payload: IRegisterRequest = {
                email: data.email,
                username: data.username,
                password: data.password,
            };
            await AuthService.register(payload);
            router.push(ROUTES.LOGIN);
            toast.success('Register successfully!');
        } catch (error) {
            toast.error('Register failed!');
        }
    };

    return (
        <div className='flex w-full flex-grow flex-col items-center justify-center'>
            <h4 className='mb-4 w-full font-bold md:text-heading5'>Nice to see you again</h4>
            <form onSubmit={handleSubmit(onSubmit)} className='w-full space-y-8'>
                <div className='space-y-4'>
                    <div className='space-y-2'>
                        <label htmlFor='email_phone' className='pl-3 text-paragraph1 text-gray-900 md:text-caption'>
                            Email or phone number
                        </label>
                        <Controller
                            control={control}
                            name='email'
                            render={() => (
                                <Input
                                    placeholder='Enter email or phone number'
                                    className='rounded-md text-paragraph1'
                                    variant='outline'
                                    errorMessage={errors.email?.message}
                                />
                            )}
                        />
                    </div>
                    <div className='space-y-2'>
                        <label htmlFor='password' className='pl-3 text-paragraph1 text-gray-900 md:text-caption'>
                            Password
                        </label>
                        <Controller
                            control={control}
                            name='password'
                            render={() => (
                                <PasswordInput
                                    placeholder='Enter password'
                                    className='rounded-md text-paragraph1'
                                    variant='outline'
                                    errorMessage={errors.password?.message}
                                />
                            )}
                        />
                    </div>
                    <div className='space-y-2'>
                        <label htmlFor='confirmPassword' className='pl-3 text-paragraph1 text-gray-900 md:text-caption'>
                            Confirm password
                        </label>
                        <Controller
                            control={control}
                            name='confirmPassword'
                            render={() => (
                                <PasswordInput
                                    placeholder='Enter password again'
                                    className='rounded-md text-paragraph1'
                                    variant='outline'
                                    errorMessage={errors.confirmPassword?.message}
                                />
                            )}
                        />
                    </div>
                </div>
                <div className='flex flex-col gap-8'>
                    <Button type='submit' className='rounded-sm bg-blue-700 text-caption font-bold text-white'>
                        Register
                    </Button>
                    <Separator className='bg-gray-200' />
                    <div className='flex flex-col gap-4'>
                        {/* <Button
                            type='button'
                            onClick={() => signIn('google')}
                            className='flex w-full gap-2 rounded-sm bg-gray-900 text-caption font-bold text-white'
                        >
                            <Icon name='google' />
                            Sign in with Google
                        </Button> */}
                        <div className='flex items-center justify-center gap-2'>
                            <p className='text-paragraph1 text-black md:text-caption'>Already had an account?</p>
                            <Link
                                href={ROUTES.LOGIN}
                                className='text-nowrap text-paragraph1 text-blue-500 hover:underline md:text-caption'
                            >
                                Sign in now
                            </Link>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
