import Image from 'next/image';
import React from 'react';

import {cn} from '@/lib/utils';
import DefaultAvatar from '@/public/assets/images/avatar-default.png';

interface AvatarProps {
    size?: number; // px
    src?: string;
    alt?: string; // Default to 'avatar'
    variant?: 'default' | 'border';
    className?: string;
}

const Avatar: React.FC<AvatarProps> = ({size = 40 /* 40px */, src, alt = 'Avatar', variant = 'default', className}) => {
    const resolvedSrc = src || DefaultAvatar;
    return (
        <>
            <div
                className={cn(
                    'relative overflow-hidden rounded-full flex-center',
                    variant === 'border' && 'border-radial-gradient border-2',
                    className
                )}
                style={{width: size, height: size}}
            >
                <Image fill sizes={`${size}px`} src={resolvedSrc} alt={alt} className='object-cover' />
            </div>
        </>
    );
};

export default Avatar;
