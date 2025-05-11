'use client';

import Link from 'next/link';
import {signIn} from 'next-auth/react';
import {useState} from 'react';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';

import {Icon, PasswordInput} from '@/components/commons';
import {Button, Input, Separator, Switch} from '@/components/ui';
import {useAuthContext} from '@/context';
import {ILoginRequest} from '@/modules/auth/auth.interface';
import {loginResolver} from '@/modules/auth/auth.validate';
import {ROUTES} from '@/routes/routes.enum';

type FormValues = ILoginRequest;

export default function LoginPage() {
    const {onLogin} = useAuthContext();

    const {
        control,
        handleSubmit,
        formState: {errors, isDirty, isSubmitting},
    } = useForm<FormValues>({
        resolver: loginResolver,
        defaultValues: {
            identifier: '',
            password: '',
        },
    });

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        onLogin(data);
    };

    const [rememberMe, setRememberMe] = useState(false);

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
                            name='identifier'
                            render={({field}) => (
                                <Input
                                    type='text'
                                    placeholder='Enter email or phone number'
                                    autoComplete='email'
                                    variant='outline'
                                    className='rounded-md text-paragraph1'
                                    errorMessage={errors.identifier?.message}
                                    {...field}
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
                            render={({field}) => (
                                <PasswordInput
                                    placeholder='Enter password'
                                    variant='outline'
                                    autoComplete='current-password'
                                    className='rounded-md text-paragraph1'
                                    errorMessage={errors.password?.message}
                                    {...field}
                                />
                            )}
                        />
                    </div>
                    <div className='flex items-center focus:underline focus:outline-none'>
                        <Switch checked={rememberMe} onClick={() => setRememberMe((rememberMe) => !rememberMe)} />
                        <label htmlFor='remember-me' className='ml-2 text-paragraph1 text-black md:text-caption'>
                            Remember me
                        </label>
                    </div>
                </div>
                <div className='flex flex-col gap-8'>
                    <Button
                        type='submit'
                        className='rounded-sm bg-blue-700 text-caption font-bold text-white disabled:cursor-not-allowed'
                        disabled={!isDirty || isSubmitting}
                    >
                        Sign in
                    </Button>
                    <Separator className='bg-gray-200' />
                    <div className='flex flex-col gap-4'>
                        {/* <Button
                            type='button'
                            onClick={() => signIn('google')}
                            className='flex w-full gap-2 rounded-sm bg-gray-900 text-caption font-bold text-white hover:bg-gray-900'
                        >
                            <Icon name='google' />
                            Sign in with Google
                        </Button> */}
                        <div className='flex items-center justify-center gap-2'>
                            <p className='text-paragraph1 text-black md:text-caption'>Don&#39;t have an account?</p>
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
    );
}
