import Image from 'next/image';

import {cn} from '@/lib/utils';
import {IFriend} from '@/modules/friend/friend.interface';
import placeholderImage from '@/public/assets/images/placeholder.png';

import {MESSAGE_TARGET_TYPE} from '../page';

interface Props {
    friend: IFriend;
    className?: string;
    setCurrentTargetType: (targetType: MESSAGE_TARGET_TYPE) => void;
    setCurrentTargetId: (targetId: string) => void;
}

export const UserItem: React.FC<Props> = ({friend, className, setCurrentTargetType, setCurrentTargetId}) => {
    return (
        <div
            className={cn('flex cursor-pointer gap-4 rounded-md p-1 hover:bg-gray-100', className)}
            onClick={() => {
                setCurrentTargetType(MESSAGE_TARGET_TYPE.USER);
                setCurrentTargetId(friend.id);
            }}
        >
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
                    <p>{friend.username}</p>
                    {/* TODO: last active */}
                    <p className='text-[14px] text-gray-500'>30m</p>
                </div>
                {/* TODO: Friend message */}
                <p className='max-w-[150px] truncate text-[14px]'>Hi nice to meet you</p>
            </div>
        </div>
    );
};
