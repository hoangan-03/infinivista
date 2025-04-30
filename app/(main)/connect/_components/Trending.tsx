'use client';

import React, {useEffect, useState} from 'react';

import {Icon} from '@/components/commons';
import {Button} from '@/components/ui';
import {connectSidebarConfig} from '@/constants/common';
import {trendings} from '@/mock_data/trending';

const minTrending = connectSidebarConfig.trending.min;
const maxTrending = connectSidebarConfig.trending.max;

export const Trending: React.FC = () => {
    const [displayNumber, setDisplayNumber] = useState<number>(0);
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const [isMounted, setIsMounted] = useState<boolean>(false);

    const handleToggleExpand = () => {
        const newDisplayNumber = isExpanded ? minTrending : maxTrending;
        setDisplayNumber(Math.min(newDisplayNumber, trendings.length));
        setIsExpanded(!isExpanded);
    };

    useEffect(() => {
        setDisplayNumber(Math.min(minTrending, trendings.length));
        setIsExpanded(false);
        setIsMounted(true);
    }, []);

    return (
        <div className='flex flex-col gap-3'>
            {isMounted &&
                trendings.slice(0, displayNumber).map((trend) => (
                    <a
                        key={trend.id}
                        className='friend-tag -mx-2 flex w-[calc(100%+1rem)] cursor-pointer items-center justify-between gap-5 rounded-lg px-2 hover:bg-gray-200'
                    >
                        <div className='flex w-full flex-col'>
                            <p className='text-caption font-bold'>{trend.topic}</p>
                            <p className='text-overline'>
                                {trend.postCount < 1000 ? trend.postCount : trend.postCount / 1000 + 'k'} posts
                            </p>
                        </div>
                        <Button variant='icon' size='icon'>
                            <Icon name='more' />
                        </Button>
                    </a>
                ))}
            <Button variant='link' size='icon' onClick={handleToggleExpand}>
                <p className='text-caption'>{!isExpanded ? 'See more' : 'See less'}</p>
            </Button>
        </div>
    );
};
