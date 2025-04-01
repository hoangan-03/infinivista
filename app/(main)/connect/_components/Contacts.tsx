import React from 'react';
import {useSelector} from 'react-redux';

import {FriendListItem} from '@/app/(main)/_components';
import {RightBarElement} from '@/components/commons/layout/RightBar';
import {Button} from '@/components/ui';
import friendList from '@/mock_data/friendList';
import {SettingsState} from '@/slices/settingsSlice';

export const Contacts: React.FC = () => {
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

    React.useEffect(() => {
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
