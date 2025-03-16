import React from 'react';
import {cn} from '@/lib/utils';
import Icon, {IconProps} from '../Icon';
import {Separator} from '@/components/ui';

interface SidebarElementProps {
    name: string;
    iconName: IconProps['name'];
    selected?: boolean;
    withIcon?: boolean;
    onClick?: () => void;
    className?: string;
    children?: React.ReactNode;
}

export const SidebarElement: React.FC<SidebarElementProps> = ({
    name,
    iconName,
    selected,
    withIcon,
    onClick,
    className,
    children,
}) => {
    return (
        <div className={cn('mb-5', className)}>
            <button
                className={cn(
                    'flex w-full items-center gap-2 rounded-xs px-3 py-2 hover:bg-gray-100',
                    selected && 'bg-gray-200'
                )}
                onClick={onClick}
            >
                <Icon name={iconName} width={24} height={24} className='text-black' />
                <p className='font-bold text-black'>{name}</p>
                {withIcon && (
                    <span>
                        <Icon name='CaretDown' width={16} height={16} className='rotate-180' />
                    </span>
                )}
            </button>
            {children && (
                <div className='mb-5 flex pl-6'>
                    <Separator orientation='vertical' className='h-[90px] bg-gray-200' />
                    <div className='flex w-full flex-col gap-2 pl-2'>{children}</div>
                </div>
            )}
        </div>
    );
};
