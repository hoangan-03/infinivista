'use client';

import React from 'react';

import {IconButton} from '@/components/commons';
import {Separator} from '@/components/ui';
import {cn} from '@/lib/utils';
import {getSumReactions, getTimeStamp} from '@/lib/utils';
import currentUser from '@/mock_data/self';

import {Avatar} from './Avatar';
import {CommentInput} from './CommentInput';
import {CommentsSection} from './CommentsSection';
import {MultimediaSection} from './MultimediaSection';
import {ReactButton} from './ReactButton';

type AttachmentType = 'image' | 'video';
type ReactionType = 'like' | 'love' | 'sad';

interface Attachment {
    id: number;
    type: AttachmentType;
    src: string;
    alt: string;
}

interface Person {
    username: string;
    name: string;
    profilePic: string;
}

interface Reaction {
    id: number;
    type: ReactionType;
    count: number;
    people: Person[];
}

interface Comment {
    id: number;
    username: string;
    created_by: string;
    profilePic: string;
    created_at: Date;
    commentText: string;
}

interface PostInterface {
    id: number;
    author: string;
    created_at: Date;
    avatar: string;
    description: string;
    attachmentList: Attachment[];
    reactionList: Reaction[];
    viewCount: number;
    commentList: Comment[];
    repostCount: number;
    shareCount: number;
}

interface PostProps {
    postObject: PostInterface | null;
    className?: string;
}

export const Post: React.FC<PostProps> = ({postObject, className}) => {
    const [, forceRerender] = React.useReducer((x) => x + 1, 0);

    const [liked, toggleLiked] = React.useState<boolean>(false);
    // const liked = postObject?.reactionList.some((reaction) => reaction.people.some((person) => person.username === currentUser.username));
    const [commentsSectionOpen, setCommentsSectionOpen] = React.useState<boolean>(false);

    const maxNumberOfDisplays = 3;

    const handleClickReact = (event: React.MouseEvent<HTMLButtonElement>, reactionType: ReactionType) => {
        console.log('Reacted');

        if (!postObject) return;

        const reaction = postObject.reactionList.find((reaction) => reaction.type === reactionType);

        if (liked) {
            if (reaction) {
                reaction.people = reaction.people.filter((person) => person.username !== currentUser.username);
                reaction.count--;
                if (reaction.count === 0) {
                    postObject.reactionList.splice(postObject.reactionList.indexOf(reaction), 1);
                }
            }
        } else {
            if (reaction) {
                reaction.people.push(currentUser);
                reaction.count++;
            } else {
                postObject.reactionList.push({
                    id: Math.max(...postObject.reactionList.map((reaction) => reaction.id)) + 1,
                    type: reactionType,
                    count: 1,
                    people: [currentUser],
                });
            }
        }

        toggleLiked((state) => !state);
    };

    const handleSaveComment = (commentText: string) => {
        if (!postObject) return;
        if (commentText.trim() === '') return;

        const newCommentObj: Comment = {
            id: Math.max(...postObject.commentList.map((comment) => comment.id)) + 1,
            username: currentUser.username,
            created_by: currentUser.name,
            profilePic: currentUser.profilePic,
            created_at: new Date(),
            commentText,
        };
        postObject.commentList.push(newCommentObj);
        forceRerender(); // To update the comment count in the parent component without re-rendering the whole component
        console.log(postObject.commentList);
    };

    if (!postObject) {
        // Show loading indicator or placeholder
        return (
            <div className='flex h-40 items-center justify-center'>
                <p>Loading post...</p>
            </div>
        );
    }

    return (
        <div
            className={cn(
                'flex min-w-fit flex-col gap-5 rounded-[1.5rem] border border-gray-100 bg-white p-7 shadow-lg',
                className
            )}
        >
            <section className='post-author flex items-center gap-3'>
                <Avatar src={postObject?.avatar} />
                <div>
                    <h6 className='post-author-name font-bold'>{postObject?.author}</h6>
                    <p className='post-author-time text-caption font-medium text-gray-500'>
                        {getTimeStamp(postObject?.created_at)}
                    </p>
                </div>
            </section>
            <section>
                <p className='post-text text-justify text-paragraph1 font-medium'>{postObject?.description}</p>
            </section>

            <MultimediaSection attachmentList={postObject.attachmentList} maxNumberOfDisplays={maxNumberOfDisplays} />

            <section className='post-comments'>
                <div className='button-bar flex flex-col gap-2'>
                    <Separator className='bg-gray-200' />
                    <div className='flex items-center justify-between gap-3'>
                        <div className='reaction-container flex items-center gap-4'>
                            <ReactButton reactionList={postObject?.reactionList} handleClickReact={handleClickReact} />
                            <CommentsSection
                                dialogOpen={commentsSectionOpen}
                                setDialogOpen={setCommentsSectionOpen}
                                reactionList={postObject?.reactionList}
                                commentList={postObject?.commentList}
                                handleClickReact={handleClickReact}
                                handleSaveComment={handleSaveComment}
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
                onClick={() => setCommentsSectionOpen(true)}
            >
                <p className='w-fit text-subtitle2 font-bold'>{getSumReactions(postObject?.reactionList)} Reactions</p>
                <div className='flex gap-3 text-gray-600'>
                    <p className='w-fit text-paragraph2'>{postObject?.viewCount} Views</p>
                    <p className='w-fit text-paragraph2'>{postObject?.commentList.length} Comments</p>
                    <p className='w-fit text-paragraph2'>{postObject?.repostCount} Reposts</p>
                    <p className='w-fit text-paragraph2'>{postObject?.shareCount} Shares</p>
                </div>
            </section>
            <section className='post-textbox'>
                <CommentInput onSubmit={handleSaveComment} placeholder='Add a comment...' variant='with-icon' />
                {/* <p className={cn('text-heading5 text-white')}>kjfhasdjklfhlkjfjklasf</p> */}
                {/* <p className={`text-heading5 text-white`}>kjfhasdjklfhlkjfjklasf</p> */}
            </section>
        </div>
    );
};
