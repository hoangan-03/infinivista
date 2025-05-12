import Image from 'next/image';
import useSWR from 'swr';

import {cn, getTimeStamp} from '@/lib/utils';
import {MESSAGE_TARGET_TYPE} from '@/modules/common.enum';
import {IGroupChat} from '@/modules/groupchat/groupchat.interface';
import {GroupChatService} from '@/modules/groupchat/groupchat.service';
import {useGetGroupChatById} from '@/modules/groupchat/groupchat.swr';
import placeholderImage from '@/public/assets/images/placeholder.png';

interface Props {
    group: IGroupChat;
    className?: string;
    setCurrentTargetId: (targetId: string) => void;
    setCurrentTargetType: (targetType: MESSAGE_TARGET_TYPE) => void;
}

function useGetLatestGroupMessage(groupChatId?: string) {
    const {data, error, isLoading} = useSWR(
        groupChatId
            ? {key: GroupChatService.ROUTES.groupChatMessages(groupChatId), pagination: {page: 1, limit: 1}}
            : null,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        async ({key, pagination}) => {
            const response = await GroupChatService.getGroupChatMessages({
                groupChatId: groupChatId as string,
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

export const GroupItem: React.FC<Props> = ({group, className, setCurrentTargetType, setCurrentTargetId}) => {
    const {data: groupData} = useGetGroupChatById(group.group_chat_id);
    const {latestMessage} = useGetLatestGroupMessage(group.group_chat_id);

    // Lấy tin nhắn mới nhất
    const messageText = latestMessage
        ? `${latestMessage.sender.username}: ${latestMessage.textMessage}`
        : 'Chưa có tin nhắn nào';

    // Lấy thời gian tin nhắn gần nhất
    const messageTime = latestMessage ? getTimeStamp(latestMessage.sent_at) : '';

    return (
        <div
            className={cn('flex cursor-pointer gap-4 rounded-xl p-2 hover:bg-sky-200', className)}
            onClick={() => {
                setCurrentTargetType(MESSAGE_TARGET_TYPE.GROUP);
                setCurrentTargetId(group.group_chat_id);
            }}
        >
            <div className='relative h-12 w-12 overflow-hidden rounded-full'>
                <Image
                    src={groupData?.group_image_url || placeholderImage}
                    alt='Group Avatar'
                    width={48}
                    height={48}
                    className='absolute inset-0 h-full w-full rounded-full object-cover'
                />
            </div>
            <div className='w-4/5'>
                <div className='flex items-center justify-between gap-2'>
                    <p className='max-w-[200px] truncate font-medium'>{group.group_name}</p>
                    {messageTime && <p className='text-[14px] text-gray-500'>{messageTime}</p>}
                </div>
                <div className='flex flex-wrap gap-2'>
                    <p className='max-w-[250px] truncate text-[14px] text-gray-600'>{messageText}</p>
                </div>
            </div>
        </div>
    );
};
