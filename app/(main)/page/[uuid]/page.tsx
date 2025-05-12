'use client';

import React from 'react';

import {useGetPageById} from '@/modules/page/page.swr';

import {AboutSection, FollowersSection, MainSection, ProfileCard} from '../_components';

const PageInfoPage: React.FC<{params: {uuid: string}}> = ({params}) => {
    const {data: page} = useGetPageById(params.uuid);

    return (
        <div className='flex min-h-screen flex-col bg-gray-100'>
            <div className='flex flex-col px-6 pt-6'>
                <div className='mb-6 flex h-[27.5rem] items-center gap-4'>
                    <ProfileCard page={page} className='w-full' />
                </div>

                <AboutSection page={page} />

                <div className='flex gap-4 py-6'>
                    <FollowersSection page={page} className='flex-1 self-start' />
                    <MainSection page={page} className='flex-3' />
                </div>
            </div>
        </div>
    );
};

export default PageInfoPage;
