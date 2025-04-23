'use client';

import React, {useEffect, useState} from 'react';

import {Avatar, Icon} from '@/components/commons';
import {Button, Input, Separator, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from '@/components/ui';
import {cn, getSumReactions, getTimeStamp} from '@/lib/utils';
import {IPost, REACTION_TYPE} from '@/mock_data/post';

import {ModalComments, ModalMultimedia, ReactionButton} from '.';

interface PostProps {
    data: IPost;
    sharedPost?: IPost;
    className?: string;
}

type Icon = {
    name: string;
    type: REACTION_TYPE;
};

const icons: Icon[] = Object.values(REACTION_TYPE).map((type) => ({
    name: `emote-${type}`,
    type,
}));

export const Post: React.FC<PostProps> = ({data, sharedPost, className}) => {
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
            {sharedPost && (
                <div
                    className={cn(
                        'flex min-w-fit flex-col gap-5 rounded-[1.5rem] border border-gray-100 bg-white p-7 shadow-md',
                        className
                    )}
                >
                    <section className='flex items-center gap-3'>
                        <Avatar src={sharedPost.avatar} />
                        <div>
                            <h6 className='font-bold'>{sharedPost.author}</h6>
                            <p className='text-caption font-medium text-gray-500'>
                                {getTimeStamp(sharedPost.createdAt)}
                            </p>
                        </div>
                    </section>
                    <section>
                        <p className='text-justify text-paragraph1 font-medium'>{sharedPost.description}</p>
                    </section>
                    <ModalMultimedia attachments={sharedPost.attachments} displayCount={displayCount} />
                </div>
            )}
            {!sharedPost && <ModalMultimedia attachments={data.attachments} displayCount={displayCount} />}
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
            <section className='flex items-center justify-between gap-3 whitespace-nowrap'>
                <TooltipProvider delayDuration={150}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <p className='w-fit cursor-pointer text-subtitle2 font-bold'>
                                {getSumReactions(data.reactions)} Reactions
                            </p>
                        </TooltipTrigger>
                        <TooltipContent className='flex h-10 items-center justify-center gap-2 bg-white' align='center'>
                            {data.reactions.map((reaction, index) => {
                                const icon = icons.find((i) => i.type === reaction.type);
                                return (
                                    <div key={index} className='flex items-center gap-1'>
                                        <p>{reaction.count}</p>
                                        <Icon name={icon?.name || reaction.type} width={20} height={20} />
                                    </div>
                                );
                            })}
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <div className='flex gap-3 text-gray-600'>
                    <p className='w-fit cursor-pointer text-paragraph2 hover:underline hover:underline-offset-2'>
                        {data.viewCount} Views
                    </p>
                    <p className='w-fit cursor-pointer text-paragraph2 hover:underline hover:underline-offset-2'>
                        {data.comments.length} Comments
                    </p>
                    <p className='w-fit cursor-pointer text-paragraph2 hover:underline hover:underline-offset-2'>
                        {data.repostCount} Reposts
                    </p>
                    <p className='w-fit cursor-pointer text-paragraph2 hover:underline hover:underline-offset-2'>
                        {data.shareCount} Shares
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
                reactions={data.reactions}
                comments={data.comments}
            />
        </div>
    );
};
