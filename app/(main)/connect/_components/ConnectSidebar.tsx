'use client';

import React from 'react';

import {cn} from '@/lib/utils';

import {Contacts, Suggestions, Trending} from '.';

interface ConnectSidebarElement {
    title: string;
    children: React.ReactNode;
    className?: string;
}

const connectSidebarElements: ConnectSidebarElement[] = [
    {
        title: 'Suggestions',
        children: <Suggestions />,
    },
    {
        title: 'Trending',
        children: <Trending />,
    },
    {
        title: 'Contacts',
        children: <Contacts />,
    },
];

export const ConnectSidebar: React.FC = () => {
    return (
        <div className='custom-scrollbar-hidden sticky bottom-0 top-0 z-20 -mx-4 -mb-8 h-screen justify-between overflow-y-auto px-4 py-8'>
            <div className='h-fit space-y-5'>
                {connectSidebarElements.map((element, index) => (
                    <div key={index} className={cn('relative flex h-fit min-w-[20rem] flex-col', element.className)}>
                        <h5 className='mb-3 font-extrabold text-blue-700'>{element.title}</h5>
                        {element.children}
                    </div>
                ))}
            </div>
        </div>
    );
};
