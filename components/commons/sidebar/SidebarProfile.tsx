import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import {cn} from '@/lib/utils';
import {IProfile} from '@/modules/profile/profile.interface';

interface SidebarProfileProps {
    href: string;
    data?: IProfile;
    isExpanded: boolean;
    className?: string;
}

export const SidebarProfile: React.FC<SidebarProfileProps> = ({href, data, isExpanded, className}) => {
    return (
        <div className={cn('group mb-5', className)}>
            <Link href={href} className={cn('flex items-center', !isExpanded && 'justify-center')}>
                <div className='relative h-10 w-10 rounded-full'>
                    <Image
                        src={data?.profileImageUrl || '/assets/images/avatar-default.png'}
                        alt='User Avatar'
                        width={40}
                        height={40}
                        className='absolute inset-0 left-0 top-0 h-full w-full rounded-full object-cover'
                    />
                </div>
                <div className={cn('sidebar-transition', isExpanded ? 'ml-4 w-36' : 'text-collapsed')}>
                    <p className='font-bold text-black group-hover:text-primary group-hover:underline'>
                        {data?.username || 'User Name'}
                    </p>
                    <p className='max-w-[140px] truncate text-[#A0ABBB]'>{data?.email}</p>
                </div>
            </Link>
        </div>
    );
};
