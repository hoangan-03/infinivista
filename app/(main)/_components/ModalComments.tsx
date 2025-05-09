import React, {useRef, useState} from 'react';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {toast} from 'react-toastify';

import {Avatar, Icon, ModalConfirm, Spinner} from '@/components/commons';
import {Button, Input, ScrollArea, Separator, Textarea, VisuallyHidden} from '@/components/ui';
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from '@/components/ui/dialog';
import {useGetProfileInfo, useInfiniteScrolling} from '@/hooks';
import {cn, getSumReactions, getTimeStamp} from '@/lib/utils';
import {REACTION_TYPE} from '@/modules/common.enum';
import {
    IPostCommentCreate,
    IPostCommentUpdate,
    IPostReactionAdd,
    IPostReactionCount,
    IPostReactionDelete,
} from '@/modules/post/post.interface';
import {PostService} from '@/modules/post/post.service';
import {useGetInfinitePostComments, useGetPostReactions} from '@/modules/post/post.swr';

import {ReactionButton} from '.';

interface ModalCommentsProps {
    open: boolean;
    onClose: () => void;
    reactionCounts?: IPostReactionCount;
    postId?: string;
}

type FormValuesCommentCreate = IPostCommentCreate;
type FormValuesCommentUpdate = IPostCommentUpdate;

export const ModalComments: React.FC<ModalCommentsProps> = ({open, onClose, reactionCounts, postId}) => {
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [deleteCommentId, setDeleteCommentId] = useState<string | undefined>(undefined);

    const [isEditingComment, setIsEditingComment] = useState(false);
    const [editingCommentId, setEditingCommentId] = useState<string | undefined>(undefined);

    const {userId: currentUserId} = useGetProfileInfo();
    const reactionCount = getSumReactions(reactionCounts);

    const scrollAreaRef = useRef<HTMLDivElement>(null);
    const {
        data: comments,
        mutate,
        pagination,
        size,
        setSize,
        isValidating,
        isLoading,
    } = useGetInfinitePostComments(postId);
    const {loadMoreRef} = useInfiniteScrolling({
        data: comments,
        pagination,
        size,
        isValidating,
        setSize,
    });

    const {
        control: controlCommentCreate,
        handleSubmit: handleSubmitCommentCreate,
        formState: {isSubmitting: isSubmittingCommentCreate, isDirty: isDirtyCommentCreate},
        reset: resetCommentCreate,
    } = useForm<FormValuesCommentCreate>({
        defaultValues: {
            text: '',
        },
    });
    const onSubmitCommentCreate: SubmitHandler<FormValuesCommentCreate> = async (data) => {
        if (!postId) return;
        try {
            await PostService.createPostComment(postId, data);
            toast.success('Comment created successfully!');
            resetCommentCreate();
            mutate();
        } catch (error) {
            console.error('Error creating post comment:', error);
            toast.error('Failed to create comment.');
        }
    };

    const {
        control: controlCommentUpdate,
        handleSubmit: handleSubmitCommentUpdate,
        formState: {isSubmitting: isSubmittingCommnetUpdate, isDirty: isDirtyCommentUpdate},
        reset: resetCommentUpdate,
    } = useForm<FormValuesCommentUpdate>({
        defaultValues: {
            text: '',
        },
    });
    const onSubmitCommentUpdate: SubmitHandler<FormValuesCommentUpdate> = async (data) => {
        try {
            if (!editingCommentId) return;
            await PostService.updatePostComment(editingCommentId, data);
            resetCommentUpdate();
            mutate();
        } catch (error) {
            console.error('Error updating post comment:', error);
            toast.error('Failed to update comment.');
        } finally {
            setIsEditingComment(false);
            setEditingCommentId(undefined);
        }
    };

    const {data: reactions, mutate: reactionMutate} = useGetPostReactions(postId);
    const currentUserReaction = reactions?.find((reaction) => reaction.user_id === currentUserId)?.reactionType;
    const handleReactPost = async (reaction: REACTION_TYPE) => {
        if (!postId) return;
        try {
            if (reaction === currentUserReaction) {
                const payload: IPostReactionDelete = {
                    reactionType: reaction,
                };
                await PostService.deletePostReaction(postId, payload);
            } else {
                const payload: IPostReactionAdd = {
                    reactionType: reaction,
                };
                await PostService.addPostReaction(postId, payload);
            }
            reactionMutate();
        } catch (error) {
            console.error('Error adding post reaction:', error);
            toast.error('Failed to add reaction.');
        }
    };

    const handleDeleteComment = async () => {
        try {
            if (!deleteCommentId) return;
            await PostService.deletePostComment(deleteCommentId);
        } catch (error) {
            console.error('Error deleting post comment:', error);
            toast.error('Failed to delete comment.');
        } finally {
            setShowModalDelete(false);
            setDeleteCommentId(undefined);
            mutate();
        }
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent autoFocus={false} className='grid h-[80vh]'>
                <DialogHeader>
                    <DialogTitle className='flex gap-4'>
                        <div className='flex items-center gap-1'>
                            <ReactionButton reacted={currentUserReaction} onReact={handleReactPost} />
                            {reactionCount}
                        </div>
                        <Separator orientation='vertical' className='w-[2px] bg-black' />
                        <div className='flex items-center gap-1'>
                            <Icon name='chat-rectangle' />
                            {pagination[0]?.total}
                        </div>
                    </DialogTitle>
                    <VisuallyHidden>
                        <DialogDescription />
                    </VisuallyHidden>
                </DialogHeader>
                <div className='space-y-5'>
                    <ScrollArea ref={scrollAreaRef} className='custom-scrollbar h-[60vh] min-h-[60vh]'>
                        {comments.map((comment, index) => (
                            <div key={index} className='mb-5 flex w-full gap-3 rounded-md bg-gray-100 px-3 py-2'>
                                <Avatar
                                    src={comment.user.profileImageUrl || undefined}
                                    alt={'Avatar of ' + comment.user.firstName + ' ' + comment.user.lastName}
                                    className='min-w-10'
                                />
                                <div className={'w-full'}>
                                    <div className='flex items-center justify-between gap-2'>
                                        <p className='text-paragraph1 font-bold'>{`${comment.user.username}`}</p>
                                        <div className='flex items-center gap-2'>
                                            <p className='text-caption'>{getTimeStamp(comment.createdAt)}</p>
                                            {comment.user.id === currentUserId && (
                                                <>
                                                    <Button variant='icon' size='icon'>
                                                        <Icon
                                                            name='pencil'
                                                            width={16}
                                                            height={16}
                                                            className='group-hover:text-primary/80'
                                                            onClick={() => {
                                                                setIsEditingComment((prev) => !prev);
                                                                setEditingCommentId(comment.id);
                                                            }}
                                                        />
                                                    </Button>
                                                    <Button
                                                        variant='icon'
                                                        size='icon'
                                                        onClick={() => {
                                                            setShowModalDelete(true);
                                                            setDeleteCommentId(comment.id);
                                                        }}
                                                    >
                                                        <Icon
                                                            name='trash'
                                                            width={16}
                                                            height={16}
                                                            className='group-hover:text-red-700'
                                                        />
                                                    </Button>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    {isEditingComment && editingCommentId === comment.id ? (
                                        <form
                                            onSubmit={handleSubmitCommentUpdate(onSubmitCommentUpdate)}
                                            className='relative'
                                        >
                                            <Controller
                                                control={controlCommentUpdate}
                                                name='text'
                                                render={({field}) => (
                                                    <Textarea
                                                        {...field}
                                                        className='custom-scrollbar h-20 resize-none bg-slate-50 pb-8'
                                                    />
                                                )}
                                            />
                                            <Button
                                                type='submit'
                                                className='absolute bottom-2 right-3 h-6 w-20'
                                                disabled={isSubmittingCommnetUpdate || !isDirtyCommentUpdate}
                                            >
                                                Update
                                            </Button>
                                        </form>
                                    ) : (
                                        <p className='text-paragraph2'>{comment.text}</p>
                                    )}
                                </div>
                            </div>
                        ))}
                        <div ref={loadMoreRef} className={cn('flex h-10 justify-center')}>
                            {isValidating && !isLoading && <Spinner width={40} height={40} />}
                        </div>
                        {!isValidating &&
                            comments.length > 0 &&
                            pagination.length > 0 &&
                            pagination[pagination.length - 1]?.page ===
                                pagination[pagination.length - 1]?.totalPages && (
                                <div className='flex w-full flex-col items-center gap-2'>
                                    <Separator className='w-1/2 bg-gray-200' />
                                    <p className='text-paragraph2 text-gray-200'>No more comments</p>
                                </div>
                            )}
                    </ScrollArea>
                    <form
                        onSubmit={handleSubmitCommentCreate(onSubmitCommentCreate)}
                        className='flex items-center gap-3'
                    >
                        <Controller
                            control={controlCommentCreate}
                            name='text'
                            render={({field}) => (
                                <Input
                                    type='text'
                                    placeholder='Add a comment...'
                                    className='text-paragraph2'
                                    {...field}
                                />
                            )}
                        />
                        <Button type='submit' disabled={isSubmittingCommentCreate || !isDirtyCommentCreate}>
                            Post
                        </Button>
                    </form>
                </div>
            </DialogContent>
            <ModalConfirm
                open={showModalDelete}
                onClose={() => setShowModalDelete(false)}
                onConfirm={handleDeleteComment}
            />
        </Dialog>
    );
};
