import Image from 'next/image';
import {useState} from 'react';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {toast} from 'react-toastify';

import {ReactionButton} from '@/app/(main)/_components';
import {Avatar, ClientVideo, Icon, ModalConfirm, Spinner} from '@/components/commons';
import {
    Button,
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    Input,
    ScrollArea,
    Separator,
    Textarea,
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
    VisuallyHidden,
} from '@/components/ui';
import {useGetProfileInfo} from '@/hooks';
import {useInfiniteScrolling} from '@/hooks/useInfiniteScrolling';
import {getSumReactions, getTimeStamp} from '@/lib/utils';
import {ATTACHMENT_TYPE, REACTION_TYPE} from '@/modules/common.enum';
import {
    IStory,
    IStoryCommentCreate,
    IStoryCommentUpdate,
    IStoryReactionAdd,
    IStoryReactionDelete,
} from '@/modules/story/story.interface';
import {StoryService} from '@/modules/story/story.service';
import {useGetInfiniteStoryComments, useGetStoryReactionCount, useGetStoryReactions} from '@/modules/story/story.swr';

interface Props {
    open: boolean;
    story?: IStory;
    onClose: () => void;
}

type Icon = {
    name: string;
    type: REACTION_TYPE;
};

const icons: Icon[] = Object.values(REACTION_TYPE).map((type) => ({
    name: `emote-${type.toLowerCase()}`,
    type,
}));

type FormValuesCommentCreate = IStoryCommentCreate;
type FormValuesCommentUpdate = IStoryCommentUpdate;

function ModalStory({open, story, onClose}: Props) {
    const {userId: currentUserId} = useGetProfileInfo();

    const {
        data: comments,
        mutate,
        pagination,
        size,
        setSize,
        isValidating,
        isLoading,
    } = useGetInfiniteStoryComments(story?.id);
    const {loadMoreRef} = useInfiniteScrolling({
        data: comments,
        pagination,
        size,
        isValidating,
        setSize,
    });

    // ********** Story Reaction Counts ************
    const {data: reactionCounts} = useGetStoryReactionCount(story?.id);

    // ********** Story Reactions ************
    const {data: reactions, mutate: reactionMutate} = useGetStoryReactions(story?.id);
    const currentUserReaction = reactions?.find((reaction) => reaction.user_id === currentUserId)?.reactionType;
    const handleReactStory = async (reaction: REACTION_TYPE) => {
        try {
            if (!story) return;
            if (reaction === currentUserReaction) {
                const payload: IStoryReactionDelete = {
                    reactionType: reaction,
                };
                await StoryService.deleteStoryReaction(story.id, payload);
            } else {
                const payload: IStoryReactionAdd = {
                    reactionType: reaction,
                };
                await StoryService.addStoryReaction(story.id, payload);
            }
            reactionMutate();
        } catch (error) {
            console.error('Error adding post reaction:', error);
            toast.error('Failed to add reaction.');
        }
    };

    // ********** Comment Create ************
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
        try {
            if (!story) return;
            await StoryService.createStoryComment(story.id, data);
            toast.success('Comment created successfully!');
            resetCommentCreate();
            mutate();
        } catch (error) {
            console.error('Error creating post comment:', error);
            toast.error('Failed to create comment.');
        }
    };

    // ********** Comment Update ************
    const [isEditingComment, setIsEditingComment] = useState(false);
    const [editingCommentId, setEditingCommentId] = useState<string | undefined>(undefined);
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
            await StoryService.updateStoryComment(editingCommentId, data);
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

    // ********** Comment Delete ************
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [deleteCommentId, setDeleteCommentId] = useState<string | undefined>(undefined);
    const handleDeleteComment = async () => {
        try {
            if (!deleteCommentId) return;
            await StoryService.deleteStoryComment(deleteCommentId);
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
            <DialogContent autoFocus={false} className='grid h-fit min-h-[85vh] min-w-[1250px] items-start'>
                <VisuallyHidden>
                    <DialogHeader className='sr-only h-fit space-y-2'>
                        <DialogTitle>Posted by {story?.userOwner.username}</DialogTitle>
                        <DialogDescription />
                    </DialogHeader>
                </VisuallyHidden>
                <div className='flex h-full items-center gap-4'>
                    <div className='flex h-[100%] w-3/5 items-center justify-between'>
                        {story?.attachmentType === ATTACHMENT_TYPE.VIDEO && (
                            <div className='relative h-full'>
                                <ClientVideo
                                    autoPlay
                                    loop
                                    controls
                                    playsInline
                                    className='h-full w-full rounded-lg object-cover'
                                    src={story.story_url}
                                />
                            </div>
                        )}
                        {story?.attachmentType === ATTACHMENT_TYPE.IMAGE && (
                            <div className='relative h-full w-full'>
                                <Image
                                    src={story.story_url}
                                    alt={`Image from ${story?.userOwner.username}`}
                                    fill
                                    sizes='(max-width: 768px) 100vw, 60vw'
                                    className='rounded-lg'
                                />
                            </div>
                        )}
                        {story?.attachmentType !== ATTACHMENT_TYPE.IMAGE &&
                            story?.attachmentType !== ATTACHMENT_TYPE.VIDEO && (
                                <div className='relative h-full'>
                                    <Image
                                        src={'/assets/images/bg_placeholder.jpg'}
                                        alt={`Image from ${story?.userOwner.username}`}
                                        fill
                                        sizes='(max-width: 768px) 100vw, 60vw'
                                        className='rounded-lg'
                                    />
                                </div>
                            )}
                    </div>
                    <div className='w-2/5'>
                        <div className='flex items-center gap-2'>
                            <Avatar />
                            <div>
                                <p className='font-bold'>{story?.userOwner.username}</p>
                                <p className='text-sm text-gray-500'>{getTimeStamp(story?.createdAt || new Date())}</p>
                            </div>
                        </div>
                        <Separator className='mt-4 bg-gray-100' />
                        <ScrollArea className='h-[60vh] max-h-[60vh] pr-3'>
                            {comments.map((comment, index) => (
                                <div className='mt-4 space-y-2' key={index}>
                                    <div className='flex gap-2'>
                                        <Avatar />
                                        <div className='flex w-[90%] justify-between gap-2'>
                                            {isEditingComment && editingCommentId === comment.id ? (
                                                <div className='flex w-[90%] gap-2'>
                                                    <span className='w-fit max-w-[15%] overflow-hidden truncate font-bold text-black'>
                                                        {comment.user.username}
                                                    </span>
                                                    <form
                                                        onSubmit={handleSubmitCommentUpdate(onSubmitCommentUpdate)}
                                                        className='relative w-full'
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
                                                            disabled={
                                                                isSubmittingCommnetUpdate || !isDirtyCommentUpdate
                                                            }
                                                        >
                                                            Update
                                                        </Button>
                                                    </form>
                                                </div>
                                            ) : (
                                                <div className='w-[90%]'>
                                                    <span className='w-fit font-bold text-black'>
                                                        {comment.user.username}
                                                    </span>{' '}
                                                    <span className='text-sm text-gray-500'>{comment.text}</span>
                                                </div>
                                            )}
                                            <div className='flex gap-1'>
                                                <ReactionButton
                                                    onReact={(reaction) => {
                                                        console.log(reaction);
                                                    }}
                                                    width={18}
                                                    height={18}
                                                />
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
                                    </div>
                                    <div className='flex items-center justify-end'>
                                        <p className='text-sm text-gray-500'>{getTimeStamp(comment.createdAt)}</p>
                                    </div>
                                </div>
                            ))}
                            <div ref={loadMoreRef} className='flex h-8 justify-center'>
                                {isValidating && !isLoading && <Spinner width={32} height={32} />}
                            </div>
                        </ScrollArea>
                        <Separator className='mt-4 bg-gray-100' />
                        <div className='mt-2 flex items-center justify-between'>
                            <TooltipProvider delayDuration={150}>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <p className='cursor-pointer'>{getSumReactions(reactionCounts)} Reactions</p>
                                    </TooltipTrigger>
                                    <TooltipContent
                                        className='flex h-10 items-center justify-center gap-2 bg-white'
                                        align='center'
                                    >
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
                            <div className='mt-2 flex items-center gap-4'>
                                <ReactionButton reacted={currentUserReaction} onReact={handleReactStory} />
                                {/* <Button variant='icon' size='icon'>
                                    <Icon name='chat-rectangle' className='block group-hover:hidden' />
                                    <Icon
                                        name='chat-rectangle-filled'
                                        className='hidden text-primary/80 group-hover:block'
                                    />
                                </Button> */}
                                <Button variant='icon' size='icon'>
                                    <Icon name='share' className='block group-hover:hidden' />
                                    <Icon name='share-filled' className='hidden text-primary/80 group-hover:block' />
                                </Button>
                            </div>
                        </div>
                        <Separator className='mt-4 bg-gray-100' />
                        <form
                            onSubmit={handleSubmitCommentCreate(onSubmitCommentCreate)}
                            className='flex items-center justify-center gap-2'
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
                </div>
            </DialogContent>
            <ModalConfirm
                open={showModalDelete}
                onClose={() => setShowModalDelete(false)}
                onConfirm={handleDeleteComment}
            />
        </Dialog>
    );
}

export default ModalStory;
