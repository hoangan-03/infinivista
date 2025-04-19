'use client';

import {forwardRef, useState} from 'react';

import {Input} from '@/components/ui';
import {InputProps} from '@/components/ui/input';

import {Icon} from '.';

const PasswordInput = forwardRef<HTMLInputElement, InputProps>(({className, ...props}, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const icon = showPassword ? 'eye' : 'eye-off';

    return (
        <Input
            type={showPassword ? 'text' : 'password'}
            className={className}
            ref={ref}
            suffixIcon={
                <>
                    <Icon name={icon} className='block group-hover:hidden' />
                    <Icon name={`${icon}-filled`} className='hidden group-hover:block' />
                </>
            }
            onChangePasswordVisibility={() => setShowPassword((showPassword) => !showPassword)}
            {...props}
        />
    );
});
PasswordInput.displayName = 'PasswordInput';

export {PasswordInput};
