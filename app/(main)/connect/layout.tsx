import React from 'react';

import {MainContent, RightBar} from '@/components/commons/layout';
import {FeedProvider} from '@/context';

import {ConnectNavbar, Contacts, Suggestions, Trending} from './_components';

export default function ConnectLayout({children}: {children: React.ReactNode}) {
    return (
        <div className='bg-gray-50'>
            <div className='flex min-h-screen w-full px-10 pb-8'>
                <div className='flex w-full gap-10'>
                    <FeedProvider>
                        <MainContent>
                            <ConnectNavbar title='Feed' className='sticky top-0 z-20 mb-6 h-[3.875rem] pt-8' />
                            <div className='fixed left-0 top-0 z-10 h-[4.5rem] w-full bg-white' />
                            {children}
                        </MainContent>
                    </FeedProvider>
                    <RightBar>
                        <Suggestions />
                        <Trending />
                        <Contacts />
                    </RightBar>
                </div>
            </div>
        </div>
    );
}
