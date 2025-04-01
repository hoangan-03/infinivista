'use client';

import Image from 'next/image';
import React from 'react';
import {useSelector} from 'react-redux';

import {RightBarElement} from '@/components/commons/layout/RightBar';
import {Button} from '@/components/ui';
import suggestionList from '@/mock_data/suggestionList';
import {SettingsState} from '@/slices/settingsSlice';

export const Suggestions: React.FC = () => {
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

    React.useEffect(() => {
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
