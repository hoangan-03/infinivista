'use client';
import Image from 'next/image';
import {useEffect, useRef} from 'react';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';

import {Icon, Spinner} from '@/components/commons';
import {Button, Input, ScrollArea, Separator} from '@/components/ui';
import {useGetProfileInfo, useInfiniteScrolling} from '@/hooks';
import {cn, getFileType} from '@/lib/utils';
import {FileWithMetadata} from '@/modules/common.interface';
import {IMessageAttachmentCreate, IMessageCreate} from '@/modules/message/message.interface';
import {MessageService} from '@/modules/message/message.service';
import {useGetInfiniteMessages} from '@/modules/message/message.swr';

import {MessageItemUser} from './MessageItemUser';

interface Props {
    targetId?: string;
}

type FormValues = {
    message: string;
    files: FileWithMetadata[];
};

export const MessageSectionUser: React.FC<Props> = ({targetId}) => {
    const {userId: currentUserId} = useGetProfileInfo();
    const scrollContainerRef = useRef<HTMLDivElement>(null);
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

    // TODO: ENABLE THIS CODE ONLY WHEN DEMO
    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         mutate();
    //     }, 1000);

    //     return () => {
    //         clearInterval(interval);
    //     };
    // }, [mutate]);

    const {loadMoreRef} = useInfiniteScrolling({
        data: messages,
        pagination,
        size,
        isValidating,
        setSize,
        scrollAreaRef: scrollContainerRef,
    });

    useEffect(() => {
        if (messages.length > 0 && firstLoadRef.current) {
            scrollContainerRef.current?.scrollTo(0, 0);
            firstLoadRef.current = false;
        }
    }, [messages]);

    const {
        control,
        handleSubmit,
        reset,
        formState: {isSubmitting, isDirty},
        setValue,
        watch,
    } = useForm<FormValues>({
        defaultValues: {
            message: '',
            files: [],
        },
    });

    const fileInputRef = useRef<HTMLInputElement>(null);
    const files = watch('files');
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputFiles = e.target.files;
        if (!inputFiles) return;

        const fileArray = Array.from(inputFiles).map((file) => {
            const fileType = getFileType(file);
            return {
                data: file,
                objectUrl: URL.createObjectURL(file),
                fileType,
            } as FileWithMetadata;
        });

        setValue('files', [...files, ...fileArray], {shouldDirty: true});
    };

    const handleAddMedia = () => {
        fileInputRef.current?.click();
    };

    const removeFile = (index: number) => {
        const newFiles = [...files];
        URL.revokeObjectURL(newFiles[index].objectUrl);
        newFiles.splice(index, 1);
        setValue('files', newFiles, {shouldDirty: true});
    };

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        if (!targetId) return;
        try {
            if (data.files.length > 0) {
                for (const file of data.files) {
                    const payload: IMessageAttachmentCreate = {
                        file: file.data,
                        recipientId: targetId,
                        attachmentType: file.fileType,
                    };

                    await MessageService.createMessageAttachment({payload});
                }
            }
            if (data.message) {
                const payload: IMessageCreate = {
                    messageText: data.message,
                    recipientId: targetId,
                };
                await MessageService.createMessage({payload});
            }

            await mutate();

            setTimeout(() => {
                scrollContainerRef.current?.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                });
            }, 100);
        } catch (error) {
            console.error('Error sending message:', error);
        } finally {
            reset();
        }
    };

    return (
        <div className='shadow-custom-1 relative flex h-[89vh] flex-col gap-2 rounded-b-xl bg-white p-4'>
            <div className='relative h-[90%]'>
                <div
                    ref={scrollContainerRef}
                    className={cn(
                        'custom-scrollbar flex h-full flex-col-reverse overflow-y-auto pr-4',
                        files.length > 0 && 'pb-32'
                    )}
                >
                    {messages.map((message, index, arr) => (
                        <div
                            key={message.id || index}
                            className={cn(
                                'my-4 flex',
                                message.sender.id === currentUserId ? 'justify-end' : 'justify-start'
                            )}
                        >
                            <MessageItemUser
                                message={message}
                                isCurrentUser={message.sender.id === currentUserId}
                                showAvatar={index === 0 || message.sender.id !== arr[index + 1]?.sender.id}
                                className='w-4/5'
                            />
                        </div>
                    ))}

                    <div ref={loadMoreRef} className='flex justify-center py-2'>
                        {isValidating && !isLoading && <Spinner width={60} height={60} />}
                    </div>
                </div>
                {files.length > 0 && (
                    <ScrollArea className='absolute bottom-32 left-0 z-10 h-32 bg-slate-100/70'>
                        <div className='flex flex-wrap gap-2 pl-5'>
                            {files.map((file, index) => (
                                <div key={index} className='relative size-32 rounded-sm'>
                                    <Image
                                        src={file.objectUrl}
                                        alt={`Image ${index + 1}`}
                                        fill
                                        sizes='128px'
                                        className='object-cover'
                                    />
                                    <div className='absolute right-1 top-1 flex gap-1'>
                                        <button
                                            type='button'
                                            onClick={() => removeFile(index)}
                                            className='flex size-4 items-center justify-center rounded bg-red-500 text-white'
                                        >
                                            <Icon name='x-mark' className='size-3' />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                )}
            </div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className='flex h-[10%] items-center gap-2 rounded-xl bg-primary px-5 py-3'
            >
                <div className='flex gap-2'>
                    <Input
                        type='file'
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept='image/*,video/*'
                        multiple
                        wrapperClassName='hidden'
                    />
                    <Button onClick={handleAddMedia} variant='icon' size='icon' className='size-6'>
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
                <div className='flex h-5 flex-grow items-center gap-2'>
                    <Separator className='h-full bg-white' orientation='vertical' />
                    <Controller
                        control={control}
                        name='message'
                        render={({field}) => (
                            <Input
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
                </div>
            </form>
        </div>
    );
};
