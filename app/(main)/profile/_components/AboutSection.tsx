import React from 'react';

import {ScrollArea} from '@/components/ui';
import {IProfile} from '@/modules/profile/profile.interface';
import {useGetProfileBiography} from '@/modules/profile/profile.swr';

interface Props {
    profile?: IProfile;
}

export const AboutSection: React.FC<Props> = ({profile}) => {
    // TODO: Get profile biography by id when API is ready
    console.log('USE THE PROFILE', profile);
    const {data: biography} = useGetProfileBiography();

    return (
        <div className='flex gap-8 rounded-lg bg-white py-6 pr-6 shadow-sm'>
            <div className='w-52 self-start border-b border-blue-600 pb-3'>
                <h2 className='ml-6 text-[28px] font-bold text-blue-600'>About</h2>
            </div>
            <ScrollArea className='max-h-[200px] w-[calc(100%-208px)] flex-grow'>
                <p className='text-justify text-gray-700'>{biography}</p>
            </ScrollArea>
        </div>
    );
};
