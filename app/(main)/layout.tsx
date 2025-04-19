import {Sidebar} from '@/components/commons';

export default function MainLayout({children}: {children: React.ReactNode}) {
    return (
        <div className='flex w-full'>
            <aside className='w-fit'>
                <Sidebar />
            </aside>
            <main className='flex-grow bg-white'>{children}</main>
        </div>
    );
}
