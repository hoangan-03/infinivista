'use client';

import { usePathname } from 'next/navigation';
import { Sidebar } from '@/app/communication/components/Sidebar';

const SidebarWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const pathname = usePathname();
    const hideSidebar = pathname === '/landingpage';

    return (
        <>
            {!hideSidebar && (
                <aside className="w-[250px]">
                    <Sidebar />
                </aside>
            )}
            <main className={hideSidebar ? 'w-full' : 'w-[calc(100%-250px)] bg-white'}>
                {children}
            </main>
        </>
    );
};

export default SidebarWrapper;
