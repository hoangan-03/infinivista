import React from 'react';

import {ScrollArea} from '@/components/ui';
// import {IconProps} from '@/components/commons/Icon';
import {cn} from '@/lib/utils';
import {IProfile} from '@/modules/profile/profile.interface';
import {useGetProfileUserEvents} from '@/modules/profile/profile.swr';

interface IntroductionSectionProps {
    profile?: IProfile;
    className?: string;
}

export const IntroductionSection: React.FC<IntroductionSectionProps> = ({profile, className}) => {
    const {data: userEvents} = useGetProfileUserEvents(profile?.id);

    return (
        <ScrollArea
            className={cn(
                'relative flex h-[27.5rem] w-80 flex-col items-start rounded-3xl bg-white shadow-sm',
                className
            )}
        >
            <div className='h-auto w-52 border-b border-blue-600 pb-4 pl-6 pt-5'>
                <h2 className='text-2xl font-bold text-blue-600'>Introduction</h2>
            </div>
            <div className='flex h-full w-full flex-col items-start justify-start gap-4 px-7 py-6'>
                {userEvents?.map((userEvent, index) => (
                    <h2 className='text-base font-medium text-gray-800' key={index}>
                        {userEvent}
                    </h2>
                ))}
            </div>
        </ScrollArea>
    );
};
