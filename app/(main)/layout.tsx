'use client';

import {Sidebar} from '@/components/commons';
import {FeedProvider} from '@/context';

export default function MainLayout({children}: {children: React.ReactNode}) {
    return (
        <div className='flex w-full'>
            <aside className='w-fit'>
                <Sidebar />
            </aside>
            <main className='flex-grow bg-white'>
                <FeedProvider>{children}</FeedProvider>
            </main>
        </div>
    );
}
