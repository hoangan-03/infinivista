import React from 'react';
import Image from 'next/image';
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
                    'relative aspect-square overflow-hidden rounded-full flex-center',
                    variant === 'border' && 'border-2 border-radial-gradient',
                    className
                )}
                style={{width: size}}
            >
                <Image fill src={resolvedSrc} alt={alt} style={{objectFit: 'cover'}} />
            </div>
        </>
    );
};

export default Avatar;
