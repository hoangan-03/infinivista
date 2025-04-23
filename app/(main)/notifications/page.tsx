import React from 'react';

function NotificationsPage() {
    return (
        <div className='relative flex justify-center px-10 py-4'>
            <div className='w-4/5'>
                <div className='sticky top-0 z-20 flex h-[3.875rem] w-full items-center justify-between bg-white py-8'>
                    <h5 className='font-extrabold text-blue-700'>Notifications</h5>
                </div>
                <div className='space-y-4 px-4'>
                    {Array.from({length: 10}).map((_, index) => (
                        <div key={index} className='h-16 rounded-md border border-slate-500'>
                            Hi
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default NotificationsPage;
