'use client';

import React from 'react';
import {useSelector} from 'react-redux';

import {IconButton} from '@/components/commons/IconButton';
import {RightBarElement} from '@/components/commons/layout/RightBar';
import {Button} from '@/components/ui';
import trendingList from '@/mock_data/trendingList';
import {SettingsState} from '@/slices/settingsSlice';

export const Trending: React.FC = () => {
    const minTrending = useSelector((state: {settings: SettingsState}) => state.settings.minTrending);
    const maxTrending = useSelector((state: {settings: SettingsState}) => state.settings.maxTrending);
    const [displayNumber, setDisplayNumber] = React.useState(0);
    const [expanded, setExpanded] = React.useState(false);
    const [mounted, setMounted] = React.useState(false);

    const handleToggleExpand = () => {
        const newDisplayNumber = expanded ? minTrending : maxTrending;
        setDisplayNumber(Math.min(newDisplayNumber, trendingList.length));
        setExpanded(!expanded);
    };

    React.useEffect(() => {
        setDisplayNumber(Math.min(minTrending, trendingList.length));
        setExpanded(false);
        setMounted(true);
    }, [minTrending]);

    return (
        <RightBarElement title='Trending'>
            <div className='flex flex-col gap-3'>
                {mounted &&
                    trendingList.slice(0, displayNumber).map((trend) => (
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
                            <IconButton label='More options' defaultName='More' />
                        </a>
                    ))}
                <Button variant='link' size='icon' onClick={handleToggleExpand}>
                    <p className='text-caption'>{!expanded ? 'See more' : 'See less'}</p>
                </Button>
            </div>
        </RightBarElement>
    );
};
