'use client';

import {yupResolver} from '@hookform/resolvers/yup';
import Link from 'next/link';
import {signIn} from 'next-auth/react';
import React from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import * as Yup from 'yup';

import {Icon, LogoName, PasswordInput} from '@/components/commons';
import {Button, Input, Separator, Switch} from '@/components/ui';
import {ROUTES} from '@/routes/routes.enum';

const loginSchema = Yup.object().shape({
    emailPhone: Yup.string().required('Please enter an email or phone number'),
    password: Yup.string().required('Please enter the password'),
});

type FormValues = {
    emailPhone: string;
    password: string;
};

export default function LoginPage() {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<FormValues>({
        resolver: yupResolver(loginSchema),
        defaultValues: {
            emailPhone: '',
            password: '',
        },
    });

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        console.log(data);
    };

    const [rememberMe, setRememberMe] = React.useState(false);

    return (
        <div className='h-full w-full px-12 flex-center'>
            <div className='flex h-full w-full flex-col items-center justify-around'>
                <LogoName />
                <div className='w-full'>
                    <h4 className='mb-4 font-bold md:text-heading5'>Nice to see you again</h4>
                    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-8'>
                        <div className='flex flex-col gap-0'>
                            <div>
                                <label
                                    htmlFor='email_phone'
                                    className='pl-3 text-paragraph1 text-gray-900 md:text-caption'
                                >
                                    Email or phone number
                                </label>
                                <Input
                                    type='text'
                                    placeholder='Enter email or phone number'
                                    variant='outline'
                                    className='rounded-md text-paragraph1'
                                    errorMessage={errors.emailPhone?.message}
                                    {...register('emailPhone')}
                                />
                                {/* <p
                                    className={cn(
                                        'w-full pl-3 text-caption text-blue-500',
                                        errors.emailPhone ? 'visible' : 'invisible'
                                    )}
                                >
                                    {errors.emailPhone?.message}
                                </p> */}
                            </div>
                            <div>
                                <label
                                    htmlFor='password'
                                    className='pl-3 text-paragraph1 text-gray-900 md:text-caption'
                                >
                                    Password
                                </label>
                                <PasswordInput
                                    placeholder='Enter password'
                                    variant='outline'
                                    className='rounded-md text-paragraph1'
                                    errorMessage={errors.password?.message}
                                    {...register('password')}
                                />
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
                                    href={ROUTES.FORGOT_PASSWORD}
                                    className='text-nowrap text-paragraph1 text-blue-500 hover:underline md:text-caption'
                                >
                                    Forgot password?
                                </Link>
                            </div>
                        </div>
                        <div className='flex flex-col gap-8'>
                            <Button type='submit' className='rounded-sm bg-blue-700 text-caption font-bold text-white'>
                                Sign in
                            </Button>
                            <Separator className='bg-gray-200' />
                            <div className='flex flex-col gap-4'>
                                <Button
                                    type='button'
                                    onClick={() => signIn('google')}
                                    className='flex w-full gap-2 rounded-sm bg-gray-900 text-caption font-bold text-white'
                                >
                                    <Icon name='google' />
                                    Sign in with Google
                                </Button>
                                <div className='flex items-center justify-center gap-2'>
                                    <p className='text-paragraph1 text-black md:text-caption'>
                                        Don&#39;t have an account?
                                    </p>
                                    <Link
                                        href={ROUTES.REGISTER}
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
        </div>
    );
}
