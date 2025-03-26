'use client';

import React, {useEffect} from 'react';
import {Provider, useSelector} from 'react-redux';
import {store} from '@/store';
import {setMaxSuggestions, SettingsState} from '@/slices/settingsSlice';

import Image from 'next/image';
import {cn} from '@/lib/utils';
import Button from '../Button';
import {Icon} from '@/components/commons';

import suggestionList from '@/mock_data/suggestionList';
import trendingList from '@/mock_data/trendingList';
import friendList from '@/mock_data/friendList';

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

const Suggestions: React.FC = () => {
    const minSuggestions = useSelector((state: {settings: SettingsState}) => state.settings.minSuggestions);
    const maxSuggestions = useSelector((state: {settings: SettingsState}) => state.settings.maxSuggestions);
    const [displayNumber, setDisplayNumber] = React.useState(0);
    const [expanded, setExpanded] = React.useState(false);
    const [mounted, setMounted] = React.useState(false);

    const handleToggleExpand = () => {
        const newDisplayNumber = expanded ? minSuggestions : maxSuggestions;
        setDisplayNumber(Math.min(newDisplayNumber, suggestionList.length));
        setExpanded(!expanded);
    };

    useEffect(() => {
        setDisplayNumber(Math.min(minSuggestions, suggestionList.length));
        setExpanded(false);
        setMounted(true);
    }, []);

    return (
        <RightBarElement title='Suggestions'>
            <div className='flex flex-col gap-3'>
                {mounted &&
                    suggestionList.slice(0, displayNumber).map((person) => (
                        <a
                            key={person.username}
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
                    ))}
                <div className='flex-center'>
                    <button className='w-fit' onClick={handleToggleExpand}>
                        <cap className='text-blue-700'>{!expanded ? 'See more' : 'See less'}</cap>
                    </button>
                </div>
            </div>
        </RightBarElement>
    );
};

const Trending: React.FC = () => {
    const minTrending = useSelector((state: {settings: SettingsState}) => state.settings.minTrending);
    const maxTrending = useSelector((state: {settings: SettingsState}) => state.settings.maxTrending);
    const [displayNumber, setDisplayNumber] = React.useState(0);
    const [expanded, setExpanded] = React.useState(false);
    const [mounted, setMounted] = React.useState(false);

    const handleToggleExpand = () => {
        const newDisplayNumber = expanded ? minTrending : maxTrending;
        setDisplayNumber(Math.min(newDisplayNumber, trendingList.length));
        setExpanded(!expanded);
    };

    useEffect(() => {
        setDisplayNumber(Math.min(minTrending, trendingList.length));
        setExpanded(false);
        setMounted(true);
    }, []);

    return (
        <RightBarElement title='Trending'>
            <div className='flex flex-col gap-3'>
                {mounted &&
                    trendingList.slice(0, displayNumber).map((trend) => (
                        <a
                            key={trend.id}
                            className='friend-tag -mx-2 flex w-[calc(100%+1rem)] cursor-pointer items-center justify-between gap-5 rounded-lg px-2 hover:bg-gray-200'
                        >
                            <div className='flex w-full flex-col'>
                                <cap className='font-bold'>{trend.topic}</cap>
                                <overline className=''>
                                    {trend.postCount < 1000 ? trend.postCount : trend.postCount / 1000 + 'k'} posts
                                </overline>
                            </div>
                            <button className='option-button'>
                                <Icon name='Ellipsis' width={24} height={24} />
                            </button>
                        </a>
                    ))}
                <button className='w-fit' onClick={handleToggleExpand}>
                    <cap className='text-blue-700'>{!expanded ? 'See more' : 'See less'}</cap>
                </button>
            </div>
        </RightBarElement>
    );
};

const Contacts: React.FC = () => {
    const minContacts = useSelector((state: {settings: SettingsState}) => state.settings.minContacts);
    const maxContacts = useSelector((state: {settings: SettingsState}) => state.settings.maxContacts);
    const [displayNumber, setDisplayNumber] = React.useState(0);
    const [expanded, setExpanded] = React.useState(false);
    const [mounted, setMounted] = React.useState(false);

    const handleToggleExpand = () => {
        const newDisplayNumber = expanded ? minContacts : maxContacts;
        setDisplayNumber(Math.min(newDisplayNumber, friendList.length));
        setExpanded(!expanded);
    };

    useEffect(() => {
        setDisplayNumber(Math.min(minContacts, friendList.length));
        setExpanded(false);
        setMounted(true);
        console.log(minContacts);
    }, []);

    return (
        <RightBarElement title='Contacts'>
            <div className='flex flex-col gap-4 rounded-xl p-4 shadow-md'>
                {mounted &&
                    friendList.slice(0, displayNumber).map((person) => (
                        <a
                            key={person.username}
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
                    ))}
                <div className='flex-center'>
                    <button className='w-fit' onClick={handleToggleExpand}>
                        <cap className='text-blue-700'>{!expanded ? 'See more' : 'See less'}</cap>
                    </button>
                </div>
            </div>
        </RightBarElement>
    );
};

const RightBarContent: React.FC = () => {
    return (
        <div
            id='right-bar'
            className='custom-scrollbar-hidden //flex-1 sticky bottom-0 top-0 z-20 -mx-4 -mb-8 h-screen justify-between overflow-y-auto px-4 py-8'
        >
            <div id='rightbar-content' className='flex h-fit flex-col gap-5'>
                <Suggestions />
                <Trending />
                <Contacts />
            </div>
        </div>
    );
};

const RightBar = () => {
    return (
        <Provider store={store}>
            <RightBarContent />
        </Provider>
    );
};

export default RightBar;
