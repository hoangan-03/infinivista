import React from 'react';
import {signIn} from 'next-auth/react';
import {Button} from '@/components/ui';
import {FcGoogle} from 'react-icons/fc';

const GoogleSignInButton = () => {
    return (
        <Button
            type='button'
            onClick={() => signIn('google')}
            className='flex w-full gap-2 text-caption font-bold text-white'
        >
            <FcGoogle />
            Or Sign in with Google
        </Button>
    );
};

export default GoogleSignInButton;
