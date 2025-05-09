'use client';

import {Icon} from '@/components/commons';
import {Input} from '@/components/ui';
import {useGetInfiniteFriendRequests} from '@/modules/friend/friend.swr';

import {FriendRequest} from './_components';

function NotificationsPage() {
    const {data: friendRequests, mutate} = useGetInfiniteFriendRequests();

    return (
        <div className='relative flex justify-center px-10 py-4'>
            <div className='w-4/5'>
                <div className='sticky top-0 z-20 flex h-[3.875rem] w-full items-center justify-between bg-white pb-10 pt-8'>
                    <h5 className='font-extrabold text-blue-700'>Notifications</h5>
                    <div className='w-4/5'>
                        <Input
                            placeholder='Search'
                            prefixIcon={<Icon name='search' />}
                            className='border border-slate-300'
                        />
                    </div>
                </div>
                <div className='space-y-4 px-4'>
                    {friendRequests.map((request, index) => (
                        <FriendRequest request={request} mutate={mutate} key={index} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default NotificationsPage;
