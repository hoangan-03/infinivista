'use client';

import {useRouter} from 'next/navigation';
import React, {useEffect, useMemo, useState} from 'react';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {toast} from 'react-toastify';

import {Avatar, Icon} from '@/components/commons';
import {Button, Input, Separator, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from '@/components/ui';
import {useGetProfileInfo} from '@/hooks';
import {cn, getSumReactions, getTimeStamp} from '@/lib/utils';
import {REACTION_TYPE} from '@/modules/common.enum';
import {IPost, IPostCommentCreate, IPostReactionAdd, IPostReactionDelete} from '@/modules/post/post.interface';
import {PostService} from '@/modules/post/post.service';
import {useGetInfinitePostComments, useGetPostReactionCount, useGetPostReactions} from '@/modules/post/post.swr';
import {ROUTES} from '@/routes/routes.enum';

import {ModalComments, ModalMultimedia, ReactionButton} from '.';

interface PostProps {
    post?: IPost;
    isShared?: boolean;
    className?: string;
    dangerouslySetInnerHTML?: boolean; // New prop to handle highlighting
}

type Icon = {
    name: string;
    type: REACTION_TYPE;
};

const icons: Icon[] = Object.values(REACTION_TYPE).map((type) => ({
    name: `emote-${type.toLowerCase()}`,
    type,
}));

// Helper function to generate stable random numbers based on post ID
const getStableRandomNumber = (postId: string | undefined, seed: number = 0): number => {
    if (!postId) return 100;

    let hash = seed; // Add seed for different distributions
    for (let i = 0; i < postId.length; i++) {
        hash = (hash << 5) - hash + postId.charCodeAt(i);
        hash = hash & hash; // Convert to 32bit integer
    }

    // Return a number between 100 and 10000
    return Math.abs(hash % 9901) + 100;
};

type FormValues = IPostCommentCreate;

export const Post: React.FC<PostProps> = ({post, isShared, className, dangerouslySetInnerHTML}) => {
    const isSharedd: boolean = false;
    const [showModalComments, setShowModalComments] = useState<boolean>(false);

    const {userId: currentUserId} = useGetProfileInfo();

    const {pagination, mutate} = useGetInfinitePostComments(post?.id);
    const {data: reactionCounts} = useGetPostReactionCount(post?.id);

    const router = useRouter();

    // Generate stable view and repost counts based on post ID
    const viewsCount = useMemo(() => getStableRandomNumber(post?.id, 1), [post?.id]);
    const repostsCount = useMemo(() => getStableRandomNumber(post?.id, 2), [post?.id]);

    const {
        control,
        handleSubmit,
        formState: {isSubmitting, isDirty},
        reset,
    } = useForm<FormValues>({
        defaultValues: {
            text: '',
        },
    });

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        if (!post) return;
        try {
            await PostService.createPostComment(post?.id, data);
            toast.success('Comment created successfully!');
            reset();
            mutate();
        } catch (error) {
            console.error('Error creating post comment:', error);
            toast.error('Failed to create comment.');
        }
    };

    const {data: reactions, mutate: reactionMutate} = useGetPostReactions(post?.id);
    const currentUserReaction = reactions?.find((reaction) => reaction.user_id === currentUserId)?.reactionType;
    const handleReactPost = async (reaction: REACTION_TYPE) => {
        if (!post) return;
        try {
            if (reaction === currentUserReaction) {
                const payload: IPostReactionDelete = {
                    reactionType: reaction,
                };
                await PostService.deletePostReaction(post?.id, payload);
            } else {
                const payload: IPostReactionAdd = {
                    reactionType: reaction,
                };
                await PostService.addPostReaction(post?.id, payload);
            }
            reactionMutate();
        } catch (error) {
            console.error('Error adding post reaction:', error);
            toast.error('Failed to add reaction.');
        }
    };

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

    const renderContent = () => {
        if (dangerouslySetInnerHTML) {
            return <p className='whitespace-pre-wrap' dangerouslySetInnerHTML={{__html: post?.content || ''}} />;
        }
        return <p className='whitespace-pre-wrap'>{post?.content}</p>;
    };

    const renderUsername = () => {
        if (dangerouslySetInnerHTML && post?.userOwner) {
            return <span dangerouslySetInnerHTML={{__html: post.userOwner.username}} />;
        }
        return <>{post?.userOwner?.username}</>;
    };

    return (
        <div
            className={cn(
                'flex min-w-fit flex-col gap-5 rounded-[1.5rem] border border-gray-100 bg-white p-7 shadow-md',
                className
            )}
        >
            <section className='flex items-center gap-3'>
                <Avatar
                    src={post?.userOwner?.profileImageUrl || undefined}
                    className='cursor-pointer'
                    onClick={() => router.push(ROUTES.PROFILE + `/${post?.userOwner?.id}`)}
                />
                <div>
                    <h6
                        className='cursor-pointer font-bold'
                        onClick={() => router.push(ROUTES.PROFILE + `/${post?.userOwner?.id}`)}
                    >
                        {renderUsername()}
                    </h6>
                    <p className='text-caption font-medium text-gray-500'>
                        {getTimeStamp(post?.createdAt || new Date())}
                    </p>
                </div>
            </section>
            {!isSharedd && <section>{renderContent()}</section>}
            {isSharedd && (
                <div
                    className={cn(
                        'flex min-w-fit flex-col gap-5 rounded-[1.5rem] border border-gray-100 bg-white p-7 shadow-md',
                        className
                    )}
                >
                    <section className='flex items-center gap-3'>
                        <Avatar src={post?.userOwner?.profileImageUrl || undefined} />
                        <div>
                            <h6 className='font-bold'>{'sharedPost.author'}</h6>
                            <p className='text-caption font-medium text-gray-500'>
                                {getTimeStamp(post?.createdAt || new Date())}
                            </p>
                        </div>
                    </section>
                    <section>
                        <p className='text-justify text-paragraph1 font-medium'>{'sharedPost.description'}</p>
                    </section>
                    <ModalMultimedia attachments={post?.postAttachments} displayCount={displayCount} />
                </div>
            )}
            {!isSharedd && <ModalMultimedia attachments={post?.postAttachments} displayCount={displayCount} />}
            <section>
                <div className='space-y-2'>
                    <Separator className='bg-gray-200' />
                    <div className='flex items-center justify-between gap-3'>
                        <div className='reaction-container flex items-center gap-4'>
                            <ReactionButton reacted={currentUserReaction} onReact={handleReactPost} />
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
                            {!isSharedd && (
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
                        {viewsCount} Views
                    </p>
                    <p className='w-fit cursor-pointer text-paragraph2 hover:underline hover:underline-offset-2'>
                        {pagination[0]?.total} Comments
                    </p>
                    <p className='w-fit cursor-pointer text-paragraph2 hover:underline hover:underline-offset-2'>
                        {repostsCount} Reposts
                    </p>
                    <p className='w-fit cursor-pointer text-paragraph2 hover:underline hover:underline-offset-2'>
                        {post?.share_count} Shares
                    </p>
                </div>
            </section>
            <form onSubmit={handleSubmit(onSubmit)} className='flex items-center gap-3'>
                <Controller
                    control={control}
                    name='text'
                    render={({field}) => (
                        <Input type='text' placeholder='Add a comment...' className='text-paragraph2' {...field} />
                    )}
                />
                <Button type='submit' disabled={isSubmitting || !isDirty}>
                    Post
                </Button>
            </form>
            <ModalComments
                open={showModalComments}
                onClose={() => setShowModalComments(false)}
                reactionCounts={reactionCounts}
                postId={post?.id}
            />
        </div>
    );
};
