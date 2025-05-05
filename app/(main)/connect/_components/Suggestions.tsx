'use client';

import Image from 'next/image';
import React, {useEffect, useState} from 'react';

import {Button} from '@/components/ui';
import {connectSidebarConfig} from '@/constants/common';
import {suggestions} from '@/mock_data/suggestion';

const minSuggestions = connectSidebarConfig.suggestions.min;
const maxSuggestions = connectSidebarConfig.suggestions.max;

export const Suggestions: React.FC = () => {
    const [displayNumber, setDisplayNumber] = useState<number>(0);
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const [isMounted, setIsMounted] = useState<boolean>(false);

    const handleToggleExpand = () => {
        const newDisplayNumber = isExpanded ? minSuggestions : maxSuggestions;
        setDisplayNumber(Math.min(newDisplayNumber, suggestions.length));
        setIsExpanded(!isExpanded);
    };

    useEffect(() => {
        setDisplayNumber(Math.min(minSuggestions, suggestions.length));
        setIsExpanded(false);
        setIsMounted(true);
    }, []);

    return (
        <div className='flex flex-col gap-3'>
            {isMounted &&
                suggestions.slice(0, displayNumber).map((person) => (
                    <a
                        key={person.username}
                        className='flex w-full cursor-pointer items-center justify-between gap-5 rounded-full p-1 hover:bg-gray-200'
                    >
                        <div className='flex w-full items-center gap-3'>
                            <Image
                                src={person.avatar}
                                alt={'Avatar of ' + person.name}
                                width={40}
                                height={40}
                                className='rounded-full'
                            />
                            <p className='text-caption font-bold text-gray-700'>{person.name}</p>
                        </div>
                        <Button className='h-fit bg-primary p-2 text-slate-50 flex-center hover:bg-slate-900/90'>
                            <p className='text-caption'>Add friend</p>
                        </Button>
                    </a>
                ))}
            <div className='flex-center'>
                <Button variant='link' size='icon' onClick={handleToggleExpand}>
                    <p className='text-caption'>{!isExpanded ? 'See more' : 'See less'}</p>
                </Button>
            </div>
        </div>
    );
};
