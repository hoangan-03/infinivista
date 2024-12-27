import {AppSidebar} from '@/app/newsfeed/components/Sidebar';
import {SidebarProvider, SidebarTrigger} from '@/app/newsfeed/components/ui/sidebar';

export default function Layout({children}: {children: React.ReactNode}) {
    return (
        <SidebarProvider id='sidebar-provider'>
            <AppSidebar />
            <main className='w-full'>
                {children}
            </main>
        </SidebarProvider>
    );
}
