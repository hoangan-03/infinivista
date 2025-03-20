import React from 'react';
import Link from 'next/link';
import Image, {StaticImageData} from 'next/image';
import {cn} from '@/lib/utils';

interface SidebarProfileProps {
    href: string;
    imgSrc: string | StaticImageData;
    name: string;
    email: string;
    sidebarExpanded: boolean;
    className?: string;
}

const SidebarProfile: React.FC<SidebarProfileProps> = ({href, imgSrc, name, email, sidebarExpanded, className}) => {
    return (
        <div className={cn('mb-5', className)}>
            <Link href={href} className={cn('flex items-center', !sidebarExpanded && 'justify-center')}>
                <div className='relative h-10 w-10 rounded-full'>
                    <Image
                        src={imgSrc}
                        alt='User Avatar'
                        width={40}
                        height={40}
                        className='absolute inset-0 left-0 top-0 h-full w-full object-cover'
                    />
                </div>
                <div className={cn('sidebar-transition', sidebarExpanded ? 'ml-4 w-36' : 'text-collapsed')}>
                    <p className='font-bold'>{name}</p>
                    <p className='max-w-[140px] truncate text-[#A0ABBB]'>{email}</p>
                </div>
            </Link>
        </div>
    );
};

export default SidebarProfile;
