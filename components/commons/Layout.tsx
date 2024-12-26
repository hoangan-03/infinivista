import React, {ReactNode} from 'react';
import {Sidebar} from '../ui/sidebar';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({children}) => {
    return (
        <div className='flex'>
            <Sidebar />
            <main>{children}</main>
        </div>
    );
};

export default Layout;
