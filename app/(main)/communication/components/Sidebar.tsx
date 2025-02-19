'use client'

import Image from 'next/image';

import Logo from '@/assets/images/logo.svg';
import placeholderImage from '@/assets/images/placeholder.png';
import {Icon} from '@/components/commons';
import {Separator} from '@/components/ui';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const pageList = [
    { id: 1, pageName: 'Connect', pathname: 'connect', selected: false },
    { id: 2, pageName: 'Feed', pathname: 'connect/feed', selected: false },
    { id: 3, pageName: 'Story', pathname: 'connect/story', selected: false },
    { id: 4, pageName: 'Discover', pathname: 'discover', selected: false },
    { id: 5, pageName: 'Message', pathname: 'communication', selected: false },
    { id: 6, pageName: 'Shop', pathname: 'shop', selected: false },
    { id: 7, pageName: 'Mailbox', pathname: 'mailbox', selected: false },
    { id: 8, pageName: 'Notifications', pathname: 'notifications', selected: false },
    { id: 9, pageName: 'Settings', pathname: 'settings', selected: false },
];

export const Sidebar: React.FC = () => {
    const currentURL = usePathname();
    const updatedPageList = pageList.map((page) => {
        if (page.pathname === 'connect') {
            // Only select 'connect' if it is the exact match and not a child path
            return {
                ...page,
                selected:
                    currentURL === '/connect' || 
                    (!currentURL.includes('/connect/feed') && !currentURL.includes('/connect/story') && currentURL.includes('/connect')),
            };
        }

        return {
            ...page,
            selected: currentURL.includes(page.pathname), // Standard match for other pages
        };
    });

    return (
        <div className='shadow-sidebar custom-scrollbar-hidden fixed h-screen left-0 top-0 p-6 z-50 overflow-auto'>
            <div className='relative mb-5 h-[33px] w-[202px]'>
                <Logo />
            </div>
            <div className='mb-5'>
                <button className='flex h-12 w-full items-center justify-center gap-2 rounded-[50px] bg-primary px-3 py-2 text-white'>
                    <span>
                        <Icon name='Plus' width={16} height={16} />
                    </span>
                    <p className='font-bold'>New Post</p>
                </button>
            </div>
            <div>
                <p className='mb-5 font-bold text-gray-500'>Menu</p>
                <div className='mb-5'>
                    <button className={cn('flex w-full items-center gap-2 rounded-xs px-3 py-2 hover:bg-gray-100', updatedPageList[0].selected && 'bg-gray-200')}>
                        <span className='flex items-center gap-2'>
                            <Icon name='Globe' width={24} height={24} className='text-black' />
                            <p className='font-bold'>Connect</p>
                        </span>
                        <span>
                            <Icon name='CaretDown' width={16} height={16} className='rotate-180' />
                        </span>
                    </button>
                    <div className='mb-5 flex pl-6'>
                        <Separator orientation='vertical' className='h-[90px] bg-gray-200' />
                        <div className='flex w-full flex-col gap-2 pl-2'>
                            <Link href='/connect/feed'>
                                <button className={cn('w-full rounded-xs p-2 text-left text-[14px] hover:bg-gray-100', updatedPageList[1].selected && 'bg-gray-200')}>
                                    Feed
                                </button>
                            </Link>
                            <button className={cn('w-full rounded-xs p-2 text-left text-[14px] hover:bg-gray-100', updatedPageList[2].selected && 'bg-gray-200')}>Story</button>
                        </div>
                    </div>
                    <div className='mb-5'>
                        <button className={cn('flex w-full items-center gap-2 rounded-xs px-3 py-2 hover:bg-gray-100', updatedPageList[3].selected && 'bg-gray-200')}>
                            <Icon name='Navigation' width={24} height={24} className='text-black' />
                            <p className='font-bold text-black'>Discover</p>
                        </button>
                    </div>
                    <div className='mb-5'>
                        <Link href='/communication'>
                            <button className={cn('flex w-full items-center gap-2 rounded-xs px-3 py-2 hover:bg-gray-100', updatedPageList[4].selected && 'bg-gray-200')}>
                                <Icon name='Chat' width={24} height={24} className='text-black' />
                                <p className='font-bold text-black'>Message</p>
                            </button>
                        </Link>
                    </div>
                    <div className='mb-5'>
                        <button className={cn('flex w-full items-center gap-2 rounded-xs px-3 py-2 hover:bg-gray-100', updatedPageList[5].selected && 'bg-gray-200')}>
                            <Icon name='ShopCart' width={24} height={24} className='text-black' />
                            <p className='font-bold text-black'>Shop</p>
                        </button>
                    </div>
                    <div className='mb-5'>
                        <button className={cn('flex w-full items-center gap-2 rounded-xs px-3 py-2 hover:bg-gray-100', updatedPageList[6].selected && 'bg-gray-200')}>
                            <Icon name='Mail' width={24} height={24} className='text-black' />
                            <span className='flex flex-grow items-center justify-between'>
                                <p className='font-bold text-black'>Mailbox</p>
                                <p className='rounded-xs bg-primary px-2 text-white'>32</p>
                            </span>
                        </button>
                    </div>
                    <div className='mb-5'>
                        <button className={cn('flex w-full items-center gap-2 rounded-xs px-3 py-2 hover:bg-gray-100', updatedPageList[7].selected && 'bg-gray-200')}>
                            <Icon name='NotificationBell' width={24} height={24} className='text-black' />
                            <span className='flex flex-grow items-center justify-between'>
                                <p className='font-bold text-black'>Notifications</p>
                                <p className='rounded-xs bg-green-600 px-2 text-white'>10</p>
                            </span>
                        </button>
                    </div>
                    <div className='mb-5'>
                        <button className={cn('flex w-full items-center gap-2 rounded-xs px-3 py-2 hover:bg-gray-100', updatedPageList[8].selected && 'bg-gray-200')}>
                            <Icon name='SettingsGear' width={24} height={24} className='text-black' />
                            <p className='font-bold text-black'>Settings</p>
                        </button>
                    </div>
                    <Separator className='bg-gray-200' />
                </div>
                <div className='mb-5'>
                    <p className='mb-5 font-bold text-gray-500'>Profile</p>
                    <div className='mb-5 flex items-center gap-4'>
                        <div className='relative h-10 w-10 rounded-full'>
                            <Image
                                src={placeholderImage}
                                alt='User Avatar'
                                width={40}
                                height={40}
                                className='absolute inset-0 left-0 top-0 h-full w-full object-cover'
                            />
                        </div>
                        <Link href='/profile'>
                            <div>
                                <p className='font-bold'>John Nguyen</p>
                                <p className='max-w-[140px] truncate text-[#A0ABBB]'>john12052003@gmail.com</p>
                            </div>
                        </Link>
                    </div>
                    <div className='mb-5'>
                        <button className='flex w-full items-center gap-2 rounded-xs px-3 py-2 hover:bg-gray-100'>
                            <Icon name='LeftRight' width={24} height={24} className='text-black' />
                            <p className='font-bold text-black'>Switch Account</p>
                        </button>
                    </div>
                    <div className='mb-5'>
                        <button className='flex w-full items-center gap-2 rounded-xs px-3 py-2 hover:bg-gray-100'>
                            <Icon name='Logout' width={24} height={24} className='text-black' />
                            <p className='font-bold text-black'>Log Out</p>
                        </button>
                    </div>
                    <Separator className='bg-gray-200' />
                </div>
                <div>
                    <button className='flex w-full items-center gap-2 rounded-xs px-3 py-2 hover:bg-gray-100'>
                        <Icon name='ZoomOut' width={24} height={24} className='text-black' />
                        <p className='font-bold text-black'>Collapse</p>
                    </button>
                </div>
            </div>
        </div>
    );
};
