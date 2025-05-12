'use client';

import React, {createContext, useContext, useState} from 'react';

import {IFeed} from '@/modules/feed/feed.interface';
import {useGetNewsFeed} from '@/modules/feed/feed.swr';

export type FeedType = 'for-you' | 'friends';

interface FeedContextType {
    feedType: FeedType;
    setFeedType: (type: FeedType) => void;
    newsFeed?: IFeed;
}

const FeedContext = createContext<FeedContextType | undefined>(undefined);

export const FeedProvider = ({children}: {children: React.ReactNode}) => {
    const [feedType, setFeedType] = useState<FeedType>('for-you');
    const {data} = useGetNewsFeed();

    return <FeedContext.Provider value={{feedType, setFeedType, newsFeed: data}}>{children}</FeedContext.Provider>;
};

export const useFeedContext = () => {
    const context = useContext(FeedContext);
    if (!context) {
        throw new Error('useFeedContext must be used within a FeedProvider');
    }
    return context;
};
