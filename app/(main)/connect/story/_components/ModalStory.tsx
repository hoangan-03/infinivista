import Image from 'next/image';

import {ReactionButton} from '@/app/(main)/_components';
import {Avatar, ClientVideo, Icon, Spinner} from '@/components/commons';
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
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
    VisuallyHidden,
} from '@/components/ui';
import {useInfiniteScrolling} from '@/hooks/useInfiniteScrolling';
import {getSumReactions, getTimeStamp} from '@/lib/utils';
import {ATTACHMENT_TYPE, REACTION_TYPE} from '@/modules/common.enum';
import {IStory} from '@/modules/story/story.interface';
import {useGetInfiniteStoryComments, useGetStoryReactionCount} from '@/modules/story/story.swr';

interface Props {
    open: boolean;
    data?: IStory;
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

function ModalStory({open, data, onClose}: Props) {
    const {data: comments, pagination, size, setSize, isValidating, isLoading} = useGetInfiniteStoryComments(data?.id);
    const {loadMoreRef} = useInfiniteScrolling({
        data: comments,
        pagination,
        size,
        isValidating,
        setSize,
    });

    const {data: reactionCounts} = useGetStoryReactionCount(data?.id);

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent autoFocus={false} className='grid h-fit min-h-[85vh] min-w-[1250px] items-start'>
                <VisuallyHidden>
                    <DialogHeader className='sr-only h-fit space-y-2'>
                        <DialogTitle>Posted by SOMEONE</DialogTitle>
                        <DialogDescription />
                    </DialogHeader>
                </VisuallyHidden>
                <div className='flex h-full items-center gap-4'>
                    <div className='flex h-[100%] w-3/5 items-center justify-between'>
                        {data?.attachmentType === ATTACHMENT_TYPE.VIDEO && (
                            <div className='relative h-full'>
                                <ClientVideo
                                    autoPlay
                                    loop
                                    controls
                                    playsInline
                                    className='h-full w-full rounded-lg object-cover'
                                    src={data.story_url}
                                />
                            </div>
                        )}
                        {data?.attachmentType === ATTACHMENT_TYPE.IMAGE && (
                            <div className='relative h-full w-full'>
                                <Image
                                    src={data.story_url}
                                    alt={'Image of SOMEONE'}
                                    fill
                                    sizes='(max-width: 768px) 100vw, 60vw'
                                    className='rounded-lg'
                                />
                            </div>
                        )}
                        {data?.attachmentType !== ATTACHMENT_TYPE.IMAGE &&
                            data?.attachmentType !== ATTACHMENT_TYPE.VIDEO && (
                                <div className='relative h-full'>
                                    <Image
                                        src={'/assets/images/bg_placeholder.jpg'}
                                        alt={'Image of SOMEONE'}
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
                                <p className='font-bold'>SOMEONE</p>
                                <p className='text-sm text-gray-500'>SOMETHING</p>
                            </div>
                        </div>
                        <Separator className='mt-4 bg-gray-100' />
                        <ScrollArea className='h-[60vh] max-h-[60vh] pr-3'>
                            {comments.map((comment, index) => (
                                <div className='mt-4 space-y-2' key={index}>
                                    <div className='flex gap-2'>
                                        <Avatar />
                                        <div className='flex w-[90%] justify-between gap-2'>
                                            <p className='w-[90%] text-sm text-gray-500'>
                                                <span className='w-fit font-bold text-black'>
                                                    {comment.user.username}
                                                </span>{' '}
                                                {comment.text}
                                            </p>
                                            <ReactionButton
                                                onReact={(reaction) => {
                                                    console.log(reaction);
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className='flex items-center justify-end'>
                                        <p className='text-sm text-gray-500'>{getTimeStamp(comment.createdAt)}</p>
                                    </div>
                                </div>
                            ))}
                            <div ref={loadMoreRef} className='flex justify-center'>
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
                                <ReactionButton
                                    onReact={(reaction) => {
                                        console.log(reaction);
                                    }}
                                />
                                <Button variant='icon' size='icon'>
                                    <Icon name='chat-rectangle' className='block group-hover:hidden' />
                                    <Icon
                                        name='chat-rectangle-filled'
                                        className='hidden text-primary/80 group-hover:block'
                                    />
                                </Button>
                                <Button variant='icon' size='icon'>
                                    <Icon name='share' className='block group-hover:hidden' />
                                    <Icon name='share-filled' className='hidden text-primary/80 group-hover:block' />
                                </Button>
                            </div>
                        </div>
                        <Separator className='mt-4 bg-gray-100' />
                        <div className='flex items-center justify-center gap-2'>
                            <Input placeholder='Add your comment' />
                            <Button>Post</Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default ModalStory;
