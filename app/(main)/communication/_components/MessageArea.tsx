import Image from 'next/image';

import placeholderImage from '@/public/assets/images/placeholder.png';
import {cn} from '@/lib/utils';

interface MessageAreaProps {
    username: string;
    role: string;
    message: string;
    time: Date;
    isCurrentUser?: boolean;
    showAvatar?: boolean;
    className?: string;
}

export const MessageArea: React.FC<MessageAreaProps> = ({
    username,
    role,
    message,
    time,
    isCurrentUser = false,
    showAvatar = false,
    className,
}) => {
    const formattedTime = time.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', hour12: true});
    return (
        <div className={cn('flex gap-2', className)}>
            {!isCurrentUser && showAvatar && (
                <div className='relative h-8 w-8 overflow-hidden rounded-full'>
                    <Image src={placeholderImage} alt='User Placeholder' width={32} height={32} />
                </div>
            )}
            <div className={cn('w-full rounded-sm px-2 py-1', isCurrentUser ? 'bg-primary' : 'bg-gray-100')}>
                {!isCurrentUser && (
                    <div className='flex items-center gap-3'>
                        <p className='text-black'>{username}</p>
                        <p className='text-caption text-gray-500'>{role}</p>
                    </div>
                )}
                <p className={cn(isCurrentUser ? 'text-white' : 'text-black', 'w-[90%] text-justify text-[14px]')}>
                    {message}
                </p>
                <p className={cn(isCurrentUser ? 'text-white' : 'text-gray-500', 'text-right text-[12px]')}>
                    {formattedTime}
                </p>
            </div>
            {isCurrentUser && showAvatar && (
                <div className='relative h-8 w-8 overflow-hidden rounded-full'>
                    <Image src={placeholderImage} alt='User Placeholder' width={32} height={32} />
                </div>
            )}
        </div>
    );
};
