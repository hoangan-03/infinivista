import Image from 'next/image';

import * as LoginWallpapers from '@/public/assets/images/login_wallpapers';

const wallpaperList = Object.values(LoginWallpapers);

export default function LoginRegisterLayout({children}: {children: React.ReactNode}) {
    const getRandomWallpaper = () => {
        const randomIndex = Math.floor(Math.random() * wallpaperList.length);
        return wallpaperList[randomIndex];
    };

    const randomWallpaper = getRandomWallpaper();

    return (
        <div className='flex h-screen'>
            <aside className='w-250px hidden flex-2 bg-gray-100 md:flex'>
                <div style={{position: 'relative', width: '100%', height: '100%'}}>
                    <Image
                        src={randomWallpaper}
                        alt='Login wallpaper'
                        layout='fill'
                        className='object-cover'
                        quality={100}
                    />
                </div>
            </aside>
            <main className='min-w-[380px] flex-1 overflow-y-auto bg-white'>{children}</main>
        </div>
    );
}
