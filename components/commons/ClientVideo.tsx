'use client';

import React, {useEffect, useState} from 'react';

import {cn} from '@/lib/utils';

import {Spinner} from '.';

interface Props extends React.VideoHTMLAttributes<HTMLVideoElement> {
    src: string;
    type?: string;
}

export const ClientVideo: React.FC<Props> = ({src, controls = true, type = 'video/mp4', className, ...props}) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className={cn('relative rounded-xl bg-slate-200', className)}>
                <div className='absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2'>
                    <Spinner width={24} height={24} />
                </div>
            </div>
        );
    }

    return (
        <video controls={controls} className={className} {...props}>
            <source src={src} type={type} />
            There was an error loading the video.
        </video>
    );
};
