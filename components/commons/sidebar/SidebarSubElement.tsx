import React from 'react';
import Link from 'next/link';
import {cn} from '@/lib/utils';

interface SidebarSubElementProps {
    name: string;
    href?: string;
    selected?: boolean;
    className?: string;
}

export const SidebarSubElement: React.FC<SidebarSubElementProps> = ({name, href = '', selected, className}) => {
    return (
        <div className={cn(className)}>
            <Link href={href}>
                <button
                    className={cn(
                        'w-full rounded-xs p-2 text-left text-[14px] hover:bg-gray-100',
                        selected && 'bg-gray-200'
                    )}
                >
                    {name}
                </button>
            </Link>
        </div>
    );
};
