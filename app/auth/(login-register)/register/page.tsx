'use client';

import {yupResolver} from '@hookform/resolvers/yup';
import Link from 'next/link';
import {signIn} from 'next-auth/react';
import {SubmitHandler, useForm} from 'react-hook-form';
import * as Yup from 'yup';

import {Icon, LogoName, PasswordInput} from '@/components/commons';
import {Button, Input, Separator} from '@/components/ui';
import {cn} from '@/lib/utils';
import {ROUTES} from '@/routes/routes.enum';

const registerSchema = Yup.object().shape({
    name: Yup.string().required('Please enter your full name'),
    emailPhone: Yup.string().required('Please enter an email or phone number'),
    password: Yup.string().required('Please enter a password'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
        .required('Please re-enter the password'),
});

type FormValues = {
    name: string;
    emailPhone: string;
    password: string;
    confirmPassword: string;
};

export default function RegisterPage() {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<FormValues>({
        resolver: yupResolver(registerSchema),
        defaultValues: {
            name: '',
            emailPhone: '',
            password: '',
            confirmPassword: '',
        },
    });

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        console.log(data);
    };

    return (
        <div id='register-page' className='h-fit w-full px-12 flex-center'>
            <div id='register-form' className='flex h-full w-full flex-col items-center justify-around gap-5 py-5'>
                <LogoName />
                <div className='w-full'>
                    <h4 className='mb-4 font-bold md:text-heading5'>Nice to see you again</h4>
                    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
                        <div className='flex flex-col gap-0'>
                            <div>
                                <label htmlFor='name' className='pl-3 text-paragraph1 text-gray-900 md:text-caption'>
                                    Full name
                                </label>
                                <Input
                                    type='text'
                                    placeholder='Enter full name'
                                    fontSize='text-paragraph1'
                                    variant='outline'
                                    borderRadius='square'
                                    {...register('name')}
                                />

                                <p
                                    className={cn(
                                        'w-full pl-3 text-caption text-blue-500',
                                        errors.name ? 'visible' : 'invisible'
                                    )}
                                >
                                    {errors.name?.message}
                                </p>
                            </div>

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
                                    fontSize='text-paragraph1'
                                    variant='outline'
                                    borderRadius='square'
                                    {...register('emailPhone')}
                                />

                                <p
                                    className={cn(
                                        'w-full pl-3 text-caption text-blue-500',
                                        errors.emailPhone ? 'visible' : 'invisible'
                                    )}
                                >
                                    {errors.emailPhone?.message}
                                </p>
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
                                        Already had an account?
                                    </p>
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
            </div>
        </div>
    );
}
