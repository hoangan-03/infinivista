'use client';

import {usePathname} from 'next/navigation';
import React from 'react';

import {ConnectNavbar, ConnectSidebar} from './_components';

export default function ConnectLayout({children}: {children: React.ReactNode}) {
    const pathname = usePathname();

    // Determine the title based on the pathname
    let title = 'Feed'; // Default title
    let showTab = true;

    if (pathname?.includes('/connect/story')) {
        title = 'Story';
        showTab = false;
    }

    return (
        <div className='bg-gray-50'>
            <div className='flex min-h-screen w-full px-10 pb-8'>
                <div className='flex w-full gap-10'>
                    <div className='relative flex min-w-[32.375rem] flex-2 flex-col' suppressHydrationWarning>
                        <ConnectNavbar
                            title={title}
                            showTab={showTab}
                            className='sticky top-0 z-20 mb-6 h-[3.875rem] pt-8'
                        />
                        <div className='fixed left-0 top-0 z-10 h-[4.5rem] w-full bg-white' />
                        {children}
                    </div>
                    <ConnectSidebar />
                </div>
            </div>
        </div>
    );
}
