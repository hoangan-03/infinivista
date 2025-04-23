'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import React, {useState} from 'react';

import {ModalNewPost} from '@/app/(main)/_components';
import {Icon} from '@/components/commons';
import {Button, Separator} from '@/components/ui';
import {cn} from '@/lib/utils';
import {profile} from '@/mock_data/profile';
import LogoIcon from '@/public/assets/images/logo_icon.svg';
import LogoText from '@/public/assets/images/logo_text.svg';
import {ROUTES} from '@/routes/routes.enum';

import {SidebarElement} from './SidebarElement';
import {SidebarProfile} from './SidebarProfile';
import {SidebarSubElement} from './SidebarSubElement';

interface ISidebarContent {
    label: string;
    iconName: string;
    children?: ISidebarContent[];
    href?: string;
    onClick?: () => void;
}

const menuSidebarContents: ISidebarContent[] = [
    {
        label: 'Connect',
        iconName: 'globe',
        href: ROUTES.CONNECT,
        children: [
            {label: 'Feed', iconName: 'globe', href: ROUTES.CONNECT_FEED},
            {label: 'Story', iconName: 'globe', href: ROUTES.CONNECT_STORY},
        ],
    },
    {label: 'Discover', iconName: 'navigation', href: ROUTES.DISCOVER},
    {label: 'Messages', iconName: 'chat-circle', href: ROUTES.COMMUNICATION},
    {label: 'Settings', iconName: 'settings-gear', href: ROUTES.SETTINGS},
    {label: 'Notifications', iconName: 'notification-bell', href: ROUTES.NOTIFICATIONS},
];

const profileSidebarContents: ISidebarContent[] = [
    {label: 'Switch Account', iconName: 'left-right'},
    {label: 'Log Out', iconName: 'logout'},
];

export const Sidebar: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState<boolean>(true);
    const [showModalNewPost, setShowModalNewPost] = useState<boolean>(false);
    const currentURL = usePathname();

    const isRouteActive = (path: string): boolean => {
        if (!path) return false;
        return currentURL === path;
    };

    const isChildRouteActive = (path: string): boolean => {
        if (!path) return false;
        return currentURL.startsWith(`${path}/`) || currentURL === path;
    };

    return (
        <div className={cn('h-full overflow-hidden', 'sidebar-transition', isExpanded ? 'w-64' : 'w-20')}>
            <div
                className={cn(
                    'custom-scrollbar-hidden fixed left-0 top-0 z-50 h-screen space-y-4 overflow-auto bg-white py-6 shadow-sm',
                    'sidebar-transition',
                    isExpanded ? 'w-64 px-6' : 'w-20 px-3'
                )}
            >
                <Link href={ROUTES.CONNECT_FEED}>
                    <div className='relative h-[33px] flex-center'>
                        <LogoIcon />
                        <LogoText className={cn('sidebar-transition', isExpanded ? 'ml-2' : 'w-0')} />
                    </div>
                </Link>
                <div className='flex-center'>
                    <Button
                        className={cn(
                            'h-12 w-full gap-2 bg-primary px-3 py-2 text-slate-50 flex-center hover:bg-slate-900/90',
                            'text-nowrap transition-all duration-500 ease-in-out',
                            !isExpanded && 'flex w-12'
                        )}
                        onClick={() => setShowModalNewPost(true)}
                    >
                        <span>
                            <Icon name='plus' width={16} height={16} className='text-white' />
                        </span>
                        <p className={cn('font-bold', 'sidebar-transition', !isExpanded && 'text-collapsed absolute')}>
                            New Post
                        </p>
                    </Button>
                </div>
                <div className='space-y-4'>
                    <p className='font-bold text-gray-500'>Menu</p>
                    <div className='space-y-4'>
                        {menuSidebarContents.map((item, index) => {
                            const hasActiveChild =
                                item.children?.some((child) => isChildRouteActive(child.href || '')) || false;
                            return (
                                <SidebarElement
                                    key={index}
                                    label={item.label}
                                    iconName={item.iconName}
                                    isSelected={isRouteActive(item.href || '') || hasActiveChild}
                                    isExpanded={isExpanded}
                                    href={item.href}
                                    onClick={item.onClick}
                                >
                                    {item.children?.map((child, childIndex) => (
                                        <SidebarSubElement
                                            key={childIndex}
                                            label={child.label}
                                            href={child.href}
                                            isSelected={isChildRouteActive(child.href || '')}
                                            isExpanded={isExpanded}
                                            className='mt-1'
                                        />
                                    ))}
                                </SidebarElement>
                            );
                        })}
                        <Separator className='bg-gray-200' />
                    </div>
                    <div className='space-y-4'>
                        <p className='font-bold text-gray-500'>Profile</p>
                        <SidebarProfile
                            href={ROUTES.PROFILE + `/${profile.username}`}
                            data={profile}
                            isExpanded={isExpanded}
                        />
                        {profileSidebarContents.map((item, index) => (
                            <SidebarElement
                                key={index}
                                label={item.label}
                                iconName={item.iconName}
                                isExpanded={isExpanded}
                                onClick={item.onClick}
                            />
                        ))}
                        <Separator className='bg-gray-200' />
                    </div>
                    <SidebarElement
                        label='Collapse'
                        iconName={isExpanded ? 'zoom-out' : 'zoom-in'}
                        isExpanded={isExpanded}
                        onClick={() => setIsExpanded(!isExpanded)}
                    />
                </div>
            </div>
            <ModalNewPost open={showModalNewPost} onClose={() => setShowModalNewPost(false)} data={profile} />
        </div>
    );
};
