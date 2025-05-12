import Image from 'next/image';
import useSWR from 'swr';

import {cn, getTimeStamp} from '@/lib/utils';
import {MESSAGE_TARGET_TYPE} from '@/modules/common.enum';
import {IFriend} from '@/modules/friend/friend.interface';
import {MESSAGE_TYPE} from '@/modules/message/message.enum';
import {MessageService} from '@/modules/message/message.service';
import {useGetProfileById} from '@/modules/profile/profile.swr';
import placeholderImage from '@/public/assets/images/placeholder.png';

interface Props {
    friend: IFriend;
    className?: string;
    setCurrentTargetType: (targetType: MESSAGE_TARGET_TYPE) => void;
    setCurrentTargetId: (targetId: string) => void;
}

function useGetLatestMessage(friendId?: string) {
    const {data, error, isLoading} = useSWR(
        friendId ? {key: MessageService.ROUTES.messages(friendId), pagination: {page: 1, limit: 1}} : null,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        async ({key, pagination}) => {
            const response = await MessageService.getMessages({
                targetId: friendId as string,
                pagination: pagination,
            });
            return response.data[0] || null;
        },
        {
            revalidateOnFocus: false,
            revalidateIfStale: false,
        }
    );

    return {
        latestMessage: data,
        error,
        isLoading,
    };
}

export const UserItem: React.FC<Props> = ({friend, className, setCurrentTargetType, setCurrentTargetId}) => {
    const {data: profile} = useGetProfileById(friend.id);
    const {latestMessage} = useGetLatestMessage(friend.id);

    // Lấy tin nhắn mới nhất
    const messageText = latestMessage
        ? latestMessage.type === MESSAGE_TYPE.MESSAGE
            ? latestMessage.messageText
            : 'Sent an attachment'
        : 'Start a conversation';

    // Lấy thời gian tin nhắn gần nhất
    const messageTime = latestMessage ? getTimeStamp(latestMessage.sent_at) : '';

    return (
        <div
            className={cn('flex cursor-pointer gap-4 rounded-md p-2 hover:bg-sky-200', className)}
            onClick={() => {
                setCurrentTargetType(MESSAGE_TARGET_TYPE.USER);
                setCurrentTargetId(friend.id);
            }}
        >
            <div className='relative h-12 w-12 overflow-hidden rounded-lg'>
                <Image
                    src={profile?.profileImageUrl || placeholderImage}
                    alt='User Avatar'
                    width={48}
                    height={48}
                    className='absolute inset-0 h-full w-full rounded-lg object-cover'
                />
            </div>
            <div className='flex-grow'>
                <div className='flex justify-between'>
                    <p>{friend.username}</p>
                    {messageTime && <p className='text-[14px] text-gray-500'>{messageTime}</p>}
                </div>
                <p className='max-w-[150px] truncate text-[14px] text-gray-600'>{messageText}</p>
            </div>
        </div>
    );
};
