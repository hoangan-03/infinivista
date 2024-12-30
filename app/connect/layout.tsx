'use client';

import React from 'react';

import Image from 'next/image';
import ConnectNavbar from './components/ConnectNavbar';
import {cn} from '@/lib/utils';
import Button from './components/Button';

import SuggestionList from './mockData/suggestionList';
import TrendingList from './mockData/trendingList';
import {Icon} from '@/components/commons';

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
    const [maxSuggestions, setMaxSuggestions] = React.useState<number>(3);
    const [maxTrending, setMaxTrending] = React.useState<number>(3);
    return (
        <div
            id='right-bar'
            className='custom-scrollbar-hidden sticky top-0 z-20 box-border h-[calc(100vh-2rem)] flex-1 justify-between overflow-y-auto pt-8'
        >
            <div id='rightbar-content' className='grid h-full grid-rows-3 gap-5'>
                <RightBarElement title='Suggestions'>
                    <div className='flex flex-col gap-3'>
                        {SuggestionList.map(
                            (person, index) =>
                                index < 2 && (
                                    <div key={person.id} className='friend-tag flex w-full justify-between gap-5'>
                                        <div className='flex w-full items-center gap-3'>
                                            <Image
                                                src={person.profilePic}
                                                alt={'Avatar of ' + person.name}
                                                width={40}
                                                height={40}
                                                className='rounded-full'
                                            />
                                            <cap className='font-semibold text-gray-700'>{person.name}</cap>
                                        </div>
                                        <Button className='add-friend-button'>
                                            <cap>Add Friend</cap>
                                        </Button>
                                    </div>
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
                                index < 2 && (
                                    <div key={trend.id} className='friend-tag flex w-full justify-between items-center gap-5'>
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
                                    </div>
                                )
                        )}
                        <button className='w-fit'>
                            <overline className='text-blue-700'>See more</overline>
                        </button>
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
        <div id='connect' className='flex gap-10'>
            <MainContent>{children}</MainContent>
            <RightBarContent />
        </div>
    );
};

export default function ConnectLayout({children}: {children: React.ReactNode}) {
    return (
        <div className='bg-gray-50'>
            <div className='container'>
                <div className='flex min-h-screen'>
                    <aside className='z-50 w-[250px] bg-gray-700'>Sidebar</aside>
                    <main className='w-[calc(100%-250px)] bg-white px-10 pb-8'>
                        <ConnectPage children={children} />
                    </main>
                </div>
            </div>
        </div>
    );
}
