'use client';

import * as React from 'react';

import IconButton from '@/components/commons/IconButton';
import {Input, InputProps} from '@/components/ui/input';
import {cn} from '@/lib/utils';

const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(({className, ...props}, ref) => {
    const [shownPassword, setShownPassword] = React.useState(false);
    const icon = shownPassword ? 'EyeClose' : 'EyeOpen';

    return (
        <div className='relative w-full'>
            <Input
                type={shownPassword ? 'text' : 'password'}
                className={cn('select-none', className)}
                onCopy={(e) => e.preventDefault()}
                onPaste={(e) => e.preventDefault()}
                ref={ref}
                {...props}
            />
            <div className='pointer-events-none absolute right-0 top-0 flex h-full w-full items-center justify-end pr-4'>
                <IconButton
                    label='Show password'
                    type='button'
                    defaultName={icon}
                    hoverName={`${icon}_filled`}
                    width={16}
                    height={16}
                    onClick={() => {
                        setShownPassword((shownPassword) => !shownPassword);
                        console.log(shownPassword);
                    }}
                    className='pointer-events-auto'
                />
            </div>
        </div>
    );
});
PasswordInput.displayName = 'PasswordInput';

export {PasswordInput};
