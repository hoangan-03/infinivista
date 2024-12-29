import React from 'react';
import {cn} from '@/lib/utils';
import Avatar from './Avatar';
import {getTimeStamp} from '../utils/utils';

interface Comment {
    id: number;
    created_by: string;
    profilePic: string;
    created_at: Date;
    commentText: string;
}

interface CommentProps {
    comment: Comment;
    className?: string;
}

const Comment: React.FC<CommentProps> = ({comment, className}) => {
    return (
        <div id={'comment-' + comment.id} className='flex w-full gap-3 rounded-md bg-gray-100 px-3 py-2'>
            <Avatar src={comment.profilePic} alt={'Avatar of ' + comment.created_by} className='min-w-10' />
            <div id='comment-content' className={cn('w-full', className)}>
                <div className='flex items-center justify-between gap-2'>
                    <p1 id='comment-username' className='font-bold'>
                        {comment.created_by}
                    </p1>
                    <cap id='comment-date'>{getTimeStamp(comment.created_at)}</cap>
                </div>
                <p2 id='comment-text'>{comment.commentText}</p2>
            </div>
        </div>
    );
};

export default Comment;
