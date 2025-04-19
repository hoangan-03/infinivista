'use client';

import React, {useEffect, useState} from 'react';

import {cn} from '@/lib/utils';

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
        return <div className={cn('rounded-xl bg-slate-200', className)} />;
    }

    return (
        <video controls={controls} className={className} {...props}>
            <source src={src} type={type} />
            There was an error loading the video.
        </video>
    );
};
