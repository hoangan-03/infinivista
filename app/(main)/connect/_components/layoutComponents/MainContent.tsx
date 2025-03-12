import React from 'react';
import ConnectNavbar from '../ConnectNavbar';

const MainContent: React.FC<{children: React.ReactNode}> = ({children}) => {
    return (
        <div id='main-content' className='relative flex min-w-[32.375rem] flex-2 flex-col' suppressHydrationWarning>
            <ConnectNavbar title='Feed' className='sticky top-0 z-20 mb-6 h-[3.875rem] pt-8' />
            <div className='filler fixed left-0 top-0 z-10 h-[4.5rem] w-full bg-white' />
            {children}
        </div>
    );
};

export default MainContent;
