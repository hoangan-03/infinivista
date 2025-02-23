import React from 'react';
import {RegisterForm} from './_components/RegisterForm';

export default function Register() {
    return (
        <div id='register-page' className='h-full w-full min-w-[380px] px-12 flex-center'>
            <RegisterForm />
        </div>
    );
}
