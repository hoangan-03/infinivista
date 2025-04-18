'use client';

import React, {useState} from 'react';

import {IconButton} from '@/components/commons';
import {Separator} from '@/components/ui';
import {cn, getSumReactions, getTimeStamp} from '@/lib/utils';
import {Post as IPost} from '@/mock_data/post';

import {Avatar} from './Avatar';
import {CommentInput} from './CommentInput';
import {CommentsSection} from './CommentsSection';
import {ModalMultimedia} from './ModalMultimedia';
import {ReactButton} from './ReactButton';

interface PostProps {
    data: IPost;
    className?: string;
}

const maxNumberOfDisplays = 3;

export const Post: React.FC<PostProps> = ({data, className}) => {
    // const [, forceRerender] = React.useReducer((x) => x + 1, 0);

    // const [liked, toggleLiked] = React.useState<boolean>(false);
    const [showCommentsModal, setShowCommentsModal] = useState<boolean>(false);

    // const handleClickReact = (event: React.MouseEvent<HTMLButtonElement>, reactionType: ReactionType) => {
    //     if (!postObject) return;

    //     const reaction = postObject.reactionList.find((reaction) => reaction.type === reactionType);

    //     if (liked) {
    //         if (reaction) {
    //             reaction.people = reaction.people.filter((person) => person.username !== currentUser.username);
    //             reaction.count--;
    //             if (reaction.count === 0) {
    //                 postObject.reactionList.splice(postObject.reactionList.indexOf(reaction), 1);
    //             }
    //         }
    //     } else {
    //         if (reaction) {
    //             reaction.people.push(currentUser);
    //             reaction.count++;
    //         } else {
    //             postObject.reactionList.push({
    //                 id: Math.max(...postObject.reactionList.map((reaction) => reaction.id)) + 1,
    //                 type: reactionType,
    //                 count: 1,
    //                 people: [currentUser],
    //             });
    //         }
    //     }

    //     toggleLiked((state) => !state);
    // };

    // const handleSaveComment = (commentText: string) => {
    //     if (!postObject) return;
    //     if (commentText.trim() === '') return;

    //     const newCommentObj: Comment = {
    //         id: Math.max(...postObject.commentList.map((comment) => comment.id)) + 1,
    //         username: currentUser.username,
    //         created_by: currentUser.name,
    //         profilePic: currentUser.profilePic,
    //         created_at: new Date(),
    //         commentText,
    //     };
    //     postObject.commentList.push(newCommentObj);
    //     forceRerender(); // To update the comment count in the parent component without re-rendering the whole component
    //     console.log(postObject.commentList);
    // };

    // if (!postObject) {
    //     // Show loading indicator or placeholder
    //     return (
    //         <div className='flex h-40 items-center justify-center'>
    //             <p>Loading post...</p>
    //         </div>
    //     );
    // }

    return (
        <div
            className={cn(
                'flex min-w-fit flex-col gap-5 rounded-[1.5rem] border border-gray-100 bg-white p-7 shadow-md',
                className
            )}
        >
            <section className='post-author flex items-center gap-3'>
                <Avatar src={data.avatar} />
                <div>
                    <h6 className='post-author-name font-bold'>{data.author}</h6>
                    <p className='post-author-time text-caption font-medium text-gray-500'>
                        {getTimeStamp(data.created_at)}
                    </p>
                </div>
            </section>
            <section>
                <p className='post-text text-justify text-paragraph1 font-medium'>{data.description}</p>
            </section>

            <ModalMultimedia attachments={data.attachmentList} maxNumberOfDisplays={maxNumberOfDisplays} />

            <section>
                <div className='space-y-2'>
                    <Separator className='bg-gray-200' />
                    <div className='flex items-center justify-between gap-3'>
                        <div className='reaction-container flex items-center gap-4'>
                            <ReactButton reactionList={data.reactionList} handleClickReact={() => {}} />
                            <CommentsSection
                                dialogOpen={showCommentsModal}
                                setDialogOpen={setShowCommentsModal}
                                reactionList={data.reactionList}
                                commentList={data.commentList}
                                handleClickReact={() => {}}
                                handleSaveComment={() => {}}
                            />
                            <IconButton label='Repost' defaultName='Repost' hoverName='Repost_filled' />
                        </div>
                        <div className='share-container flex gap-4'>
                            <IconButton label='Share post' defaultName='Share' hoverName='Share_filled' />
                            <IconButton label='Save post' defaultName='Save' hoverName='Save_filled' />
                        </div>
                    </div>
                    <Separator className='bg-gray-200' />
                </div>
            </section>
            <section
                className='post-counters flex cursor-pointer items-center justify-between gap-3 whitespace-nowrap'
                onClick={() => setShowCommentsModal(true)}
            >
                <p className='w-fit text-subtitle2 font-bold'>{getSumReactions(data.reactionList)} Reactions</p>
                <div className='flex gap-3 text-gray-600'>
                    <p className='w-fit text-paragraph2'>{data.viewCount} Views</p>
                    <p className='w-fit text-paragraph2'>{data.commentList.length} Comments</p>
                    <p className='w-fit text-paragraph2'>{data.repostCount} Reposts</p>
                    <p className='w-fit text-paragraph2'>{data.shareCount} Shares</p>
                </div>
            </section>
            <section className='post-textbox'>
                <CommentInput onSubmit={() => {}} placeholder='Add a comment...' variant='with-icon' />
            </section>
        </div>
    );
};
