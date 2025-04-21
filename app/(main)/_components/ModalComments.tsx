import React from 'react';

import {Avatar, Icon} from '@/components/commons';
import {Input, Separator} from '@/components/ui';
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from '@/components/ui/dialog';
import {getSumReactions, getTimeStamp} from '@/lib/utils';
import {IComment} from '@/mock_data/comment';
import {REACTION_TYPE} from '@/mock_data/post';

import {ReactionButton} from '.';

interface ModalCommentsProps {
    open: boolean;
    onClose: () => void;
    reactions: {count: number}[];
    comments: IComment[];
}

export const ModalComments: React.FC<ModalCommentsProps> = ({open, onClose, reactions, comments}) => {
    const reactionCount = getSumReactions(reactions);
    const commentCount = comments.length;

    const handleClickReact = (reaction: REACTION_TYPE) => {
        console.log('reaction', reaction);
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent autoFocus={false}>
                <DialogHeader>
                    <DialogTitle className='flex gap-4'>
                        <div className='flex items-center gap-1'>
                            <ReactionButton onReact={handleClickReact} />
                            {reactionCount}
                        </div>
                        <Separator orientation='vertical' className='w-[2px] bg-black' />
                        <div className='flex items-center gap-1'>
                            <Icon name='chat-rectangle' />
                            {commentCount}
                        </div>
                    </DialogTitle>
                    <DialogDescription />
                </DialogHeader>
                <div className='flex h-[calc(90vh-4.5rem)] flex-col justify-between gap-5'>
                    <div className='custom-scrollbar flex h-full flex-col items-center gap-5 overflow-y-auto'>
                        {comments.map((comment, index) => (
                            <div
                                key={index}
                                className='flex w-full items-center gap-3 rounded-md bg-gray-100 px-3 py-2'
                            >
                                <Avatar
                                    src={comment.avatar}
                                    alt={'Avatar of ' + comment.username}
                                    className='min-w-10'
                                />
                                <div className={'w-full'}>
                                    <div className='flex items-center justify-between gap-2'>
                                        <p className='text-paragraph1 font-bold'>{comment.username}</p>
                                        <p className='text-caption'>{getTimeStamp(comment.createdAt)}</p>
                                    </div>
                                    <p className='text-paragraph2'>{comment.text}</p>
                                </div>
                            </div>
                        ))}
                        <div className='flex w-full flex-col items-center gap-2'>
                            <Separator className='w-1/2 bg-gray-200' />
                            <p className='text-paragraph2 text-gray-200'>No more comments</p>
                        </div>
                    </div>
                    <Input
                        type='text'
                        placeholder='Add a comment...'
                        className='text-paragraph2'
                        suffixIcon={
                            <>
                                <Icon name='happy' className='block group-hover:hidden' />
                                <Icon name='happy-filled' className='hidden group-hover:block' />
                            </>
                        }
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
};
