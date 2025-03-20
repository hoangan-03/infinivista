import React from 'react';
import {cn} from '@/lib/utils';
import Icon, {IconProps} from '../Icon';
import {Separator} from '@/components/ui';

interface SidebarElementProps {
    name: string;
    iconName: IconProps['name'];
    selected?: boolean;
    withNumericalData?: boolean;
    numericalData?: number;
    numericalDataClassName?: string;
    sidebarExpanded: boolean;
    onClick?: () => void;
    className?: string;
    children?: React.ReactNode;
}

const SidebarElement: React.FC<SidebarElementProps> = ({
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
}) => {
    const [dropdownExpanded, setDropdownExpanded] = React.useState(true);

    return (
        <div className={cn('mb-5', className)}>
            <div className='relative rounded-xs px-3 py-2 hover:bg-gray-100'>
                <button className={cn('flex w-full items-center gap-2', selected && 'bg-gray-200')} onClick={onClick}>
                    <Icon name={iconName} width={24} height={24} className='text-black' />
                    <span className='flex flex-grow items-center justify-between'>
                        <div className={cn('sidebar-transition', !sidebarExpanded && 'text-collapsed')}>
                            <p className='font-bold text-black'>{name}</p>
                        </div>

                        {withNumericalData && (
                            <p
                                className={cn(
                                    'rounded-xs px-2 text-white',
                                    'sidebar-transition',
                                    !sidebarExpanded &&
                                        'origin-bottom-left -translate-x-32 translate-y-2 scale-75 transform',
                                    numericalDataClassName
                                )}
                            >
                                {numericalData}
                            </p>
                        )}
                    </span>
                </button>
                {children && (
                    <span
                        className='absolute right-1 top-1/2 -translate-y-1/2 cursor-pointer'
                        onClick={() => setDropdownExpanded(!dropdownExpanded)}
                    >
                        <Icon
                            name='CaretDown'
                            width={16}
                            height={16}
                            className={cn(
                                'transition-transform duration-300 ease-in-out',
                                dropdownExpanded && '-scale-y-100'
                            )}
                        />
                    </span>
                )}
            </div>
            {children && (
                <div
                    className={cn(
                        'mb-5 flex overflow-hidden pl-6 transition-all duration-300 ease-in-out',
                        dropdownExpanded ? 'max-h-[200px] opacity-100' : 'max-h-0 opacity-0'
                    )}
                >
                    <Separator orientation='vertical' className='h-[90px] bg-gray-200' />
                    <div className='flex w-full flex-col gap-2 pl-2'>{children}</div>
                </div>
            )}
        </div>
    );
};

export default SidebarElement;
