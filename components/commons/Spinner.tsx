import {cva, VariantProps} from 'class-variance-authority';
import {motion} from 'framer-motion';

import {cn} from '@/lib/utils';

const spinnerVariants = cva('rounded-full border-2', {
    variants: {
        variant: {
            default: 'border-white border-t-primary',
        },
    },
    defaultVariants: {
        variant: 'default',
    },
});

interface Props extends VariantProps<typeof spinnerVariants> {
    width?: number;
    height?: number;
    blur?: boolean;
    className?: string;
}

export const Spinner: React.FC<Props> = ({variant, width = 20, height = 20, blur = false, className}) => {
    return (
        <motion.div
            className={cn(spinnerVariants({variant, className}), blur && 'opacity-70')}
            animate={{rotate: 360}}
            transition={{repeat: Infinity, duration: 1, ease: 'linear'}}
            style={{width, height}}
        />
    );
};
