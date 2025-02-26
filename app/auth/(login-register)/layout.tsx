import {WallpaperRandomizer} from './login/_components/WallpaperRandomizer';

export default function LoginRegisterLayout({children}: {children: React.ReactNode}) {
    return (
        <div className='flex h-screen'>
            <aside className='w-250px hidden flex-2 bg-gray-100 md:flex'>
                <WallpaperRandomizer />
            </aside>
            <main className='min-w-[380px] flex-1 overflow-y-auto bg-white'>{children}</main>
        </div>
    );
}
