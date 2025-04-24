import {Slot} from '@radix-ui/react-slot';
import {cva, type VariantProps} from 'class-variance-authority';
import * as React from 'react';

import {cn} from '@/lib/utils';

const buttonVariants = cva(
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-bold text-sm ring-offset-white focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 active:translate-y-0.5 hover:shadow-xs active:shadow-sm',
    // focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2
    // [&_svg]:fill-black [&_svg]:pointer-events-none [&_svg]:shrink-0 transition-colors
    // hover:translate-y-[-1px]
    {
        variants: {
            variant: {
                raw: '', // no default settings applied --> for old code only, SHOULD NOT BE USED
                none: '', // default settings are applied
                default: 'bg-primary text-slate-50 hover:bg-secondary',
                secondary: 'bg-white text-primary border-primary border-2 hover:bg-primary hover:text-white',
                outline: 'border border-black bg-white hover:bg-blue-300 active:bg-blue-300 text-black',
                cancel: 'border border-slate-300 text-slate-700 hover:bg-slate-100',
                ghost: 'hover:bg-slate-100 hover:text-slate-900',
                link: 'font-medium text-primary underline-offset-4 hover:underline hover:shadow-none active:shadow-none hover:translate-y-0 active:translate-y-0',
                icon: 'group hover:translate-y-0 hover:shadow-none active:shadow-none active:translate-y-0',
            },
            size: {
                raw: '',
                default: 'h-10 px-4 py-2',
                icon: 'h-fit w-fit',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({className, variant, size, asChild = false, type = 'button', ...props}, ref) => {
        const Comp = asChild ? Slot : 'button';
        return (
            <Comp
                className={variant === 'raw' ? className : cn(buttonVariants({variant, size, className}))}
                ref={ref}
                type={type}
                {...props}
            />
        );
    }
);
Button.displayName = 'Button';

export {Button, buttonVariants};
