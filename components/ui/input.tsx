import {cva, type VariantProps} from 'class-variance-authority';
import * as React from 'react';

import {cn} from '@/lib/utils';

const inputVariants = cva(
    'flex h-auto w-full border px-3 py-3 text-paragraph2 ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:file:text-slate-50 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300',
    {
        variants: {
            variant: {
                default: 'bg-gray-100 border-gray-100 placeholder:text-black',
                outline: 'bg-none border-gray-200 placeholder:text-gray-400',
            },
            borderRadius: {
                default: 'rounded',
                square: 'rounded-sm',
            },
        },
        defaultVariants: {
            variant: 'default',
            borderRadius: 'default',
        },
    }
);

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof inputVariants> {
    fontSize: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({className, type, variant, borderRadius, fontSize, ...props}, ref) => {
        return (
            <div className='relative w-full'>
                <input
                    type={type}
                    className={cn(inputVariants({variant, borderRadius, className}), fontSize)}
                    ref={ref}
                    {...props}
                />
            </div>
        );
    }
);
Input.displayName = 'Input';

export {Input};
