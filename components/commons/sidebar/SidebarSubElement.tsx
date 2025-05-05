import Link from 'next/link';
import React from 'react';

import {Button} from '@/components/ui';
import {cn} from '@/lib/utils';

interface SidebarSubElementProps {
    label: string;
    href?: string;
    isSelected?: boolean;
    isExpanded: boolean;
    className?: string;
}

export const SidebarSubElement: React.FC<SidebarSubElementProps> = ({
    label,
    href = '',
    isSelected,
    isExpanded,
    className,
}) => {
    return (
        <div className={cn('sidebar-transition', isExpanded ? 'max-w-[250px]' : 'max-w-[90px]', className)}>
            <Link href={href}>
                <Button
                    variant='raw'
                    className={cn(
                        'w-full rounded-md p-2 text-left text-paragraph2 text-black hover:bg-slate-100',
                        isSelected && 'bg-slate-200'
                    )}
                >
                    <div>{label}</div>
                </Button>
            </Link>
        </div>
    );
};
