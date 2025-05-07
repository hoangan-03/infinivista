'use client';

import {useEffect, useRef} from 'react';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';

import {Icon, Spinner} from '@/components/commons';
import {Button, ScrollArea, Separator} from '@/components/ui';
import {useGetProfileInfo, useInfiniteScrolling} from '@/hooks';
import {cn} from '@/lib/utils';
import {IMessageCreate} from '@/modules/message/message.interface';
import {MessageService} from '@/modules/message/message.service';
import {useGetInfiniteMessages} from '@/modules/message/message.swr';

import {MessageItemUser} from './MessageItemUser';

interface Props {
    targetId?: string;
}

type FormValues = {
    message: string;
};

export const MessageSectionUser: React.FC<Props> = ({targetId}) => {
    const {userId: currentUserId} = useGetProfileInfo();
    const scrollAreaRef = useRef<HTMLDivElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const firstLoadRef = useRef(true);

    const {
        data: messages,
        mutate,
        pagination: pagination,
        size: size,
        setSize: setSize,
        isValidating: isValidating,
        isLoading: isLoading,
    } = useGetInfiniteMessages(targetId);

    const {loadMoreRef} = useInfiniteScrolling({
        data: messages,
        pagination,
        size,
        isValidating,
        setSize,
        scrollAreaRef,
    });

    useEffect(() => {
        if (messages.length > 0 && messagesEndRef.current) {
            if (firstLoadRef.current) {
                messagesEndRef.current.scrollIntoView({behavior: 'auto'});
                firstLoadRef.current = false;
            }
        }
    }, [messages]);

    const {
        control,
        handleSubmit,
        reset,
        formState: {isSubmitting, isDirty},
    } = useForm<FormValues>({
        defaultValues: {
            message: '',
        },
    });

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        if (!targetId) return;
        try {
            const payload: IMessageCreate = {
                messageText: data.message,
                recipientId: targetId,
            };
            await MessageService.createMessage({payload});
            await mutate();

            setTimeout(() => {
                messagesEndRef.current?.scrollIntoView({behavior: 'smooth'});
            }, 100);
        } catch (error) {
            console.error('Error sending message:', error);
        } finally {
            reset();
        }
    };

    return (
        <div className='shadow-custom-1 relative flex h-[89vh] flex-col gap-2 rounded-b-xl bg-white p-4'>
            <ScrollArea className='h-[90%] pr-4'>
                <>
                    <div ref={loadMoreRef} className='flex justify-center'>
                        {isValidating && !isLoading && <Spinner width={60} height={60} />}
                    </div>

                    {[...messages].reverse().map((message, index, reversedArr) => (
                        <div
                            key={index}
                            className={cn(
                                'my-4 flex',
                                message.sender.id === currentUserId ? 'justify-end' : 'justify-start'
                            )}
                        >
                            <MessageItemUser
                                message={message}
                                isCurrentUser={message.sender.id === currentUserId}
                                showAvatar={
                                    index === reversedArr.length - 1 ||
                                    message.sender.id !== reversedArr[index - 1]?.sender.id
                                }
                                className='w-4/5'
                            />
                        </div>
                    ))}

                    <div ref={messagesEndRef} />
                </>
            </ScrollArea>
            <div className='flex h-[10%] items-center gap-2 rounded-xl bg-primary px-5 py-3'>
                <div className='flex gap-2'>
                    <Button variant='icon' size='icon' className='size-6'>
                        <Icon name='image' className='text-white' />
                    </Button>
                    {/* <Button variant='icon' size='icon'>
                        <Icon name='attachment' className='text-white' />
                    </Button> */}
                    <Button variant='icon' size='icon'>
                        <Icon name='smile' className='text-white' />
                    </Button>
                    <Button variant='icon' size='icon'>
                        <Icon name='mention' className='text-white' />
                    </Button>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className='flex h-5 flex-grow items-center gap-2'>
                    <Separator className='h-full bg-white' orientation='vertical' />
                    <Controller
                        control={control}
                        name='message'
                        render={({field}) => (
                            <input
                                type='text'
                                className='w-full rounded-sm border border-white bg-primary py-1 pl-2 text-white placeholder:text-white focus:outline-1 focus:outline-white'
                                placeholder='Start typing...'
                                autoComplete='off'
                                {...field}
                            />
                        )}
                    />
                    <Button
                        type='submit'
                        variant='secondary'
                        className='aspect-square h-10 w-10 rounded-sm bg-white p-1 flex-center'
                        disabled={!isDirty || isSubmitting}
                    >
                        <Icon name='arrow-send' width={20} height={20} />
                    </Button>
                </form>
            </div>
        </div>
    );
};
