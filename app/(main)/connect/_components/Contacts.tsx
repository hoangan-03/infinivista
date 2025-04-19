'use client';

import React from 'react';
import {useSelector} from 'react-redux';

import {FriendListItem} from '@/app/(main)/_components';
import {RightBarElement} from '@/components/commons/layout/RightBar';
import {Button} from '@/components/ui';
import {friends} from '@/mock_data/friend';
import {SettingsState} from '@/slices/settingsSlice';

export const Contacts: React.FC = () => {
    const minContacts = useSelector((state: {settings: SettingsState}) => state.settings.minContacts);
    const maxContacts = useSelector((state: {settings: SettingsState}) => state.settings.maxContacts);
    const [displayNumber, setDisplayNumber] = React.useState(0);
    const [expanded, setExpanded] = React.useState(false);
    const [mounted, setMounted] = React.useState(false);

    const handleToggleExpand = () => {
        const newDisplayNumber = expanded ? minContacts : maxContacts;
        setDisplayNumber(Math.min(newDisplayNumber, friends.length));
        setExpanded(!expanded);
    };

    React.useEffect(() => {
        setDisplayNumber(Math.min(minContacts, friends.length));
        setExpanded(false);
        setMounted(true);
    }, [minContacts]);

    return (
        <RightBarElement title='Contacts'>
            <div className='flex flex-col gap-4 rounded-xl p-4 shadow-md'>
                {mounted &&
                    friends
                        .slice(0, displayNumber)
                        .map((friend, index) => <FriendListItem key={index} data={friend} />)}
                <div className='flex-center'>
                    <Button variant='link' size='icon' onClick={handleToggleExpand}>
                        <p className='text-caption'>{!expanded ? 'See more' : 'See less'}</p>
                    </Button>
                </div>
            </div>
        </RightBarElement>
    );
};
