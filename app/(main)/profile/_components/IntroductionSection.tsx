import React from 'react';

import {Icon} from '@/components/commons';
import {cn} from '@/lib/utils';
import {UserDataType} from '@/mock_data/self';

interface IntroductionSectionProps {
    userObject: UserDataType;
    className?: string;
}

export const IntroductionSection: React.FC<IntroductionSectionProps> = ({userObject, className}) => {
    return (
        <div className={cn('flex h-full w-80 flex-col items-start rounded-3xl bg-white shadow-lg', className)}>
            <div className='h-auto w-52 border-b-2 border-blue-600 py-3 pl-6'>
                <h2 className='text-2xl font-bold text-blue-600'>Introduction</h2>
            </div>
            <div className='flex h-full w-full flex-col items-start justify-start gap-4 px-6 py-3'>
                {userObject.introduction.jobTitles.map((jobTitle, idx) => (
                    <div key={idx} className='flex flex-row items-center justify-center gap-2'>
                        <Icon name='Work' className='text-gray-500' />
                        <h2 className='text-base font-medium'>
                            {jobTitle.job} at {jobTitle.company}
                        </h2>
                    </div>
                ))}

                {userObject.introduction.academic.map((school, idx) => (
                    <div key={idx} className='flex flex-row items-center justify-center gap-2'>
                        <Icon name='Study' className='text-gray-500' />
                        <h2 className='text-base font-medium'>Went to {school}</h2>
                    </div>
                ))}

                {userObject.introduction.city && (
                    <div className='flex flex-row items-center justify-center gap-2'>
                        <Icon name='Home' className='text-gray-500' />
                        <h2 className='text-base font-medium'>Lives in {userObject.introduction.city}</h2>
                    </div>
                )}

                {userObject.introduction.hometown && (
                    <div className='flex flex-row items-center justify-center gap-2'>
                        <Icon name='Locate' className='text-gray-500' />
                        <h2 className='text-base font-medium'>Comes from {userObject.introduction.hometown}</h2>
                    </div>
                )}

                {userObject.introduction.marritalStatus && (
                    <div className='flex flex-row items-center justify-center gap-2'>
                        <Icon name='Love' className='text-gray-500' />
                        <h2 className='text-base font-medium'>{userObject.introduction.marritalStatus}</h2>
                    </div>
                )}
            </div>
        </div>
    );
};
