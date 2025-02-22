'use client';

import React from 'react';
import {useForm} from 'react-hook-form';
import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {LogoName} from '@/components/commons';
import {Input} from '@/components/ui/input';
import {PasswordInput} from '@/components/ui/input-password';
import Link from 'next/link';
import {Button} from '@/components/ui';
import {FcGoogle} from 'react-icons/fc';
import {cn} from '@/lib/utils';

const loginSchema = Yup.object().shape({
    email_phone: Yup.string().required(),
    password: Yup.string().required(),
});

export const LoginForm: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm({
        resolver: yupResolver(loginSchema),
    });

    const onSubmit = (data: any) => {
        console.log(data);
    };

    return (
        <div id='login-form' className='flex w-full flex-col items-center gap-14'>
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

                            <cap
                                className={cn(
                                    'w-full pl-3 text-blue-500',
                                    errors.email_phone ? 'visible' : 'invisible'
                                )}
                            >
                                Please enter an email or phone number
                            </cap>
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

                            <cap className={cn('w-full pl-3 text-blue-500', errors.password ? 'visible' : 'invisible')}>
                                Please enter a password
                            </cap>
                        </div>

                        <div className='mt-5 flex items-center justify-between'>
                            <div className='flex items-center focus:underline focus:outline-none'>
                                <input type='checkbox' id='remember-me' />
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

                    <div className='button-group flex flex-col gap-4'>
                        <Button type='submit' className='bg-blue-700 text-caption font-bold text-white'>
                            Sign in
                        </Button>
                        <Button type='button' className='flex w-full gap-2 text-caption font-bold text-white'>
                            <FcGoogle />
                            Or Sign in with Google
                        </Button>
                        <div className='flex items-center justify-center gap-2'>
                            <p className='text-paragraph1 text-black md:text-caption'>Don't have an account?</p>
                            <Link
                                href='/auth/register'
                                className='text-nowrap text-paragraph1 text-blue-500 hover:underline md:text-caption'
                            >
                                Sign up now
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};
