'use client';

import {Avatar} from '@/components/commons';
import {Button} from '@/components/ui';
import {IFriendRequest} from '@/modules/friend/friend.interface';
import {useGetProfileById} from '@/modules/profile/profile.swr';

interface Props {
    friendRequest?: IFriendRequest;
}

export const FriendRequest: React.FC<Props> = ({friendRequest}) => {
    const {data: friendProfile} = useGetProfileById(friendRequest?.sender_id);

    return (
        <div className='space-y-2 rounded-md border border-slate-500 bg-slate-100 p-2 hover:bg-slate-200'>
            <div className='flex justify-between'>
                <div className='flex w-4/5 items-center gap-4 break-words'>
                    <div className='size-8'>
                        <Avatar src={friendProfile?.profileImageUrl} />
                    </div>
                    <p>
                        <span className='font-bold'>{friendProfile?.username}</span> wants to send a friend request
                    </p>
                </div>
                <p className='text-sm text-slate-500'>2 hours ago</p>
            </div>
            <div className='flex items-center justify-end gap-6'>
                <Button variant='cancel'>Cancel</Button>
                <Button>Accept</Button>
            </div>
        </div>
    );
};
