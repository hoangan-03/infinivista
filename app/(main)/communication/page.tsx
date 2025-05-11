/* eslint-disable react/jsx-no-undef */
'use client';

import Image from 'next/image';
import {useEffect, useState} from 'react';

import {Icon} from '@/components/commons';
import {Button} from '@/components/ui';
import {useWebRTCContext} from '@/context';
import {useGetProfileInfo} from '@/hooks';
import {CallingService} from '@/modules/calling/calling.service';
import {useCallHistory} from '@/modules/calling/calling.swr';
import {MESSAGE_TARGET_TYPE} from '@/modules/common.enum';
import {useGetInfiniteFriends} from '@/modules/friend/friend.swr';
import {useGetGroupChatById, useGetInfiniteGroupChats} from '@/modules/groupchat/groupchat.swr';
import {useGetProfileById} from '@/modules/profile/profile.swr';

import {CallSection, GroupsSection, MessageSectionGroup, MessageSectionUser, UsersSection} from './_components';

// Ảnh mặc định khi không có ảnh
const placeholderImage = '/assets/images/placeholder-avatar.png';

export default function CommunicationPage() {
    const callingService = new CallingService();
    const {userId: currentUserId} = useGetProfileInfo();

    const {isCalling, startCall} = useWebRTCContext();
    const [currentTargetId, setCurrentTargetId] = useState<string | undefined>(undefined);
    const [currentTargetType, setCurrentTargetType] = useState<MESSAGE_TARGET_TYPE>(MESSAGE_TARGET_TYPE.USER);

    // Lấy lịch sử cuộc gọi
    const {callHistory, isLoading: isLoadingCallHistory} = useCallHistory({page: 1, limit: 10});

    // Chỉ gọi API khi đúng loại đối tượng
    const {data: opponentProfile} = useGetProfileById(
        currentTargetType === MESSAGE_TARGET_TYPE.USER ? currentTargetId : undefined
    );

    const {data: opponentGroupProfile} = useGetGroupChatById(
        currentTargetType === MESSAGE_TARGET_TYPE.GROUP ? currentTargetId : undefined
    );

    // Xử lý bắt đầu cuộc gọi
    const handleStartCall = async (targetId: string) => {
        if (targetId) {
            try {
                startCall(targetId, currentTargetType);
            } catch (error) {
                console.error('Lỗi khi bắt đầu cuộc gọi:', error);
            }
        }
    };

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

    useEffect(() => {
        if (groupChats && groupChats.length > 0 && currentTargetId === undefined) {
            setCurrentTargetId(groupChats[0].group_chat_id);
            setCurrentTargetType(MESSAGE_TARGET_TYPE.GROUP);
        }
    }, [groupChats, currentTargetId]);

    return (
        <div className='flex gap-3'>
            <div className='w-[70%]'>
                <div className={'mx-5 mb-2 flex h-[6vh] items-center justify-between'}>
                    <div className='flex flex-row items-center justify-start'>
                        <Image
                            src={
                                currentTargetType === MESSAGE_TARGET_TYPE.GROUP
                                    ? opponentGroupProfile?.group_image_url || placeholderImage
                                    : opponentProfile?.profileImageUrl || placeholderImage
                            }
                            alt='User Avatar'
                            width={40}
                            height={40}
                            className='-translate-x-4 transform rounded-full bg-none'
                        />

                        <p className='text-2xl font-bold'>
                            {currentTargetType === MESSAGE_TARGET_TYPE.USER
                                ? opponentProfile?.username
                                : opponentGroupProfile?.group_name}
                        </p>
                        {/* <p className='text-caption text-gray-500'>last seen 12 minutes ago</p> */}
                    </div>
                    <div className='flex items-center gap-2'>
                        {!isCalling && currentTargetType !== MESSAGE_TARGET_TYPE.GROUP && (
                            <Button variant='icon' size='icon' className='rounded-md bg-sky-100'>
                                <div className='flex flex-row items-center gap-2 px-4 py-2'>
                                    <Icon
                                        name='phone'
                                        width={24}
                                        height={24}
                                        onClick={() => {
                                            if (currentTargetId) {
                                                handleStartCall(currentTargetId);
                                            }
                                        }}
                                    />
                                    <span className='font-bold'>Call</span>
                                </div>
                            </Button>
                        )}
                        {/* <DropdownMenu>
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
                        </DropdownMenu> */}
                    </div>
                </div>
                {!isCalling && currentTargetType === MESSAGE_TARGET_TYPE.USER && (
                    <MessageSectionUser targetId={currentTargetId} />
                )}
                {!isCalling && currentTargetType === MESSAGE_TARGET_TYPE.GROUP && (
                    <MessageSectionGroup targetId={currentTargetId} />
                )}
                {isCalling && <CallSection targetType={currentTargetType} />}
            </div>
            <div className='w-[30%] space-y-4 pr-2'>
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
