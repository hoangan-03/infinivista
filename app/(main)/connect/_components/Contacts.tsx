'use client';

import React, {useEffect, useState} from 'react';

import {FriendListItem} from '@/app/(main)/_components';
import {Button} from '@/components/ui';
import {connectSidebarConfig} from '@/constants/common';
import {friends} from '@/mock_data/friend';

const minContacts = connectSidebarConfig.contacts.min;
const maxContacts = connectSidebarConfig.contacts.max;

export const Contacts: React.FC = () => {
    const [displayNumber, setDisplayNumber] = useState<number>(0);
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const [mounted, setMounted] = useState<boolean>(false);

    const handleToggleExpand = () => {
        const newDisplayNumber = isExpanded ? minContacts : maxContacts;
        setDisplayNumber(Math.min(newDisplayNumber, friends.length));
        setIsExpanded(!isExpanded);
    };

    useEffect(() => {
        setDisplayNumber(Math.min(minContacts, friends.length));
        setIsExpanded(false);
        setMounted(true);
    }, []);

    return (
        <div className='flex flex-col gap-4 rounded-xl p-4 shadow-md'>
            {mounted &&
                friends.slice(0, displayNumber).map((friend, index) => <FriendListItem key={index} data={friend} />)}
            <div className='flex-center'>
                <Button variant='link' size='icon' onClick={handleToggleExpand}>
                    <p className='text-caption'>{!isExpanded ? 'See more' : 'See less'}</p>
                </Button>
            </div>
        </div>
    );
};
