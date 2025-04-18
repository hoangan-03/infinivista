import React from 'react';

import {Icon} from '@/components/commons';
// import {IconProps} from '@/components/commons/Icon';
import {cn} from '@/lib/utils';
import {INTRODUCTION, Profile} from '@/mock_data/profile';

interface IntroductionSectionProps {
    data: Profile;
    className?: string;
}

const introductionToIcon: Record<INTRODUCTION, string> = {
    [INTRODUCTION.WORK]: 'work',
    [INTRODUCTION.EDUCATION]: 'study',
    [INTRODUCTION.CITY]: 'home',
    [INTRODUCTION.COUNTRY]: 'location',
    [INTRODUCTION.MARRIAGE]: 'love',
};

function introductionToNode(type: INTRODUCTION, value: string) {
    switch (type) {
        case INTRODUCTION.WORK:
            return (
                <>
                    Work at <span className='font-bold text-black'>{value}</span>
                </>
            );
        case INTRODUCTION.EDUCATION:
            return (
                <>
                    Went to <span className='font-bold text-black'>{value}</span>
                </>
            );
        case INTRODUCTION.CITY:
            return (
                <>
                    Lives in <span className='font-bold text-black'>{value}</span>
                </>
            );
        case INTRODUCTION.COUNTRY:
            return (
                <>
                    Comes from <span className='font-bold text-black'>{value}</span>
                </>
            );
        case INTRODUCTION.MARRIAGE:
            return <span className='font-bold text-black'>{value}</span>;
        default:
            return value;
    }
}

export const IntroductionSection: React.FC<IntroductionSectionProps> = ({data, className}) => {
    return (
        <div className={cn('flex h-full w-80 flex-col items-start rounded-3xl bg-white shadow-sm', className)}>
            <div className='h-auto w-52 border-b border-blue-600 pb-4 pl-6 pt-5'>
                <h2 className='text-2xl font-bold text-blue-600'>Introduction</h2>
            </div>
            <div className='flex h-full w-full flex-col items-start justify-start gap-4 px-7 py-6'>
                {data.introduction.map((item, index) => (
                    <div key={index} className='flex flex-row items-center justify-center gap-2'>
                        <Icon name={introductionToIcon[item.type]} className='text-gray-500' />
                        <h2 className='text-base font-medium text-gray-800'>
                            {introductionToNode(item.type, item.value)}
                        </h2>
                    </div>
                ))}
            </div>
        </div>
    );
};
