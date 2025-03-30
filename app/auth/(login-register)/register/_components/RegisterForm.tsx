'use client';

import {yupResolver} from '@hookform/resolvers/yup';
import Link from 'next/link';
import React from 'react';
import {useForm} from 'react-hook-form';
import * as Yup from 'yup';

import {LogoName} from '@/components/commons';
import {Button, Separator} from '@/components/ui';
import {Input} from '@/components/ui/input';
import {PasswordInput} from '@/components/ui/input-password';
import {cn} from '@/lib/utils';

import GoogleSignInButton from '../../_components/GoogleSignInButton';

const registerSchema = Yup.object().shape({
    fullName: Yup.string().required('Please enter your full name'),
    email_phone: Yup.string().required('Please enter an email or phone number'),
    password: Yup.string().required('Please enter a password'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
        .required('Please re-enter the password'),
});

export const RegisterForm: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm({
        resolver: yupResolver(registerSchema),
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onSubmit = (data: any) => {
        console.log(data);
    };

    return (
        <div id='register-form' className='flex h-full w-full flex-col items-center justify-around gap-5 py-5'>
            <LogoName />
            <div className='w-full'>
                <h4 className='mb-4 font-bold md:text-heading5'>Nice to see you again</h4>
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
                    <div className='flex flex-col gap-0'>
                        <div>
                            <label htmlFor='fullName' className='pl-3 text-paragraph1 text-gray-900 md:text-caption'>
                                Full name
                            </label>
                            <Input
                                type='text'
                                placeholder='Enter full name'
                                fontSize='text-paragraph1'
                                variant='outline'
                                borderRadius='square'
                                {...register('fullName')}
                            />

                            <p
                                className={cn(
                                    'w-full pl-3 text-caption text-blue-500',
                                    errors.fullName ? 'visible' : 'invisible'
                                )}
                            >
                                {errors.fullName?.message}
                            </p>
                        </div>

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

                        <div>
                            <label
                                htmlFor='confirmPassword'
                                className='pl-3 text-paragraph1 text-gray-900 md:text-caption'
                            >
                                Retype password
                            </label>
                            <PasswordInput
                                placeholder='Enter password again'
                                fontSize='text-paragraph1'
                                variant='outline'
                                borderRadius='square'
                                {...register('confirmPassword')}
                            />

                            <p
                                className={cn(
                                    'w-full pl-3 text-caption text-blue-500',
                                    errors.confirmPassword ? 'visible' : 'invisible'
                                )}
                            >
                                {errors.confirmPassword?.message}
                            </p>
                        </div>
                    </div>

                    <div className='button-group flex flex-col gap-8'>
                        <Button type='submit' className='rounded-sm bg-blue-700 text-caption font-bold text-white'>
                            Register
                        </Button>
                        <Separator className='bg-gray-200' />
                        <div className='flex flex-col gap-4'>
                            <GoogleSignInButton text='Or Register with Google' />
                            <div className='flex items-center justify-center gap-2'>
                                <p className='text-paragraph1 text-black md:text-caption'>Already had an account?</p>
                                <Link
                                    href='/auth/register'
                                    className='text-nowrap text-paragraph1 text-blue-500 hover:underline md:text-caption'
                                >
                                    Sign in now
                                </Link>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};
