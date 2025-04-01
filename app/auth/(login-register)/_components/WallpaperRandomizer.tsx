import Image from 'next/image';
import React from 'react';

import * as LoginWallpapers from '@/public/assets/images/login_wallpapers';

export const WallpaperRandomizer: React.FC = () => {
    // Get the list of wallpaper URLs
    const wallpaperList = Object.values(LoginWallpapers);

    // Function to get a random wallpaper
    const getRandomWallpaper = () => {
        const randomIndex = Math.floor(Math.random() * wallpaperList.length);
        return wallpaperList[randomIndex];
    };

    // Select a random wallpaper
    const randomWallpaper = getRandomWallpaper();

    return (
        <div style={{position: 'relative', width: '100%', height: '100%'}}>
            <Image src={randomWallpaper} alt='Login wallpaper' layout='fill' objectFit='cover' quality={100} />
        </div>
    );
};
