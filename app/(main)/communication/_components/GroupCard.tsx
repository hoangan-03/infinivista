import Image from 'next/image';

import {cn} from '@/lib/utils';
import placeholderImage from '@/public/assets/images/placeholder.png';

interface GroupCardProps {
    name: string;
    tag1: string;
    tag2?: string;
    lastActive: number;
    className?: string;
    onClick?: () => void;
}

export const GroupCard: React.FC<GroupCardProps> = ({name, tag1, tag2, lastActive, className, onClick}) => {
    return (
        <div
            className={cn('flex cursor-pointer gap-4 rounded-xl bg-blue-200 p-3 hover:bg-blue-300', className)}
            onClick={onClick}
        >
            <div className='relative h-12 w-12 overflow-hidden rounded-full'>
                <Image
                    src={placeholderImage}
                    alt='User Avatar'
                    width={48}
                    height={48}
                    className='absolute inset-0 h-full w-full rounded-full'
                />
            </div>
            <div className='flex-grow'>
                <div className='flex items-center justify-between gap-2'>
                    <p className='max-w-[140px] truncate font-bold'>{name}</p>
                    <p className='text-[14px] text-gray-500'>{lastActive}m</p>
                </div>
                <div className='flex gap-2'>
                    <div className='rounded-lg bg-orange-100 px-2 py-[2px]'>
                        <p className='text-[12px] text-orange-600'>{tag1}</p>
                    </div>
                    {tag2 && (
                        <div className='rounded-lg bg-green-200 px-2 py-[2px]'>
                            <p className='text-[12px] text-green-600'>{tag2}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
