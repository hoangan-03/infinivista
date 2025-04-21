import {ReactionButton} from '@/app/(main)/_components';
import {Avatar, ClientVideo, Icon} from '@/components/commons';
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
    VisuallyHidden,
} from '@/components/ui';
import {comments} from '@/mock_data/comment';
import {IStory} from '@/mock_data/story';

interface Props {
    open: boolean;
    data?: IStory;
    onClose: () => void;
}

function ModalStory({open, data, onClose}: Props) {
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className='h-fit min-h-[85vh] min-w-[1250px] items-start'>
                <VisuallyHidden>
                    <DialogHeader className='sr-only h-fit space-y-2'>
                        <DialogTitle>Posted by {data?.username}</DialogTitle>
                        <DialogDescription>{data?.description}</DialogDescription>
                    </DialogHeader>
                </VisuallyHidden>
                <div className='flex h-full items-center gap-4'>
                    <div className='flex h-full w-3/5 items-center justify-between'>
                        {data?.videoUrl ? (
                            <div className='relative h-full'>
                                <ClientVideo
                                    controls
                                    playsInline
                                    className='h-full w-full rounded-lg object-cover'
                                    src={data.videoUrl}
                                />
                            </div>
                        ) : (
                            <div className='flex h-full items-center justify-center rounded-lg bg-gray-100'>
                                <p className='text-gray-500'>No media available</p>
                            </div>
                        )}
                    </div>
                    <div className='w-2/5'>
                        <div className='flex items-center gap-2'>
                            <Avatar />
                            <div>
                                <p className='font-bold'>{data?.username}</p>
                                <p className='text-sm text-gray-500'>{data?.description}</p>
                            </div>
                        </div>
                        <Separator className='mt-4 bg-gray-100' />
                        <ScrollArea className='h-[60vh] max-h-[60vh] pr-3'>
                            {comments.map((comment, index) => (
                                <div className='mt-4 space-y-2' key={index}>
                                    <div className='flex gap-2'>
                                        <Avatar />
                                        <div className='flex w-[90%] justify-between gap-2'>
                                            <p className='w-[90%] text-justify text-sm text-gray-500'>
                                                <span className='w-fit font-bold text-black'>{comment.username}</span>{' '}
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
                                        <p className='text-sm text-gray-500'>{comment.date}</p>
                                    </div>
                                </div>
                            ))}
                        </ScrollArea>
                        <Separator className='mt-4 bg-gray-100' />
                        <div className='mt-2 flex items-center justify-between'>
                            <p>100000 Likes</p>
                            <div className='mt-2 flex items-center gap-4'>
                                {/* <Button variant='raw' size='icon' className='hover:scale-110'>
                                    <Icon name='heart' />
                                </Button> */}
                                <ReactionButton
                                    onReact={(reaction) => {
                                        console.log(reaction);
                                    }}
                                />
                                <Button variant='raw' size='icon' className='hover:scale-110'>
                                    <Icon name='chat-rectangle' />
                                </Button>
                                <Button variant='raw' size='icon' className='hover:scale-110'>
                                    <Icon name='share' />
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
