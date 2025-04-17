import {Avatar} from '@/app/(main)/_components';
import {Icon} from '@/components/commons';
import {Comment} from '@/mock_data/comment';

interface Props {
    data?: Comment;
}

function StoryComment({data}: Props) {
    return (
        <div className='mt-4 space-y-2'>
            <div className='flex gap-2'>
                <Avatar />
                <div className='flex w-[90%] justify-between gap-2'>
                    <p className='w-[90%] text-sm text-gray-500'>
                        <span className='w-fit font-bold text-black'>{data?.username}</span> {data?.text}
                    </p>
                    <Icon name='Like' />
                </div>
            </div>
            <div className='flex items-center justify-between'>
                <p className='text-sm text-gray-500'>{data?.likeAmount} likes</p>
                <p className='text-sm text-gray-500'>{data?.date}</p>
            </div>
        </div>
    );
}

export default StoryComment;
