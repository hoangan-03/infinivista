import React from 'react';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {Icon} from '@/components/commons';
import {cn} from '@/lib/utils';
import Comment from './Comment';
import ReactButton from './ReactButton';
import {getSumReactions} from '../utils/utils';

interface CommentSectionProps {
    reactionList: any[];
    commentList: any[];
    className?: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({reactionList, commentList, className}) => {
    const reactionCount = getSumReactions(reactionList);
    const commentCount = commentList.length;

    return (
        <Dialog>
            <DialogTrigger>
                <Icon name='Comment' width={24} height={24} />
            </DialogTrigger>
            <DialogContent className={cn(className)}>
                <DialogHeader>
                    <DialogTitle className='flex gap-4'>
                        <div className='flex items-center gap-1'>
                            <ReactButton reactionList={reactionList} />
                            {reactionCount}
                        </div>
                        <div className='h-full w-[2px] bg-black' />
                        <div className='flex items-center gap-1'>
                            <Icon name='Comment' width={24} height={24} />
                            {commentCount}
                        </div>
                    </DialogTitle>
                    <DialogDescription className='flex flex-col gap-5 py-5'>
                        {commentList.map((comment, index) => {
                            return <Comment key={comment.id} comment={comment} />;
                        })}
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default CommentSection;
