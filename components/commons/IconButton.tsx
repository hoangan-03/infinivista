import React from 'react';

import {Button} from '@/components/ui';
import {cn} from '@/lib/utils';

import Icon, {IconProps} from './Icon';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    defaultName: IconProps['name'];
    hoverName: IconProps['name'];
    width?: number;
    height?: number;
    className?: string;
}

const IconButton: React.FC<IconButtonProps> = ({
    defaultName,
    hoverName,
    width = 24,
    height = 24,
    className,
    ...props
}) => {
    return (
        <Button variant='iconOnly' size='icon' className={cn('group relative', className)} {...props}>
            <div className='opacity-100 transition-opacity group-hover:opacity-0'>
                <Icon name={defaultName} width={width} height={height} />
            </div>
            <div className='absolute left-0 top-0 opacity-0 transition-opacity group-hover:opacity-100'>
                <Icon name={hoverName} width={width} height={height} />
            </div>
        </Button>
    );
};

export default IconButton;
