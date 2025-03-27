import {Slot} from '@radix-ui/react-slot';
import {cva, type VariantProps} from 'class-variance-authority';
import * as React from 'react';

import {cn} from '@/lib/utils';

const buttonVariants = cva(
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-bold text-sm ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:fill-black [&_svg]:pointer-events-none [&_svg]:shrink-0 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 hover:translate-y-[-1px] active:translate-y-0.5 hover:shadow-md active:shadow-lg',
    {
        variants: {
            variant: {
                default: 'bg-blue-700 text-slate-50 hover:bg-slate-900/90',
                secondary:
                    'bg-white text-blue-700 border-blue-700 border-2 hover:bg-blue-700 hover:text-white [&_svg]:fill-blue-700 [&_svg]:hover:fill-white',
                outline: 'border border-black bg-white hover:bg-blue-300 active:bg-blue-300 text-black',
                shadow: 'bg-white text-slate-900 shadow-sm hover:shadow-md',
                destructive: 'bg-red-500 text-slate-50 hover:bg-red-500/90',
                ghost: 'hover:bg-slate-100 hover:text-slate-900',
                link: 'text-slate-900 underline-offset-4 hover:underline',
                iconDefault: 'flex-row bg-blue-700 text-slate-50 hover:bg-slate-900/90',
                iconSecondary:
                    'flex-row bg-white text-blue-700 border-blue-700 border-2 hover:bg-blue-700 hover:text-white [&_svg]:fill-blue-700 [&_svg]:hover:fill-white',
                iconOutline: 'flex-row border border-black bg-white hover:bg-blue-300 active:bg-blue-300 text-black',
                iconShadow: 'flex-row bg-white text-slate-900 shadow-md hover:shadow-lg',
            },
            size: {
                default: 'h-10 px-4 py-2',
                ssm: 'h-8 rounded-sm px-1',
                sm: 'h-9 rounded-md px-3',
                lg: 'h-11 rounded-md px-8',
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
    ({className, variant, size, asChild = false, ...props}, ref) => {
        const Comp = asChild ? Slot : 'button';
        return <Comp className={cn(buttonVariants({variant, size, className}))} ref={ref} {...props} />;
    }
);
Button.displayName = 'Button';

export {Button, buttonVariants};
