import React from 'react';
import {LoginForm} from './_components/LoginForm';

export default function Login() {
    return (
        <div id='login-page' className='h-full w-full min-w-[380px] px-12 flex-center'>
            <LoginForm />
        </div>
    );
}
