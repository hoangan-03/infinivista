import Image from 'next/image';

import {Icon} from '@/components/commons';
import {cn} from '@/lib/utils';
import {Story} from '@/mock_data/story';

interface Props {
    width: 1 | 2 | 3;
    height: 1 | 2 | 3;
    data?: Story; // TODO: change to interface Story once API is ready
    onClick?: () => void;
}

// Create column span class based on width prop
const getColSpanClass = (width: number) => {
    if (width === 1) return 'col-span-1';
    if (width === 2) return 'col-span-2';
    if (width === 3) return 'col-span-3';
    return 'col-span-1'; // Default fallback
};

// Create row span class based on height prop
const getRowSpanClass = (height: number) => {
    if (height === 1) return 'row-span-1';
    if (height === 2) return 'row-span-2';
    if (height === 3) return 'row-span-3';
    return 'row-span-1'; // Default fallback
};

// Get sizes attribute for responsive images
const getImageSizes = (width: number) => {
    if (width === 3) return '100vw';
    if (width === 2) return '66vw';
    return '33vw';
};

function StoryCard({width, height, data, onClick}: Props) {
    return (
        <div
            className={cn(
                'group relative cursor-pointer overflow-hidden',
                getColSpanClass(width),
                getRowSpanClass(height)
            )}
            onClick={onClick}
        >
            <Image
                // src='/assets/images/bg_placeholder.jpg'
                src={data?.image || '/assets/images/bg_placeholder.jpg'}
                alt=''
                fill
                sizes={getImageSizes(width)}
                className='object-cover transition-transform duration-200 group-hover:scale-105'
                priority={width === 2 && height === 2}
            />

            <div className='absolute inset-0 bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-60' />

            <div className='absolute inset-0 flex items-center justify-center gap-4 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
                <div className='flex items-center justify-between gap-2'>
                    <p className='text-white'>188K</p>
                    <Icon name='Like_filled' className='text-white' />
                </div>
                <div className='flex items-center justify-between gap-2'>
                    <p className='text-white'>23K</p>
                    <Icon name='Comment_filled' className='text-white' />
                </div>
            </div>
        </div>
    );
}

export default StoryCard;
