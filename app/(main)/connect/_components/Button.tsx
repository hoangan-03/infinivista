import React from 'react';

import {cn} from '@/lib/utils';

interface ButtonProps {
    children: React.ReactNode;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({children, className}) => {
    return (
        <button
            className={cn(
                'box-border min-w-28 text-nowrap rounded-full border border-blue-700 bg-blue-700 px-2 font-bold text-white transition-colors hover:bg-transparent hover:text-blue-700 active:bg-blue-700/30 active:text-blue-700',
                className
            )}
        >
            {children}
        </button>
    );
};

export default Button;
