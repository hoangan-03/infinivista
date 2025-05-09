'use client';

import {Sidebar} from '@/components/commons';
import {FeedProvider} from '@/context';

import {ModalCallNotification} from './_components';

export default function MainLayout({children}: {children: React.ReactNode}) {
    return (
        <FeedProvider>
            <div className='flex w-full'>
                <aside className='w-fit'>
                    <Sidebar />
                </aside>
                <main className='flex-grow bg-white'>{children}</main>
                <ModalCallNotification />
            </div>
        </FeedProvider>
    );
}
