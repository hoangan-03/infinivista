import Link from 'next/link';
import React, {useCallback, useState} from 'react';

import {Icon} from '@/components/commons';
import {Button, Separator} from '@/components/ui';
import {cn} from '@/lib/utils';

interface SidebarElementProps {
    label: string;
    href?: string;
    iconName: string;
    isSelected?: boolean;
    isExpanded: boolean;
    children?: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

export const SidebarElement: React.FC<SidebarElementProps> = ({
    label,
    iconName,
    isSelected,
    isExpanded,
    onClick,
    href,
    className,
    children,
}) => {
    const [isDropdownExpanded, setIsDropdownExpanded] = useState<boolean>(true);

    const buttonContent = useCallback(
        (onClick?: () => void) => (
            <Button
                variant='raw'
                className={cn('flex w-full items-center', !isExpanded && 'justify-center')}
                onClick={onClick}
            >
                <Icon name={iconName} className='text-black' />
                <div
                    className={cn(
                        'flex flex-grow items-center justify-between',
                        'sidebar-transition',
                        isExpanded ? 'w-40' : 'w-0'
                    )}
                >
                    <div className={cn('sidebar-transition', isExpanded ? 'mx-2' : 'text-collapsed')}>
                        <p className='font-bold text-black'>{label}</p>
                    </div>
                </div>
            </Button>
        ),
        [iconName, isExpanded, label]
    );

    return (
        <div className={className}>
            <div className={cn('relative rounded-md px-3 py-2 hover:bg-slate-100', isSelected && 'bg-slate-200')}>
                {href && <Link href={href}>{buttonContent()}</Link>}
                {!href && buttonContent(onClick)}
                {children && (
                    <span
                        className={cn(
                            'absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer',
                            !isExpanded && 'right-0'
                        )}
                        onClick={() => setIsDropdownExpanded(!isDropdownExpanded)}
                    >
                        <Icon
                            name='caret-down'
                            width={16}
                            height={16}
                            className={cn('text-black', 'sidebar-transition', isDropdownExpanded && '-scale-y-100')}
                        />
                    </span>
                )}
            </div>
            {children && (
                <div
                    className={cn(
                        'mb-5 flex overflow-hidden',
                        'sidebar-transition',
                        isDropdownExpanded ? 'max-h-52' : 'max-h-0',
                        isExpanded && 'pl-6'
                    )}
                >
                    <Separator
                        orientation='vertical'
                        className={cn('h-22 bg-gray-200', 'sidebar-transition', !isExpanded && 'opacity-0')}
                    />
                    <div
                        className={cn(
                            'mt-2 flex w-full flex-col gap-2',
                            'sidebar-transition',
                            isExpanded ? 'pl-2' : '-translate-x-0'
                        )}
                    >
                        {children}
                    </div>
                </div>
            )}
        </div>
    );
};
