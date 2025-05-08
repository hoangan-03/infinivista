'use client';

import Image from 'next/image';
import {useEffect, useState} from 'react';

import {Icon} from '@/components/commons';
import {Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from '@/components/ui';
import {useWebRTCContext} from '@/context';
import {useGetProfileInfo} from '@/hooks';
import {MESSAGE_TARGET_TYPE} from '@/modules/common.enum';
import {useGetInfiniteFriends} from '@/modules/friend/friend.swr';
import {useGetInfiniteGroupChats} from '@/modules/groupchat/groupchat.swr';
import placeholderImage from '@/public/assets/images/placeholder.png';

import {CallSection, GroupsSection, MessageSectionGroup, MessageSectionUser, UsersSection} from './_components';

export default function CommunicationPage() {
    // const [isCalling] = useState<boolean>(true);
    const {userId: currentUserId} = useGetProfileInfo();

    const {isCalling, startCall} = useWebRTCContext();
    const [currentTargetId, setCurrentTargetId] = useState<string | undefined>(undefined);
    const [currentTargetType, setCurrentTargetType] = useState<MESSAGE_TARGET_TYPE>(MESSAGE_TARGET_TYPE.USER);

    // ************ DATA FETCHING ************
    const {
        data: friends,
        pagination: paginationFriends,
        size: sizeFriends,
        setSize: setSizeFriends,
        isValidating: isValidatingFriends,
        isLoading: isLoadingFriends,
    } = useGetInfiniteFriends(currentUserId);

    const {
        data: groupChats,
        pagination: paginationGroupChats,
        size: sizeGroupChats,
        setSize: setSizeGroupChats,
        isValidating: isValidatingGroupChats,
        isLoading: isLoadingGroupChats,
    } = useGetInfiniteGroupChats();

    useEffect(() => {
        if (friends && friends.length > 0 && currentTargetId === undefined) {
            setCurrentTargetId(friends[0].id);
            setCurrentTargetType(MESSAGE_TARGET_TYPE.USER);
        }
    }, [friends, currentTargetId]);

    return (
        <div className='flex gap-10'>
            <div className='w-3/4'>
                <div className='mb-2 flex items-center justify-between'>
                    <div className='flex'>
                        <Image
                            src={placeholderImage}
                            alt='User Avatar'
                            width={40}
                            height={40}
                            className='rounded-full bg-transparent'
                        />
                        <Image
                            src={placeholderImage}
                            alt='User Avatar'
                            width={40}
                            height={40}
                            className='-translate-x-4 transform rounded-full bg-none'
                        />
                        <Image
                            src={placeholderImage}
                            alt='User Avatar'
                            width={40}
                            height={40}
                            className='-translate-x-8 transform rounded-full bg-none'
                        />
                    </div>
                    <div>
                        <p className='text-paragraph2'>Capstone Project Team</p>
                        <p className='text-caption text-gray-500'>last seen 12 minutes ago</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        {!isCalling && currentTargetType !== MESSAGE_TARGET_TYPE.GROUP && (
                            <Button variant='icon' size='icon'>
                                <Icon
                                    name='phone'
                                    className='rotate-[-45deg] group-hover:text-primary'
                                    width={20}
                                    height={20}
                                    onClick={() => {
                                        if (currentTargetId) {
                                            startCall(currentTargetId, currentTargetType);
                                        }
                                    }}
                                />
                            </Button>
                        )}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild className='outline-none ring-0 focus-visible:ring-0'>
                                <Button variant='icon' size='icon'>
                                    <Icon name='more' width={15} height={15} />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent alignOffset={16}>
                                <DropdownMenuItem>Settings</DropdownMenuItem>
                                <DropdownMenuItem>Invite Member</DropdownMenuItem>
                                <DropdownMenuItem>Leave Group</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
                {!isCalling && currentTargetType === MESSAGE_TARGET_TYPE.USER && (
                    <MessageSectionUser targetId={currentTargetId} />
                )}
                {!isCalling && currentTargetType === MESSAGE_TARGET_TYPE.GROUP && (
                    <MessageSectionGroup targetId={currentTargetId} />
                )}
                {isCalling && <CallSection />}
            </div>
            <div className='w-1/4 space-y-4 pr-2'>
                <UsersSection
                    friends={friends}
                    pagination={paginationFriends}
                    size={sizeFriends}
                    setSize={setSizeFriends}
                    isValidating={isValidatingFriends}
                    isLoading={isLoadingFriends}
                    setCurrentTargetType={setCurrentTargetType}
                    setCurrentTargetId={setCurrentTargetId}
                />
                <GroupsSection
                    groups={groupChats}
                    pagination={paginationGroupChats}
                    size={sizeGroupChats}
                    setSize={setSizeGroupChats}
                    isValidating={isValidatingGroupChats}
                    isLoading={isLoadingGroupChats}
                    setCurrentTargetType={setCurrentTargetType}
                    setCurrentTargetId={setCurrentTargetId}
                />
            </div>
        </div>
    );
}
