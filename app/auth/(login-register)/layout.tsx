import Image from 'next/image';

const loginWallpapers = [
    '/assets/images/login_wallpapers/login_1.jpg',
    '/assets/images/login_wallpapers/login_2.jpg',
    '/assets/images/login_wallpapers/login_3.jpg',
    '/assets/images/login_wallpapers/login_4.jpg',
    '/assets/images/login_wallpapers/login_5.jpg',
];

const wallpaperList = Object.values(loginWallpapers);

export default function LoginRegisterLayout({children}: {children: React.ReactNode}) {
    const getRandomWallpaper = () => {
        const randomIndex = Math.floor(Math.random() * wallpaperList.length);
        return wallpaperList[randomIndex];
    };

    const randomWallpaper = getRandomWallpaper();

    return (
        <div className='flex h-screen'>
            <aside className='hidden w-[250px] flex-2 bg-gray-100 md:flex'>
                <div className='relative h-full w-full'>
                    <Image
                        src={randomWallpaper}
                        alt='Login wallpaper'
                        // layout='fill'
                        fill
                        className='object-cover'
                        quality={100}
                    />
                </div>
            </aside>
            <main className='min-w-[380px] flex-1 overflow-y-auto bg-white'>{children}</main>
        </div>
    );
}
