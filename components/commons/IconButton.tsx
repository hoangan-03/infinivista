import React from 'react';

import {Button} from '@/components/ui';
import {ButtonProps} from '@/components/ui/button';
import {cn} from '@/lib/utils';

import {Icon, IconProps} from './Icon';

export interface IconButtonProps extends Omit<ButtonProps, 'aria-label'> {
    label: string;
    defaultName: IconProps['name'];
    hoverName?: IconProps['name'];
    width?: number;
    height?: number;
    className?: string;
    iconClassName?: string;
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
    ({label, defaultName, hoverName, width = 24, height = 24, className, iconClassName, ...props}, ref) => {
        return (
            <Button
                aria-label={label}
                variant='iconOnly'
                size='icon'
                className={cn('group relative', className)}
                ref={ref}
                {...props}
            >
                <div className={cn('opacity-100 transition-opacity', hoverName && 'group-hover:opacity-0')}>
                    <Icon name={defaultName} width={width} height={height} className={iconClassName} />
                </div>
                {hoverName && (
                    <div className='absolute left-0 top-0 opacity-0 transition-opacity group-hover:opacity-100'>
                        <Icon name={hoverName} width={width} height={height} className={iconClassName} />
                    </div>
                )}
            </Button>
        );
    }
);
IconButton.displayName = 'IconButton';

export {IconButton};
