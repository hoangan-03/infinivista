import {Slot} from '@radix-ui/react-slot';
import {cva, type VariantProps} from 'class-variance-authority';
import * as React from 'react';

import {cn} from '@/lib/utils';

const buttonVariants = cva(
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-bold text-sm ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:fill-black [&_svg]:pointer-events-none [&_svg]:shrink-0 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 hover:translate-y-[-1px] active:translate-y-0.5 hover:shadow-md active:shadow-lg',
    {
        variants: {
            variant: {
                raw: '',
                default: 'bg-primary text-slate-50 hover:bg-slate-900/90',
                secondary:
                    'bg-white text-primary border-primary border-2 hover:bg-primary hover:text-white hover:border-white active:border-white',
                outline: 'border border-black bg-white hover:bg-blue-300 active:bg-blue-300 text-black',
                shadow: 'bg-white text-slate-900 shadow-sm hover:shadow-md',
                destructive: 'bg-red-500 text-slate-50 hover:bg-red-500/90',
                ghost: 'hover:bg-slate-100 hover:text-slate-900',
                link: 'font-medium text-primary underline-offset-4 hover:underline hover:shadow-none active:shadow-none hover:translate-y-0 active:translate-y-0',
                iconOnly: 'text-white hover:translate-y-0 active:translate-y-0 hover:shadow-none active:shadow-none',
                iconDefault: 'flex-center bg-primary text-slate-50 hover:bg-slate-900/90',
                iconSecondary:
                    'flex-center bg-white text-primary border-primary border-2 hover:bg-primary hover:text-white hover:border-white active:border-white',
                iconOutline: 'flex-center border border-black bg-white hover:bg-blue-300 active:bg-blue-300 text-black',
                iconShadow: 'flex-center bg-white text-slate-900 shadow-md hover:shadow-lg',
            },
            size: {
                default: 'h-10 px-4 py-2',
                sm: 'h-9 rounded-md px-3',
                lg: 'h-11 rounded-md px-8',
                icon: 'h-fit w-fit',
                square: 'aspect-square rounded-lg p-1 h-8',
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
    ({className, variant, size, asChild = false, ...props}, ref) => {
        const Comp = asChild ? Slot : 'button';
        return (
            <Comp
                className={variant === 'raw' ? className : cn(buttonVariants({variant, size, className}))}
                ref={ref}
                {...props}
            />
        );
    }
);
Button.displayName = 'Button';

export {Button, buttonVariants};
