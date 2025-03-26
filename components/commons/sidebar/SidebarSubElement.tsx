import React from 'react';
import Link from 'next/link';
import {cn} from '@/lib/utils';

interface SidebarSubElementProps {
    name: string;
    href?: string;
    selected?: boolean;
    sidebarExpanded: boolean;
    className?: string;
}

const SidebarSubElement: React.FC<SidebarSubElementProps> = ({
    name,
    href = '',
    selected,
    sidebarExpanded,
    className,
}) => {
    return (
        <div className={cn('sidebar-transition', sidebarExpanded ? 'max-w-[250px]' : 'max-w-[90px]', className)}>
            <Link href={href}>
                <button
                    className={cn(
                        'w-full rounded-xs p-2 text-left text-[14px] text-black hover:bg-gray-100',
                        selected && 'bg-gray-200'
                    )}
                >
                    <div>{name}</div>
                </button>
            </Link>
        </div>
    );
};

export default SidebarSubElement;
