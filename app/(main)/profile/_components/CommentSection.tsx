/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import {Icon} from '@/components/commons';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {cn} from '@/lib/utils';

import {getSumReactions} from '../utils/utils';
import Comment from './Comment';
import CommentInput from './CommentInput';
import ReactButton from './ReactButton';

type ReactionType = 'like' | 'love' | 'sad';

interface CommentSectionProps {
    reactionList: any[];
    commentList: any[];
    handleClickReact: (event: React.MouseEvent<HTMLButtonElement>, reactionType: ReactionType) => void;
    handleSaveComment: (commentText: string) => void;
    className?: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({
    reactionList,
    commentList,
    handleClickReact,
    handleSaveComment,
    className,
}) => {
    const reactionCount = getSumReactions(reactionList);
    const commentCount = commentList.length;

    return (
        <Dialog>
            <DialogTrigger>
                <Icon name='Comment' width={24} height={24} />
            </DialogTrigger>
            <DialogContent id='dialog-content' className={cn(className)}>
                {/* FIX THIS DIALOGHEADER (height not fit to parent) */}
                <DialogHeader>
                    <DialogTitle id='commentsection-header' className='flex gap-4'>
                        <div className='flex items-center gap-1'>
                            <ReactButton reactionList={reactionList} handleClickReact={handleClickReact} />
                            {reactionCount}
                        </div>
                        <div id='divider' className='h-full w-[2px] bg-black' />
                        <div className='flex items-center gap-1'>
                            <Icon name='Comment' width={24} height={24} />
                            {commentCount}
                        </div>
                    </DialogTitle>
                    <DialogDescription
                        id='commentsection-content'
                        className='flex h-[calc(90vh-4.5rem)] flex-col justify-between gap-5 pt-5'
                    >
                        <div
                            id='commentsection-content-comments'
                            className='custom-scrollbar flex h-full flex-col items-center gap-5 overflow-y-auto'
                        >
                            {commentList.map((comment, index) => {
                                return <Comment key={comment.id} comment={comment} />;
                            })}
                            <div className='flex w-full flex-col items-center gap-2'>
                                <hr className='w-1/2' />
                                <p2 className='text-gray-200'>No more comments</p2>
                            </div>
                        </div>
                        <CommentInput onSubmit={handleSaveComment} placeholder='Add a comment...' variant='with-icon' />
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default CommentSection;