'use client';

import React from 'react';

import Image from 'next/image';
import ConnectNavbar from './components/ConnectNavbar';
import {cn} from '@/lib/utils';
import Button from './components/Button';
import {Icon} from '@/components/commons';

import SuggestionList from './mockData/suggestionList';
import TrendingList from './mockData/trendingList';
import FriendList from './mockData/friendList';

const MainContent: React.FC<{children: React.ReactNode}> = ({children}) => {
    return (
        <div id='main-content' className='flex-2 relative flex min-w-[32.375rem] flex-col'>
            <ConnectNavbar title='Feed' className='sticky top-0 z-20 mb-6 h-[3.875rem] pt-8' />
            <div className='filler fixed left-0 top-0 z-10 h-[4.5rem] w-full bg-white' />
            {children}
        </div>
    );
};

const RightBarElement: React.FC<{title: string; children: React.ReactNode; className?: string}> = ({
    title,
    children,
    className,
}) => {
    return (
        <div
            id={'rightbar-' + title.toLowerCase()}
            className={cn('relative flex h-fit min-w-[20rem] flex-col', className)}
        >
            <h5 className='mb-3 font-extrabold text-blue-700'>{title}</h5>
            {children}
        </div>
    );
};

const RightBarContent: React.FC = () => {
    const [maxSuggestions, setMaxSuggestions] = React.useState<number>(4);
    const [maxTrending, setMaxTrending] = React.useState<number>(4);
    const [maxContacts, setMaxContacts] = React.useState<number>(4);

    return (
        <div
            id='right-bar'
            className='custom-scrollbar-hidden sticky bottom-0 top-0 z-20 -mx-4 -mb-8 h-screen flex-1 justify-between overflow-y-auto px-4 py-8'
        >
            <div id='rightbar-content' className='flex h-fit flex-col gap-5'>
                <RightBarElement title='Suggestions'>
                    <div className='flex flex-col gap-3'>
                        {SuggestionList.map(
                            (person, index) =>
                                index < maxSuggestions && (
                                    <a
                                        key={person.id}
                                        className='friend-tag flex w-full cursor-pointer items-center justify-between gap-5 rounded-full hover:bg-gray-200'
                                    >
                                        <div className='flex w-full items-center gap-3'>
                                            <Image
                                                src={person.profilePic}
                                                alt={'Avatar of ' + person.name}
                                                width={40}
                                                height={40}
                                                className='rounded-full'
                                            />
                                            <cap className='font-bold text-gray-700'>{person.name}</cap>
                                        </div>
                                        <Button className='add-friend-button h-fit p-1'>
                                            <cap>Add Friend</cap>
                                        </Button>
                                    </a>
                                )
                        )}
                        <div className='flex-center'>
                            <button className='w-fit'>
                                <overline className='text-blue-700'>See more</overline>
                            </button>
                        </div>
                    </div>
                </RightBarElement>
                <RightBarElement title='Trending'>
                    <div className='flex flex-col gap-3'>
                        {TrendingList.map(
                            (trend, index) =>
                                index < maxTrending && (
                                    <a
                                        key={trend.id}
                                        className='friend-tag -mx-2 flex w-[calc(100%+1rem)] cursor-pointer items-center justify-between gap-5 rounded-lg px-2 hover:bg-gray-200'
                                    >
                                        <div className='flex w-full flex-col'>
                                            <cap className='font-bold'>{trend.topic}</cap>
                                            <overline className=''>
                                                {trend.postCount < 1000
                                                    ? trend.postCount
                                                    : trend.postCount / 1000 + 'k'}{' '}
                                                posts
                                            </overline>
                                        </div>
                                        <button className='option-button'>
                                            <Icon name='Ellipsis' width={24} height={24} />
                                        </button>
                                    </a>
                                )
                        )}
                        <button className='w-fit'>
                            <overline className='text-blue-700'>See more</overline>
                        </button>
                    </div>
                </RightBarElement>
                <RightBarElement title='Contacts'>
                    <div className='flex flex-col gap-4 rounded-xl p-4 shadow-md'>
                        {FriendList.map(
                            (person, index) =>
                                index < maxContacts && (
                                    <a
                                        key={person.id}
                                        className='friend-tag flex w-full cursor-pointer justify-between gap-5 rounded-l-3xl rounded-r-lg hover:bg-gray-200'
                                    >
                                        <div className='flex w-full items-center gap-3'>
                                            <div className='relative h-fit w-fit'>
                                                <Image
                                                    src={person.profilePic}
                                                    alt={'Avatar of ' + person.name}
                                                    width={40}
                                                    height={40}
                                                    className='rounded-full'
                                                />
                                                {person.isOnline && (
                                                    <div className='online-circle absolute bottom-0 right-0 box-border h-4 w-4 translate-x-[20%] translate-y-[20%] rounded-full border-[2px] bg-green-600' />
                                                )}
                                            </div>
                                            <subtitle2 className='font-bold text-gray-700'>{person.name}</subtitle2>
                                        </div>
                                    </a>
                                )
                        )}
                        <div className='flex-center'>
                            <button className='w-fit'>
                                <overline className='text-blue-700'>See more</overline>
                            </button>
                        </div>
                    </div>
                </RightBarElement>
            </div>
        </div>
    );
};

type ConnectPageWithLayout = React.FC<{children: React.ReactNode}> & {
    getLayout?: (page: React.ReactElement) => React.ReactElement;
};

const ConnectPage: ConnectPageWithLayout = ({children}) => {
    return (
        <div id='connect' className='w-full flex gap-10'>
            <MainContent>{children}</MainContent>
            <RightBarContent />
        </div>
    );
};

export default function ConnectLayout({children}: {children: React.ReactNode}) {
    return (
        <div className='bg-gray-50'>
            <div className='container'>
                <div className='w-full flex min-h-screen px-10 pb-8'>
                    <ConnectPage children={children} />
                </div>
            </div>
        </div>
    );
}
