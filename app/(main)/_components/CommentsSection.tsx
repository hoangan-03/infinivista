import React from 'react';

import {Icon, IconButton} from '@/components/commons';
import {Separator} from '@/components/ui';
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from '@/components/ui/dialog';
import {cn} from '@/lib/utils';
import {getSumReactions} from '@/lib/utils';

import {Comment} from './Comment';
import {CommentInput} from './CommentInput';
import {ReactButton} from './ReactButton';

type ReactionType = 'like' | 'love' | 'sad';

interface CommentsSectionProps {
    dialogOpen: boolean;
    setDialogOpen: (dialogOpen: boolean) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    reactionList: any[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    commentList: any[];
    handleClickReact: (event: React.MouseEvent<HTMLButtonElement>, reactionType: ReactionType) => void;
    handleSaveComment: (commentText: string) => void;
    className?: string;
}

export const CommentsSection: React.FC<CommentsSectionProps> = ({
    dialogOpen,
    setDialogOpen,
    reactionList,
    commentList,
    handleClickReact,
    handleSaveComment,
    className,
}) => {
    const reactionCount = getSumReactions(reactionList);
    const commentCount = commentList.length;

    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <IconButton
                label='Open comments section'
                defaultName='Comment'
                hoverName='Comment_filled'
                onClick={() => setDialogOpen(true)}
            />
            <DialogContent className={cn('dialog-content', className)}>
                <DialogHeader>
                    <DialogTitle className='comments-section-header flex gap-4'>
                        <div className='flex items-center gap-1'>
                            <ReactButton reactionList={reactionList} handleClickReact={handleClickReact} />
                            {reactionCount}
                        </div>
                        <Separator orientation='vertical' className='w-[2px] bg-black' />
                        <div className='flex items-center gap-1'>
                            <Icon name='Comment' />
                            {commentCount}
                        </div>
                    </DialogTitle>
                </DialogHeader>
                <DialogDescription />
                <div className='comments-section-content flex h-[calc(90vh-4.5rem)] flex-col justify-between gap-5'>
                    <div className='comments-section-content-comments custom-scrollbar flex h-full flex-col items-center gap-5 overflow-y-auto'>
                        {commentList.map((comment) => {
                            return <Comment key={comment.id} comment={comment} />;
                        })}
                        <div className='flex w-full flex-col items-center gap-2'>
                            <Separator className='w-1/2 bg-gray-200' />
                            <p className='text-paragraph2 text-gray-200'>No more comments</p>
                        </div>
                    </div>
                    <CommentInput onSubmit={handleSaveComment} placeholder='Add a comment...' variant='with-icon' />
                </div>
            </DialogContent>
        </Dialog>
    );
};
