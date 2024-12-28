'use client';

import React from 'react';
import {cn} from '@/lib/utils';

const defaultTabList = [
    {
        label: 'For You',
        pathname: 'for-you',
        disabled: false,
        selected: true,
    },
    {
        label: 'Friends',
        pathname: 'friends',
        disabled: false,
        selected: false,
    },
    {
        label: 'Following',
        pathname: 'following',
        disabled: false,
        selected: false,
    },
    {
        label: 'Popular',
        pathname: 'popular',
        disabled: false,
        selected: false,
    },
];

const style = {
    default: 'text-gray-300',
    disabled: 'text-gray-300 cursor-not-allowed',
    selected: 'text-blue-700',
};

interface ConnectNavbarProps {
    title: string;
    tabList?: {label: string; pathname: string; disabled: boolean; selected: boolean}[];
    className?: string; // Additional CSS class name for the container div
}

const ConnectNavbar: React.FC<ConnectNavbarProps> = ({title, tabList = defaultTabList, className}) => {
    const currentURL = window.location.href;
    const selection = currentURL.split('/').pop();
    tabList.forEach((tab) => {
        tab.selected = tab.pathname === selection;
    });

    return (
        <div id='connect-navbar' className={cn('flex w-full items-center justify-between', className)}>
            <h4 className='text-heading5 font-extrabold text-blue-700'>{title}</h4>
            <div className='flex items-center gap-4'>
                {tabList.map((tab, index) => (
                    <a
                        key={index}
                        href={'/connect/' + tab.pathname}
                        className={`text-subtitle2 font-bold ${tab.disabled ? style.disabled : tab.selected ? style.selected : style.default}`}
                    >
                        {tab.label}
                    </a>
                ))}
            </div>
        </div>
    );
};

export default ConnectNavbar;
