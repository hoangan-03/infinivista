'use client';

import React, {useEffect, useState} from 'react';

import {Avatar, Icon} from '@/components/commons';
import {Button, Input, Separator, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from '@/components/ui';
import {cn, getSumReactions, getTimeStamp} from '@/lib/utils';
import {REACTION_TYPE} from '@/modules/common.enum';
import {IPost} from '@/modules/post/post.interface';
import {useGetInfinitePostComments, useGetPostReactionCount} from '@/modules/post/post.swr';

import {ModalComments, ModalMultimedia, ReactionButton} from '.';

interface PostProps {
    data: IPost;
    // sharedPost?: IPost;
    isShared?: boolean;
    className?: string;
}

type Icon = {
    name: string;
    type: REACTION_TYPE;
};

const icons: Icon[] = Object.values(REACTION_TYPE).map((type) => ({
    name: `emote-${type.toLowerCase()}`,
    type,
}));

export const Post: React.FC<PostProps> = ({data, isShared, className}) => {
    const [showModalComments, setShowModalComments] = useState<boolean>(false);

    const [displayCount, setDisplayCount] = useState<number>(0);
    useEffect(() => {
        const updateDisplayCount = () => {
            const width = window.innerWidth;
            if (width >= 1920) {
                setDisplayCount(5);
            } else if (width >= 1536) {
                setDisplayCount(3);
            } else if (width >= 1280) {
                setDisplayCount(3);
            } else if (width >= 768) {
                setDisplayCount(2);
            } else {
                setDisplayCount(1);
            }
        };

        updateDisplayCount();

        window.addEventListener('resize', updateDisplayCount);

        return () => window.removeEventListener('resize', updateDisplayCount);
    }, []);

    // TODO: add infinite scrolling for comments
    const {data: comments} = useGetInfinitePostComments(data.id);
    const {data: reactionCounts} = useGetPostReactionCount(data.id);

    return (
        <div
            className={cn(
                'flex min-w-fit flex-col gap-5 rounded-[1.5rem] border border-gray-100 bg-white p-7 shadow-md',
                className
            )}
        >
            <section className='flex items-center gap-3'>
                <Avatar src={data.userOwner.profileImageUrl || undefined} />
                <div>
                    <h6 className='font-bold'>{data.userOwner.username}</h6>
                    <p className='text-caption font-medium text-gray-500'>{getTimeStamp(data.createdAt)}</p>
                </div>
            </section>
            {!isShared && (
                <section>
                    <p className='text-justify text-paragraph1 font-medium'>{data.content}</p>
                </section>
            )}
            {isShared && (
                <div
                    className={cn(
                        'flex min-w-fit flex-col gap-5 rounded-[1.5rem] border border-gray-100 bg-white p-7 shadow-md',
                        className
                    )}
                >
                    <section className='flex items-center gap-3'>
                        <Avatar src={data.userOwner.profileImageUrl || undefined} />
                        <div>
                            <h6 className='font-bold'>{'sharedPost.author'}</h6>
                            <p className='text-caption font-medium text-gray-500'>{getTimeStamp(data.createdAt)}</p>
                        </div>
                    </section>
                    <section>
                        <p className='text-justify text-paragraph1 font-medium'>{'sharedPost.description'}</p>
                    </section>
                    <ModalMultimedia attachments={data.postAttachments} displayCount={displayCount} />
                </div>
            )}
            {!isShared && <ModalMultimedia attachments={data.postAttachments} displayCount={displayCount} />}
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
                            {!isShared && (
                                <Button variant='icon' size='icon'>
                                    <Icon name='share' className='block group-hover:hidden' />
                                    <Icon name='share-filled' className='hidden text-primary/80 group-hover:block' />
                                </Button>
                            )}
                            <Button variant='icon' size='icon'>
                                <Icon name='save' className='block group-hover:hidden' />
                                <Icon name='save-filled' className='hidden text-primary/80 group-hover:block' />
                            </Button>
                        </div>
                    </div>
                    <Separator className='bg-gray-200' />
                </div>
            </section>
            <section className='flex items-center justify-between gap-3 whitespace-nowrap'>
                <TooltipProvider delayDuration={150}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <p className='w-fit cursor-pointer text-subtitle2 font-bold'>
                                {getSumReactions(reactionCounts)} Reactions
                            </p>
                        </TooltipTrigger>
                        <TooltipContent className='flex h-10 items-center justify-center gap-2 bg-white' align='center'>
                            {reactionCounts &&
                                Object.entries(reactionCounts).map(([type, count]) => {
                                    if (!count) return null;

                                    const icon = icons.find((i) => i.type === type);

                                    return (
                                        <div key={type} className='flex items-center gap-1'>
                                            <p>{count}</p>
                                            <Icon
                                                name={icon?.name || `emote-${type.toLowerCase()}`}
                                                width={20}
                                                height={20}
                                            />
                                        </div>
                                    );
                                })}
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <div className='flex gap-3 text-gray-600'>
                    <p className='w-fit cursor-pointer text-paragraph2 hover:underline hover:underline-offset-2'>
                        1000 Views
                    </p>
                    <p className='w-fit cursor-pointer text-paragraph2 hover:underline hover:underline-offset-2'>
                        {comments.length} Comments
                    </p>
                    <p className='w-fit cursor-pointer text-paragraph2 hover:underline hover:underline-offset-2'>
                        1000 Reposts
                    </p>
                    <p className='w-fit cursor-pointer text-paragraph2 hover:underline hover:underline-offset-2'>
                        1000 Shares
                    </p>
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
                reactions={reactionCounts}
                comments={comments}
            />
        </div>
    );
};
