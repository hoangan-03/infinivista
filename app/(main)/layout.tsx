import {Sidebar} from '@/components/commons/sidebar';

export default function MainAppLayout({children}: {children: React.ReactNode}) {
    return (
        <div className='flex w-full'>
            <aside className='w-fit'>
                <Sidebar />
            </aside>
            <main className='bg-white'>{children}</main>
        </div>
    );
}
