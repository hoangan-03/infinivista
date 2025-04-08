import Image from 'next/image';

import {cn} from '@/lib/utils';
import placeholderImage from '@/public/assets/images/placeholder.png';

interface MessageUserCardProps {
    name: string;
    message: string;
    lastActive: number;
    className?: string;
    onClick?: () => void;
}

export const MessageUserCard: React.FC<MessageUserCardProps> = ({name, message, lastActive, className, onClick}) => {
    return (
        <div className={cn('flex cursor-pointer gap-4 rounded-md p-1 hover:bg-gray-100', className)} onClick={onClick}>
            <div className='relative h-12 w-12 overflow-hidden rounded-lg'>
                <Image
                    src={placeholderImage}
                    alt='User Avatar'
                    width={48}
                    height={48}
                    className='absolute inset-0 h-full w-full rounded-lg'
                />
            </div>
            <div className='flex-grow'>
                <div className='flex justify-between'>
                    <p>{name}</p>
                    <p className='text-[14px] text-gray-500'>{lastActive}m</p>
                </div>
                <p className='max-w-[150px] truncate text-[14px]'>{message}</p>
            </div>
        </div>
    );
};
