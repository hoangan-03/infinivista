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
        <div className={cn('flex h-full w-80 flex-col items-start rounded-3xl bg-white shadow-sm', className)}>
            <div className='h-auto w-52 border-b border-blue-600 pb-4 pl-6 pt-5'>
                <h2 className='text-2xl font-bold text-blue-600'>Introduction</h2>
            </div>
            <div className='flex h-full w-full flex-col items-start justify-start gap-4 px-7 py-6'>
                {userObject.introduction.jobTitles.map((jobTitle, idx) => (
                    <div key={idx} className='flex flex-row items-center justify-center gap-2'>
                        <Icon name='Work' className='text-gray-500' />
                        <h2 className='text-base font-medium text-gray-800'>
                            {jobTitle.job} at <span className='font-bold text-black'>{jobTitle.company}</span>
                        </h2>
                    </div>
                ))}

                {userObject.introduction.academic.map((school, idx) => (
                    <div key={idx} className='flex flex-row items-center justify-center gap-2'>
                        <Icon name='Study' className='text-gray-500' />
                        <h2 className='text-base font-medium text-gray-800'>
                            Went to <span className='font-bold text-black'>{school}</span>
                        </h2>
                    </div>
                ))}

                {userObject.introduction.city && (
                    <div className='flex flex-row items-center justify-center gap-2'>
                        <Icon name='Home' className='text-gray-500' />
                        <h2 className='text-base font-medium text-gray-800'>
                            Lives in <span className='font-bold text-black'>{userObject.introduction.city}</span>
                        </h2>
                    </div>
                )}

                {userObject.introduction.hometown && (
                    <div className='flex flex-row items-center justify-center gap-2'>
                        <Icon name='Locate' className='text-gray-500' />
                        <h2 className='text-base font-medium text-gray-800'>
                            Comes from <span className='font-bold text-black'>{userObject.introduction.hometown}</span>
                        </h2>
                    </div>
                )}

                {userObject.introduction.marritalStatus && (
                    <div className='flex flex-row items-center justify-center gap-2'>
                        <Icon name='Love' className='text-gray-500' />
                        <h2 className='text-base font-bold text-gray-800'>{userObject.introduction.marritalStatus}</h2>
                    </div>
                )}
            </div>
        </div>
    );
};
