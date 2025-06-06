import Image from 'next/image';
import React from 'react';

import {cn} from '@/lib/utils';
import logo from '@/public/assets/images/logo_transparent.png';

type LogoNameProps = {
    fontSize?: string; // string like '1.75rem' to set the height of the container div
    color?: string; // tailwind class
    className?: string;
};

export const LogoName: React.FC<LogoNameProps> = ({fontSize = '1.75rem', color = 'text-blue-700', className}) => {
    return (
        <div className='flex items-center' style={{height: fontSize}}>
            <div className='h-full scale-125'>
                <Image src={logo} alt='App logo' className='h-full w-full' />
            </div>
            <div className='aspect-[1/2] h-full' />
            <div className={cn(color, className, 'font-bold')} style={{fontSize: fontSize}}>
                {'Infinivista'.toUpperCase()}
            </div>
        </div>
    );
};
