import Link from 'next/link';
import React from 'react';

import {Button} from '@/components/ui';
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
                <Button
                    variant='raw'
                    className={cn(
                        'w-full rounded-xs p-2 text-left text-paragraph2 text-black hover:bg-gray-100',
                        selected && 'bg-gray-200'
                    )}
                >
                    <div>{name}</div>
                </Button>
            </Link>
        </div>
    );
};

export default SidebarSubElement;
