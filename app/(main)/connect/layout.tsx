import React from 'react';

import MainContent from './_components/layoutComponents/MainContent';
import RightBar from './_components/layoutComponents/RightBar';

export default function ConnectLayout({children}: {children: React.ReactNode}) {
    return (
        <div className='bg-gray-50'>
            <div className='connect-container'>
                <div className='flex min-h-screen w-full px-10 pb-8'>
                    <div id='connect' className='flex w-full gap-10'>
                        <MainContent>{children}</MainContent>
                        <RightBar />
                    </div>
                </div>
            </div>
        </div>
    );
}
