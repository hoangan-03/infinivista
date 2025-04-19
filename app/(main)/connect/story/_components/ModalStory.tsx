import {Avatar} from '@/app/(main)/_components';
import {Icon} from '@/components/commons';
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
import {Story} from '@/mock_data/story';

import {StoryComment} from '.';

interface Props {
    open: boolean;
    data?: Story;
    onClose: () => void;
}

function ModalStory({open, data, onClose}: Props) {
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className='h-fit min-h-[90vh] min-w-[1250px] items-start'>
                <VisuallyHidden>
                    <DialogHeader className='sr-only h-fit space-y-2'>
                        <DialogTitle>Posted by {data?.username}</DialogTitle>
                        <DialogDescription>{data?.description}</DialogDescription>
                    </DialogHeader>
                </VisuallyHidden>
                <div className='flex items-center gap-4'>
                    <div className='w-3/5'>
                        {data?.videoUrl ? (
                            <div className='relative aspect-video h-full'>
                                <video className='h-full w-full rounded-l-lg object-cover' controls playsInline>
                                    <source src={data.videoUrl} type='video/mp4' />
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                        ) : (
                            <div className='flex h-[60vh] items-center justify-center rounded-l-lg bg-gray-100'>
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
                        <ScrollArea className='h-[60vh] max-h-[60vh]'>
                            {comments.map((comment, index) => (
                                <StoryComment key={index} data={comment} />
                            ))}
                        </ScrollArea>
                        <Separator className='mt-4 bg-gray-100' />
                        <div className='mt-2 flex items-center justify-between'>
                            <p>100000 Likes</p>
                            <div className='mt-2 flex items-center gap-4'>
                                <Button variant='raw' size='icon' className='hover:scale-110'>
                                    <Icon name='heart' />
                                </Button>
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
