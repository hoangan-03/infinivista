import {SessionProvider} from 'next-auth/react';
import React from 'react';

export const Provider: React.FC<{children: React.ReactNode}> = ({children}) => {
    return <SessionProvider>{children}</SessionProvider>;
};
