'use client';

import {useState} from 'react';

import {Avatar, Icon} from '@/components/commons';
import {Button, Input, Separator} from '@/components/ui';
import {cn, getSumReactions, getTimeStamp} from '@/lib/utils';
import {IPost} from '@/mock_data/post';

import {ModalComments, ModalMultimedia, ReactionButton} from '.';

interface Props {
    data: IPost;
    className?: string;
}

export const SharedPost: React.FC<Props> = ({data, className}) => {
    const [showModalComments, setShowModalComments] = useState<boolean>(false);

    return (
        <div
            className={cn(
                'flex min-w-fit flex-col gap-5 rounded-[1.5rem] border border-gray-100 bg-white p-7 shadow-md',
                className
            )}
        >
            <section className='flex items-center gap-3'>
                <Avatar src={data.avatar} />
                <div>
                    <h6 className='font-bold'>{data.author}</h6>
                    <p className='text-caption font-medium text-gray-500'>{getTimeStamp(data.createdAt)}</p>
                </div>
            </section>
            <section>
                <p className='text-justify text-paragraph1 font-medium'>{data.description}</p>
            </section>
            <div
                className={cn(
                    'flex min-w-fit flex-col gap-5 rounded-[1.5rem] border border-gray-100 bg-white p-7 shadow-md',
                    className
                )}
            >
                <section className='flex items-center gap-3'>
                    <Avatar src={data.avatar} />
                    <div>
                        <h6 className='font-bold'>{data.author}</h6>
                        <p className='text-caption font-medium text-gray-500'>{getTimeStamp(data.createdAt)}</p>
                    </div>
                </section>
                <section>
                    <p className='text-justify text-paragraph1 font-medium'>{data.description}</p>
                </section>
                <ModalMultimedia attachments={data.attachments} />
            </div>
            {/* <ModalMultimedia attachments={data.attachments} /> */}
            <section>
                <div className='space-y-2'>
                    <Separator className='bg-gray-200' />
                    <div className='flex items-center justify-between gap-3'>
                        <div className='reaction-container flex items-center gap-4'>
                            <ReactionButton onReact={() => {}} />
                            <Button variant='icon' size='icon' onClick={() => setShowModalComments(true)}>
                                <Icon name='chat-rectangle' className='block group-hover:hidden' />
                                <Icon
                                    name='chat-rectangle-filled'
                                    className='hidden text-primary/80 group-hover:block'
                                />
                            </Button>
                            <Button variant='icon' size='icon'>
                                <Icon name='file-copy' className='block group-hover:hidden' />
                                <Icon name='file-copy-filled' className='hidden text-primary/80 group-hover:block' />
                            </Button>
                        </div>
                        <div className='flex gap-4'>
                            <Button variant='icon' size='icon'>
                                <Icon name='share' className='block group-hover:hidden' />
                                <Icon name='share-filled' className='hidden text-primary/80 group-hover:block' />
                            </Button>
                            <Button variant='icon' size='icon'>
                                <Icon name='save' className='block group-hover:hidden' />
                                <Icon name='save-filled' className='hidden text-primary/80 group-hover:block' />
                            </Button>
                        </div>
                    </div>
                    <Separator className='bg-gray-200' />
                </div>
            </section>
            <section
                className='flex cursor-pointer items-center justify-between gap-3 whitespace-nowrap'
                onClick={() => setShowModalComments(true)}
            >
                <p className='w-fit text-subtitle2 font-bold'>{getSumReactions(data.reactions)} Reactions</p>
                <div className='flex gap-3 text-gray-600'>
                    <p className='w-fit text-paragraph2'>{data.viewCount} Views</p>
                    <p className='w-fit text-paragraph2'>{data.comments.length} Comments</p>
                    <p className='w-fit text-paragraph2'>{data.repostCount} Reposts</p>
                    <p className='w-fit text-paragraph2'>{data.shareCount} Shares</p>
                </div>
            </section>
            <section>
                <Input
                    type='text'
                    placeholder='Add a comment...'
                    className='text-paragraph2'
                    suffixIcon={
                        <>
                            <Icon name='happy' className='block group-hover:hidden' />
                            <Icon name='happy-filled' className='hidden group-hover:block' />
                        </>
                    }
                />
            </section>
            <ModalComments
                open={showModalComments}
                onClose={() => setShowModalComments(false)}
                reactions={data.reactions}
                comments={data.comments}
            />
        </div>
    );
};
