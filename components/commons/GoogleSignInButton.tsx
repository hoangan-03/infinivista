import {signIn} from 'next-auth/react';
import React from 'react';
import {FcGoogle} from 'react-icons/fc';

import {Button} from '@/components/ui';

export const GoogleSignInButton: React.FC<{text: string}> = ({text}) => {
    return (
        <Button
            type='button'
            onClick={() => signIn('google')}
            className='flex w-full gap-2 rounded-sm bg-gray-900 text-caption font-bold text-white'
        >
            <FcGoogle />
            {text}
        </Button>
    );
};
