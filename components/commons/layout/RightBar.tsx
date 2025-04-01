'use client';

import React from 'react';
import {Provider} from 'react-redux';

import {cn} from '@/lib/utils';
import {store} from '@/store';

export const RightBarElement: React.FC<{title: string; children: React.ReactNode; className?: string}> = ({
    title,
    children,
    className,
}) => {
    return (
        <div
            id={'rightbar-' + title.toLowerCase()}
            className={cn('relative flex h-fit min-w-[20rem] flex-col', className)}
        >
            <h5 className='mb-3 font-extrabold text-blue-700'>{title}</h5>
            {children}
        </div>
    );
};

const RightBarContent: React.FC<{children: React.ReactNode}> = ({children}) => {
    return (
        <div
            id='right-bar'
            className='custom-scrollbar-hidden sticky bottom-0 top-0 z-20 -mx-4 -mb-8 h-screen justify-between overflow-y-auto px-4 py-8'
        >
            <div id='rightbar-content' className='flex h-fit flex-col gap-5'>
                {children}
            </div>
        </div>
    );
};

export const RightBar: React.FC<{children: React.ReactNode}> = ({children}) => {
    return (
        <Provider store={store}>
            <RightBarContent>{children}</RightBarContent>
        </Provider>
    );
};
