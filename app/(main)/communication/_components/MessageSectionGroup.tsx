import {Icon, Spinner} from '@/components/commons';
import {Button, ScrollArea, Separator} from '@/components/ui';
import {useGetProfileInfo, useInfiniteScrolling} from '@/hooks';
import {cn} from '@/lib/utils';
import {useGetInfiniteGroupChatMessages} from '@/modules/groupchat/groupchat.swr';

import {MessageItemGroup} from './MessageItemGroup';

interface Props {
    targetId?: string;
}

export const MessageSectionGroup: React.FC<Props> = ({targetId}) => {
    const {userId: currentUserId} = useGetProfileInfo();
    const {
        data: messages,
        pagination: pagination,
        size: size,
        setSize: setSize,
        isValidating: isValidating,
        isLoading: isLoading,
    } = useGetInfiniteGroupChatMessages(targetId);

    const {loadMoreRef} = useInfiniteScrolling({
        data: messages,
        pagination,
        size,
        isValidating,
        setSize,
    });

    return (
        <div className='shadow-custom-1 relative flex h-[89vh] flex-col gap-2 rounded-b-xl bg-white p-4'>
            <ScrollArea className='h-[90%] pr-4'>
                <>
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={cn(
                                'my-4 flex',
                                message.sender.id === currentUserId ? 'justify-end' : 'justify-start'
                            )}
                        >
                            <MessageItemGroup
                                message={message}
                                isCurrentUser={message.sender.id === currentUserId}
                                showAvatar={message.sender.id !== messages[index - 1]?.sender.id}
                                className='w-4/5'
                            />
                        </div>
                    ))}
                    <div ref={loadMoreRef} className='flex justify-center'>
                        {isValidating && !isLoading && <Spinner width={60} height={60} />}
                    </div>
                </>
            </ScrollArea>
            <div className='flex h-[10%] items-center gap-2 rounded-xl bg-primary px-5 py-3'>
                <div className='flex gap-2'>
                    <Button variant='icon' size='icon' className='size-6'>
                        <Icon name='image' className='text-white' />
                    </Button>
                    <Button variant='icon' size='icon'>
                        <Icon name='attachment' className='text-white' />
                    </Button>
                    <Button variant='icon' size='icon'>
                        <Icon name='smile' className='text-white' />
                    </Button>
                    <Button variant='icon' size='icon'>
                        <Icon name='mention' className='text-white' />
                    </Button>
                </div>
                <div className='flex h-5 flex-grow items-center gap-2'>
                    <Separator className='h-full bg-white' orientation='vertical' />
                    <input
                        type='text'
                        className='w-full rounded-sm border border-white bg-primary py-1 pl-2 text-white placeholder:text-white focus:outline-1 focus:outline-white'
                        placeholder='Start typing...'
                    />
                    <Button variant='secondary' className='aspect-square h-10 w-10 rounded-sm bg-white p-1 flex-center'>
                        <Icon name='arrow-send' width={20} height={20} />
                    </Button>
                </div>
            </div>
        </div>
    );
};
