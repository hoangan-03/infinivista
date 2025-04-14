'use client';

import React, {createContext, useContext, useState} from 'react';

export type FeedType = 'for-you' | 'friends' | 'following' | 'popular';

interface FeedContextType {
    feedType: FeedType;
    setFeedType: (type: FeedType) => void;
}

const FeedContext = createContext<FeedContextType | undefined>(undefined);

export const FeedProvider = ({children}: {children: React.ReactNode}) => {
    const [feedType, setFeedType] = useState<FeedType>('for-you');

    return <FeedContext.Provider value={{feedType, setFeedType}}>{children}</FeedContext.Provider>;
};

export const useFeedContext = () => {
    const context = useContext(FeedContext);
    if (!context) {
        throw new Error('useFeedContext must be used within a FeedProvider');
    }
    return context;
};
