'use client';

import * as React from 'react';

import {Icon} from '@/components/commons';
import {cn} from '@/lib/utils';

import {Input} from './input';

// const passwordInputVariants = cva(
//     'flex h-auto w-full border px-3 py-3 text-paragraph2 ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-slate-950 placeholder:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:file:text-slate-50 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300',
//     {
//         variants: {
//             variant: {
//                 default: 'bg-gray-100 border-gray-100',
//                 outline: 'bg-none border-gray-200',
//             },
//             borderRadius: {
//                 default: 'rounded',
//                 square: 'rounded-sm',
//             },
//         },
//         defaultVariants: {
//             variant: 'default',
//             borderRadius: 'default',
//         },
//     }
// );

export interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    fontSize: string;
    variant?: 'default' | 'outline';
    borderRadius?: 'default' | 'square';
}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
    ({className, variant = 'default', borderRadius = 'default', fontSize, ...props}, ref) => {
        const [shownPassword, setShownPassword] = React.useState(false);
        const icon = shownPassword ? 'EyeClose' : 'EyeOpen';

        return (
            <div className='relative w-full'>
                <Input
                    type={shownPassword ? 'text' : 'password'}
                    className={cn('select-none', className)}
                    variant={variant}
                    borderRadius={borderRadius}
                    fontSize={fontSize}
                    ref={ref}
                    onCopy={(e) => e.preventDefault()}
                    onPaste={(e) => e.preventDefault()}
                    {...props}
                />
                <div className='pointer-events-none absolute right-0 top-0 flex h-full w-full items-center justify-end pr-4'>
                    <button
                        type='button'
                        onClick={() => {
                            setShownPassword((shownPassword) => !shownPassword);
                            console.log(shownPassword);
                        }}
                        className='pointer-events-auto'
                    >
                        {<Icon name={icon} width={16} height={16} />}
                    </button>
                </div>
            </div>
        );
    }
);
PasswordInput.displayName = 'PasswordInput';

export {PasswordInput};
