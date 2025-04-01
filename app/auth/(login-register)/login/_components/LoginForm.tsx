'use client';

import {yupResolver} from '@hookform/resolvers/yup';
import Link from 'next/link';
import React from 'react';
import {useForm} from 'react-hook-form';
import * as Yup from 'yup';

import {GoogleSignInButton, LogoName, PasswordInput} from '@/components/commons';
import {Button, Input, Separator, Switch} from '@/components/ui';
import {cn} from '@/lib/utils';

const loginSchema = Yup.object().shape({
    email_phone: Yup.string().required('Please enter an email or phone number'),
    password: Yup.string().required('Please enter the password'),
});

export const LoginForm: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm({
        resolver: yupResolver(loginSchema),
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onSubmit = (data: any) => {
        console.log(data);
    };

    const [rememberMe, setRememberMe] = React.useState(false);

    return (
        <div id='login-form' className='flex h-full w-full flex-col items-center justify-around'>
            <LogoName />
            <div className='w-full'>
                <h4 className='mb-4 font-bold md:text-heading5'>Nice to see you again</h4>
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-8'>
                    <div className='flex flex-col gap-0'>
                        <div>
                            <label htmlFor='email_phone' className='pl-3 text-paragraph1 text-gray-900 md:text-caption'>
                                Email or phone number
                            </label>
                            <Input
                                type='text'
                                placeholder='Enter email or phone number'
                                fontSize='text-paragraph1'
                                variant='outline'
                                borderRadius='square'
                                {...register('email_phone')}
                            />

                            <p
                                className={cn(
                                    'w-full pl-3 text-caption text-blue-500',
                                    errors.email_phone ? 'visible' : 'invisible'
                                )}
                            >
                                {errors.email_phone?.message}
                            </p>
                        </div>

                        <div>
                            <label htmlFor='password' className='pl-3 text-paragraph1 text-gray-900 md:text-caption'>
                                Password
                            </label>
                            <PasswordInput
                                placeholder='Enter password'
                                fontSize='text-paragraph1'
                                variant='outline'
                                borderRadius='square'
                                {...register('password')}
                            />

                            <p
                                className={cn(
                                    'w-full pl-3 text-caption text-blue-500',
                                    errors.password ? 'visible' : 'invisible'
                                )}
                            >
                                {errors.password?.message}
                            </p>
                        </div>

                        <div className='mt-1 flex items-center justify-between'>
                            <div className='flex items-center focus:underline focus:outline-none'>
                                <Switch
                                    checked={rememberMe}
                                    onClick={() => setRememberMe((rememberMe) => !rememberMe)}
                                />
                                <label
                                    htmlFor='remember-me'
                                    className='ml-2 text-paragraph1 text-black md:text-caption'
                                >
                                    Remember me
                                </label>
                            </div>
                            <Link
                                id='forgot-password-link'
                                href='/auth/login/forgot-password'
                                className='text-nowrap text-paragraph1 text-blue-500 hover:underline md:text-caption'
                            >
                                Forgot password?
                            </Link>
                        </div>
                    </div>

                    <div className='button-group flex flex-col gap-8'>
                        <Button type='submit' className='rounded-sm bg-blue-700 text-caption font-bold text-white'>
                            Sign in
                        </Button>
                        <Separator className='bg-gray-200' />
                        <div className='flex flex-col gap-4'>
                            <GoogleSignInButton text='Or Sign in with Google' />
                            <div className='flex items-center justify-center gap-2'>
                                <p className='text-paragraph1 text-black md:text-caption'>Don&#39;t have an account?</p>
                                <Link
                                    href='/auth/register'
                                    className='text-nowrap text-paragraph1 text-blue-500 hover:underline md:text-caption'
                                >
                                    Sign up now
                                </Link>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};
