import { WallpaperRandomizer } from "./login/_components/WallpaperRandomizer";

export default function LoginRegisterLayout({children}: {children: React.ReactNode}) {
    return (
        <div className="flex h-screen">
            <aside className='hidden md:flex flex-2 w-250px bg-gray-100'>
                <WallpaperRandomizer />
            </aside>
            <main className='flex-1 bg-white'>{children}</main>
        </div>
    );
}
