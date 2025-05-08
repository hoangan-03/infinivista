'use client';

import {toast} from 'react-toastify';

import {Avatar} from '@/components/commons';
import {Button} from '@/components/ui';
import {IFriendRequest, IFriendRequestStatus} from '@/modules/friend/friend.interface';
import {FriendService} from '@/modules/friend/friend.service';
import {useGetProfileById} from '@/modules/profile/profile.swr';

interface Props {
    request?: IFriendRequest;
    mutate?: () => void;
}

export const FriendRequest: React.FC<Props> = ({request, mutate}) => {
    const {data: friendProfile} = useGetProfileById(request?.sender_id);

    const handleAcceptFriendRequest = async (accept: boolean) => {
        if (!request) return;
        try {
            const payload: IFriendRequestStatus = {
                accept,
            };
            await FriendService.acceptFriendRequest({requestId: request?.id, payload});
            mutate?.();
            toast.success('Friend request accepted successfully!');
        } catch (error) {
            console.error('Error accepting friend request:', error);
            toast.error('Failed to accept friend request.');
        }
    };

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
                <Button variant='cancel' onClick={() => handleAcceptFriendRequest(false)}>
                    Cancel
                </Button>
                <Button onClick={() => handleAcceptFriendRequest(true)}>Accept</Button>
            </div>
        </div>
    );
};
