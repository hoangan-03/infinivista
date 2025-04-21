'use client';

import React from 'react';

import {FeedType, useFeedContext} from '@/context';
import {cn} from '@/lib/utils';

interface Tab {
    label: string;
    value: FeedType;
    disabled: boolean;
}

const tabList: Tab[] = [
    {
        label: 'For You',
        value: 'for-you',
        disabled: false,
    },
    {
        label: 'Friends',
        value: 'friends',
        disabled: false,
    },
    {
        label: 'Following',
        value: 'following',
        disabled: false,
    },
    {
        label: 'Popular',
        value: 'popular',
        disabled: false,
    },
];

interface ConnectNavbarProps {
    title: string;
    className?: string;
}

export const ConnectNavbar: React.FC<ConnectNavbarProps> = ({title, className}) => {
    const {feedType, setFeedType} = useFeedContext();

    return (
        <div className={cn('flex w-full items-center justify-between', className)}>
            <h5 className='font-extrabold text-blue-700'>{title}</h5>
            <div className='flex items-center gap-4'>
                {tabList.map((tab, index) => (
                    <p
                        key={index}
                        onClick={() => setFeedType(tab.value)}
                        className={cn(
                            'cursor-pointer text-subtitle2 font-bold',
                            tab.disabled
                                ? 'cursor-not-allowed text-gray-300'
                                : feedType === tab.value
                                  ? 'text-blue-700'
                                  : 'text-gray-300'
                        )}
                    >
                        {tab.label}
                    </p>
                ))}
            </div>
        </div>
    );
};
