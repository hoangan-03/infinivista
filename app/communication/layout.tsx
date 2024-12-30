import {Sidebar} from './components/Sidebar';

export default function CommunicationLayout({children}: {children: React.ReactNode}) {
    return (
        <div className='bg-gray-100'>
            <div className='container'>
                <div className='relative flex min-h-screen bg-white'>
                    <aside className='w-[250px]'>
                        <Sidebar />
                    </aside>
                    <main className='w-[calc(100%-250px)] bg-white px-10 py-8'>{children}</main>
                </div>
            </div>
        </div>
    );
}
