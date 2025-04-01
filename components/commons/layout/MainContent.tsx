import React from 'react';

export const MainContent: React.FC<{children: React.ReactNode}> = ({children}) => {
    return (
        <div id='main-content' className='relative flex min-w-[32.375rem] flex-2 flex-col' suppressHydrationWarning>
            {children}
        </div>
    );
};
