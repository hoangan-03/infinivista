import React from 'react';

import {Icon} from '@/components/commons';
import {Button, Separator} from '@/components/ui';
import {cn} from '@/lib/utils';

interface SidebarElementProps {
    name: string;
    iconName: string;
    selected?: boolean;
    withNumericalData?: boolean;
    numericalData?: number;
    numericalDataClassName?: string;
    sidebarExpanded: boolean;
    onClick?: () => void;
    className?: string;
    children?: React.ReactNode;
    childSelected?: boolean;
}

export const SidebarElement: React.FC<SidebarElementProps> = ({
    name,
    iconName,
    selected,
    withNumericalData,
    numericalData,
    sidebarExpanded,
    onClick,
    className,
    numericalDataClassName,
    children,
    childSelected,
}) => {
    const [dropdownExpanded, setDropdownExpanded] = React.useState(true);

    /*
    If no children => based on the value of selected
    If children => only selected when one of the children is selected and the dropdown is collapsed
    */
    const hasNoChildrenAndSelected = !children && selected;
    const hasChildrenAndChildSelected = children && childSelected && !dropdownExpanded;
    const realSelected = hasNoChildrenAndSelected || hasChildrenAndChildSelected;

    return (
        <div className={cn('mb-5', className)}>
            <div className={cn('relative rounded-xs px-3 py-2 hover:bg-gray-100', realSelected && 'bg-gray-200')}>
                <Button
                    variant='raw'
                    className={cn('flex w-full items-center', !sidebarExpanded && 'justify-center')}
                    onClick={onClick}
                >
                    <Icon name={iconName} className='text-black' />
                    <div
                        className={cn(
                            'flex flex-grow items-center justify-between',
                            'sidebar-transition',
                            sidebarExpanded ? 'w-40' : 'w-0'
                        )}
                    >
                        <div className={cn('sidebar-transition', sidebarExpanded ? 'mx-2' : 'text-collapsed')}>
                            <p className='font-bold text-black'>{name}</p>
                        </div>

                        {withNumericalData && (
                            <p
                                className={cn(
                                    'rounded-xs px-2 text-white',
                                    'sidebar-transition',
                                    !sidebarExpanded && 'origin-bottom-left -translate-x-3 translate-y-2 scale-75',
                                    numericalDataClassName
                                )}
                            >
                                {numericalData}
                            </p>
                        )}
                    </div>
                </Button>
                {children && (
                    <span
                        className='absolute right-0 top-1/2 -translate-y-1/2 cursor-pointer'
                        onClick={() => setDropdownExpanded(!dropdownExpanded)}
                    >
                        <Icon
                            name='caret-down'
                            width={16}
                            height={16}
                            className={cn('text-black', 'sidebar-transition', dropdownExpanded && '-scale-y-100')}
                        />
                    </span>
                )}
            </div>
            {children && (
                <div
                    className={cn(
                        'mb-5 flex overflow-hidden',
                        'sidebar-transition',
                        dropdownExpanded ? 'max-h-52' : 'max-h-0',
                        sidebarExpanded && 'pl-6'
                    )}
                >
                    <Separator
                        orientation='vertical'
                        className={cn('h-22 bg-gray-200', 'sidebar-transition', !sidebarExpanded && 'opacity-0')}
                    />
                    <div
                        className={cn(
                            'mt-2 flex w-full flex-col gap-2',
                            'sidebar-transition',
                            sidebarExpanded ? 'pl-2' : '-translate-x-0'
                        )}
                    >
                        {children}
                    </div>
                </div>
            )}
        </div>
    );
};
