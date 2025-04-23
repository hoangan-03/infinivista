import Image from 'next/image';

import {Badge} from '@/components/ui';
import {cn} from '@/lib/utils';
import placeholderImage from '@/public/assets/images/placeholder.png';

interface Props {
    name: string;
    // tag1: string;
    // tag2?: string;
    tags: string[];
    lastActive: number;
    className?: string;
    onClick?: () => void;
}

interface BadgeColor {
    text: string;
    background: string;
}

const badgeColors: BadgeColor[] = [
    {
        text: 'text-orange-600',
        background: 'bg-orange-100',
    },
    {
        text: 'text-green-600',
        background: 'bg-green-200',
    },
    {
        text: 'text-blue-600',
        background: 'bg-blue-200',
    },
    {
        text: 'text-red-600',
        background: 'bg-red-200',
    },
    {
        text: 'text-purple-600',
        background: 'bg-purple-200',
    },
    {
        text: 'text-pink-600',
        background: 'bg-pink-200',
    },
];

export const GroupItem: React.FC<Props> = ({name, tags, lastActive, className, onClick}) => {
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
            <div className='w-4/5'>
                <div className='flex items-center justify-between gap-2'>
                    <p className='max-w-[200px] truncate font-bold'>{name}</p>
                    <p className='text-[14px] text-gray-500'>{lastActive}m</p>
                </div>
                <div className='flex flex-wrap gap-2'>
                    {tags.map((tag, index) => (
                        <Badge
                            key={index}
                            variant='none'
                            className={cn(
                                badgeColors[index % badgeColors.length].text,
                                badgeColors[index % badgeColors.length].background
                            )}
                        >
                            {tag}
                        </Badge>
                    ))}
                </div>
            </div>
        </div>
    );
};
