import React from 'react';
import Image from 'next/image';
import {cn} from '@/lib/utils';

import DefaultAvatar from '@/assets/images/avatar-default.png';

interface AvatarProps {
    size?: number; // rem
    src?: string;
    alt?: string; // Default to 'avatar'
    variant?: 'default' | 'border';
    className?: string;
}

const Avatar: React.FC<AvatarProps> = ({
    size = 2.5 /* 40px */,
    src,
    alt = 'Avatar',
    variant = 'default',
    className,
}) => {
    const resolvedSrc = src || DefaultAvatar;
    return (
        <div
            className={cn(
                'relative aspect-square overflow-hidden rounded-full',
                variant === 'border' && 'border-2 border-radial-gradient',
                className
            )}
            style={{width: `${size}rem`}}
        >
            <Image src={resolvedSrc} alt={alt} className='h-full w-full object-cover' />
        </div>
    );
};

export default Avatar;
