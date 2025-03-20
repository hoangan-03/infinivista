'use client';

import React from 'react';

import Logo from '@/public/assets/images/logo.svg';
import placeholderImage from '@/public/assets/images/placeholder.png';
import {Icon} from '@/components/commons';
import {Separator} from '@/components/ui';
import {usePathname, useRouter} from 'next/navigation';
import {cn} from '@/lib/utils';

import SidebarElement from './SidebarElement';
import SidebarSubElement from './SidebarSubElement';
import SidebarProfile from './SidebarProfile';

import './sidebar.css';

const pageList = [
    {id: 1, pageName: 'Connect', pathname: 'connect', selected: false},
    {id: 2, pageName: 'Feed', pathname: 'connect/feed', selected: false},
    {id: 3, pageName: 'Story', pathname: 'connect/story', selected: false},
    {id: 4, pageName: 'Discover', pathname: 'discover', selected: false},
    {id: 5, pageName: 'Message', pathname: 'communication', selected: false},
    {id: 6, pageName: 'Shop', pathname: 'shop', selected: false},
    {id: 7, pageName: 'Mailbox', pathname: 'mailbox', selected: false},
    {id: 8, pageName: 'Notifications', pathname: 'notifications', selected: false},
    {id: 9, pageName: 'Settings', pathname: 'settings', selected: false},
];

const Sidebar: React.FC = () => {
    const router = useRouter();
    const [sidebarExpanded, setSidebarExpanded] = React.useState(true);

    const currentURL = usePathname();
    const updatedPageList = pageList.map((page) => {
        if (page.pathname === 'connect') {
            // Only select 'connect' if it is the exact match and not a child path
            return {
                ...page,
                selected:
                    currentURL === '/connect' ||
                    (!currentURL.includes('/connect/feed') &&
                        !currentURL.includes('/connect/story') &&
                        currentURL.includes('/connect')),
            };
        }

        return {
            ...page,
            selected: currentURL.includes(page.pathname), // Standard match for other pages
        };
    });

    return (
        <div
            id='sidebar-wrapper'
            className={cn('h-full overflow-hidden', 'sidebar-transition', sidebarExpanded ? 'w-[250px]' : 'w-[80px]')}
        >
            <div className='shadow-sidebar custom-scrollbar-hidden fixed left-0 top-0 z-50 h-screen overflow-auto p-6'>
                <div className='relative mb-5 h-[33px] w-[202px]'>
                    <Logo />
                </div>
                <div className='mb-5'>
                    <button
                        className={cn(
                            'flex h-12 w-full items-center justify-center gap-2 rounded-[50px] bg-primary px-3 py-2 text-white',
                            'sidebar-transition',
                            !sidebarExpanded && 'flex w-12 flex-center'
                        )}
                    >
                        <span>
                            <Icon name='Plus' width={16} height={16} />
                        </span>
                        <p className={cn('font-bold', 'sidebar-transition', !sidebarExpanded && 'text-collapsed absolute')}>
                            New Post
                        </p>
                    </button>
                </div>
                <div>
                    <p className='mb-5 font-bold text-gray-500'>Menu</p>
                    <div className='mb-5'>
                        <SidebarElement
                            name='Connect'
                            iconName='Globe'
                            selected={updatedPageList[0].selected}
                            sidebarExpanded={sidebarExpanded}
                        >
                            <SidebarSubElement
                                name='Feed'
                                href='/connect/feed'
                                selected={updatedPageList[1].selected}
                            />
                            <SidebarSubElement
                                name='Story'
                                href='/connect/story'
                                selected={updatedPageList[2].selected}
                            />
                        </SidebarElement>
                        <SidebarElement
                            name='Discover'
                            iconName='Navigation'
                            selected={updatedPageList[3].selected}
                            sidebarExpanded={sidebarExpanded}
                            onClick={() => router.push('/discover')}
                        />
                        <SidebarElement
                            name='Message'
                            iconName='Chat'
                            selected={updatedPageList[4].selected}
                            sidebarExpanded={sidebarExpanded}
                            onClick={() => router.push('/communication')}
                        />
                        <SidebarElement
                            name='Shop'
                            iconName='ShopCart'
                            selected={updatedPageList[5].selected}
                            sidebarExpanded={sidebarExpanded}
                            onClick={() => router.push('/shop')}
                        />
                        <SidebarElement
                            name='Mailbox'
                            iconName='Mail'
                            selected={updatedPageList[6].selected}
                            withNumericalData
                            numericalData={32}
                            sidebarExpanded={sidebarExpanded}
                            numericalDataClassName='bg-primary'
                        />
                        <SidebarElement
                            name='Notifications'
                            iconName='NotificationBell'
                            selected={updatedPageList[7].selected}
                            withNumericalData
                            numericalData={10}
                            sidebarExpanded={sidebarExpanded}
                            numericalDataClassName='bg-green-600'
                        />
                        <SidebarElement
                            name='Settings'
                            iconName='SettingsGear'
                            selected={updatedPageList[8].selected}
                            sidebarExpanded={sidebarExpanded}
                            onClick={() => router.push('/settings')}
                        />
                        <Separator className='bg-gray-200' />
                    </div>
                    <div className='mb-5'>
                        <p className='mb-5 font-bold text-gray-500'>Profile</p>
                        <SidebarProfile
                            href='/profile'
                            imgSrc={placeholderImage}
                            name='John Nguyen'
                            email='john12052003@gmail.com'
                            sidebarExpanded={sidebarExpanded}
                        />
                        <SidebarElement
                            name='Switch Account'
                            iconName='LeftRight'
                            sidebarExpanded={sidebarExpanded}
                            onClick={() => console.log('Switching account...')}
                        />
                        <SidebarElement
                            name='Log Out'
                            iconName='Logout'
                            sidebarExpanded={sidebarExpanded}
                            onClick={() => console.log('Logging out...')}
                        />
                        <Separator className='bg-gray-200' />
                    </div>
                    <SidebarElement
                        name='Collapse'
                        iconName={sidebarExpanded ? 'ZoomOut' : 'ZoomIn'}
                        sidebarExpanded={sidebarExpanded}
                        onClick={() => setSidebarExpanded(!sidebarExpanded)}
                        className='mb-0'
                    />
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
