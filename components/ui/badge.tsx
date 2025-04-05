import {cva, type VariantProps} from 'class-variance-authority';
import * as React from 'react';

import {cn} from '@/lib/utils';

const badgeVariants = cva('inline-flex items-center rounded-sm transition-colors focus:outline-none', {
    variants: {
        variant: {
            default: 'bg-primary text-white hover:bg-primary/80',
        },
        size: {
            none: '',
            default: 'px-2.5 py-0.5 text-xs',
        },
    },
    defaultVariants: {
        variant: 'default',
        size: 'default',
    },
});

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({className, variant, ...props}: BadgeProps) {
    return <div className={cn(badgeVariants({variant}), className)} {...props} />;
}

export {Badge, badgeVariants};
