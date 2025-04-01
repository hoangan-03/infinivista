import React from 'react';

import {cn} from '@/lib/utils';
import {getTimeStamp} from '@/lib/utils';

import {Avatar} from './Avatar';

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

export const Comment: React.FC<CommentProps> = ({comment, className}) => {
    return (
        <div id={'comment-' + comment.id} className='flex w-full items-center gap-3 rounded-md bg-gray-100 px-3 py-2'>
            <Avatar src={comment.profilePic} alt={'Avatar of ' + comment.created_by} className='min-w-10' />
            <div className={cn('comment-content', 'w-full', className)}>
                <div className='flex items-center justify-between gap-2'>
                    <p className='comment-username text-paragraph1 font-bold'>{comment.created_by}</p>
                    <p className='comment-date text-caption'>{getTimeStamp(comment.created_at)}</p>
                </div>
                <p className='comment-text text-paragraph2'>{comment.commentText}</p>
            </div>
        </div>
    );
};
