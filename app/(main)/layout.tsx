import {Sidebar} from '@/app/(main)/communication/components/Sidebar';

export default function MainAppLayout({children}: {children: React.ReactNode}) {
    return (
        <>
            <aside className='w-[250px]'>
                <Sidebar />
            </aside>
            <main className='w-[calc(100%-250px)] bg-white'>{children}</main>
        </>
    );
}
