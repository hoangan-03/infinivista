import React from 'react';

import {Avatar, Icon} from '@/components/commons';
import {Button, Input} from '@/components/ui';

function NotificationsPage() {
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
                    {Array.from({length: 10}).map((_, index) => (
                        <div
                            key={index}
                            className='space-y-2 rounded-md border border-slate-500 bg-slate-100 p-2 hover:bg-slate-200'
                        >
                            <div className='flex justify-between'>
                                <div className='flex w-4/5 items-center gap-4 break-words'>
                                    <div className='size-8'>
                                        <Avatar />
                                    </div>
                                    <p>
                                        <span className='font-bold'>John McJohn</span> wants to send a friend request
                                    </p>
                                </div>
                                <p className='text-sm text-slate-500'>5 minutes ago</p>
                            </div>
                            <div className='flex items-center justify-end gap-6'>
                                <Button variant='cancel'>Cancel</Button>
                                <Button>Accept</Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default NotificationsPage;
