'use client';

import Image from 'next/image';
import React, {useEffect} from 'react';
import {Provider, useSelector} from 'react-redux';

import FriendListItem from '@/app/(main)/_components/FriendListItem';
import IconButton from '@/components/commons/IconButton';
import {Button} from '@/components/ui';
import {cn} from '@/lib/utils';
import friendList from '@/mock_data/friendList';
import suggestionList from '@/mock_data/suggestionList';
import trendingList from '@/mock_data/trendingList';
import {SettingsState} from '@/slices/settingsSlice';
import {store} from '@/store';

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
    }, [minSuggestions]);

    return (
        <RightBarElement title='Suggestions'>
            <div className='flex flex-col gap-3'>
                {mounted &&
                    suggestionList.slice(0, displayNumber).map((person) => (
                        <a
                            key={person.username}
                            className='friend-tag flex w-full cursor-pointer items-center justify-between gap-5 rounded-full p-1 hover:bg-gray-200'
                        >
                            <div className='flex w-full items-center gap-3'>
                                <Image
                                    src={person.profilePic}
                                    alt={'Avatar of ' + person.name}
                                    width={40}
                                    height={40}
                                    className='rounded-full'
                                />
                                <p className='text-caption font-bold text-gray-700'>{person.name}</p>
                            </div>
                            <Button variant='iconDefault' className='add-friend-button h-fit p-2'>
                                <p className='text-caption'>Add friend</p>
                            </Button>
                        </a>
                    ))}
                <div className='flex-center'>
                    <Button variant='link' size='icon' onClick={handleToggleExpand}>
                        <p className='text-caption'>{!expanded ? 'See more' : 'See less'}</p>
                    </Button>
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
    }, [minTrending]);

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
                                <p className='text-caption font-bold'>{trend.topic}</p>
                                <p className='text-overline'>
                                    {trend.postCount < 1000 ? trend.postCount : trend.postCount / 1000 + 'k'} posts
                                </p>
                            </div>
                            <IconButton label='More options' defaultName='More' />
                        </a>
                    ))}
                <Button variant='link' size='icon' onClick={handleToggleExpand}>
                    <p className='text-caption'>{!expanded ? 'See more' : 'See less'}</p>
                </Button>
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
        // console.log(minContacts);
    }, [minContacts]);

    return (
        <RightBarElement title='Contacts'>
            <div className='flex flex-col gap-4 rounded-xl p-4 shadow-md'>
                {mounted &&
                    friendList
                        .slice(0, displayNumber)
                        .map((person) => (
                            <FriendListItem
                                key={person.username}
                                username={person.username}
                                name={person.name}
                                profilePic={person.profilePic}
                                isOnline={person.isOnline}
                            />
                        ))}
                <div className='flex-center'>
                    <Button variant='link' size='icon' onClick={handleToggleExpand}>
                        <p className='text-caption'>{!expanded ? 'See more' : 'See less'}</p>
                    </Button>
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
