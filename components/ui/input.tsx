import {cva, type VariantProps} from 'class-variance-authority';
import * as React from 'react';

import {cn} from '@/lib/utils';

import {Button} from '.';

const inputVariants = cva(
    'flex h-auto w-full border px-3 py-3 text-paragraph2 disabled:cursor-not-allowed disabled:opacity-50',
    // dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:file:text-slate-50 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300
    // file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-slate-950
    // ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 focus-visible:ring-offset-1
    // md:text-sm
    {
        variants: {
            variant: {
                default: 'bg-gray-100 border-gray-100 placeholder:text-black',
                outline: 'bg-none border-gray-200 placeholder:text-gray-400',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    }
);

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof inputVariants> {
    prefixIcon?: React.ReactNode;
    suffixIcon?: React.ReactNode;
    errorMessage?: string;
    errorClassName?: string;
    wrapperClassName?: string;
    onClickSuffixIcon?: () => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    (
        {
            className,
            wrapperClassName,
            type = 'text',
            variant,
            prefixIcon,
            suffixIcon,
            errorMessage,
            errorClassName,
            onClickSuffixIcon,
            ...props
        },
        ref
    ) => {
        return (
            <div className={cn('relative w-full', wrapperClassName)}>
                {prefixIcon && <span className='absolute left-3 top-1/2 -translate-y-1/2 transform'>{prefixIcon}</span>}
                <input
                    type={type}
                    className={cn(
                        'rounded',
                        inputVariants({variant, className}),
                        prefixIcon && 'pl-10',
                        errorMessage && 'focus-visible:ring-error'
                    )}
                    ref={ref}
                    {...props}
                />
                {suffixIcon &&
                    (onClickSuffixIcon ? (
                        <Button
                            size='icon'
                            variant='icon'
                            className='absolute right-3 top-1/2 -translate-y-1/2 transform hover:-translate-y-1/2 active:-translate-y-1/2'
                            onClick={onClickSuffixIcon}
                        >
                            {suffixIcon}
                        </Button>
                    ) : (
                        <span className='absolute right-3 top-1/2 -translate-y-1/2 transform'>{suffixIcon}</span>
                    ))}
                {errorMessage && (
                    <p className={cn('mt-2 text-caption text-blue-500', errorClassName)}>{errorMessage}</p>
                )}
            </div>
        );
    }
);
Input.displayName = 'Input';

export {Input, inputVariants};
