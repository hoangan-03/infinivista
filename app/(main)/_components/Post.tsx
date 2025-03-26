'use client';

import React from 'react';
import {cn} from '@/lib/utils';

import Avatar from './Avatar';
import {Icon} from '@/components/commons';
import CommentInput from './CommentInput';

import currentUser from '@/mock_data/self';
import CommentSection from './CommentSection';
import ReactButton from './ReactButton';
import {getSumReactions, getTimeStamp} from '@/lib/utils';
import MultimediaSection from './MultimediaSection';

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
    postObj: PostInterface | null;
    className?: string;
}

const Post: React.FC<PostProps> = ({postObj, className}) => {
    const [, forceRerender] = React.useReducer((x) => x + 1, 0);

    const [liked, toggleLiked] = React.useState<boolean>(false);
    // const liked = postObj?.reactionList.some((reaction) => reaction.people.some((person) => person.username === currentUser.username));

    const maxNumberOfDisplays = 3;

    const handleClickReact = (event: React.MouseEvent<HTMLButtonElement>, reactionType: ReactionType) => {
        console.log('Reacted');

        if (!postObj) return;

        const reaction = postObj.reactionList.find((reaction) => reaction.type === reactionType);

        if (liked) {
            if (reaction) {
                reaction.people = reaction.people.filter((person) => person.username !== currentUser.username);
                reaction.count--;
                if (reaction.count === 0) {
                    postObj.reactionList.splice(postObj.reactionList.indexOf(reaction), 1);
                }
            }
        } else {
            if (reaction) {
                reaction.people.push(currentUser);
                reaction.count++;
            } else {
                postObj.reactionList.push({
                    id: Math.max(...postObj.reactionList.map((reaction) => reaction.id)) + 1,
                    type: reactionType,
                    count: 1,
                    people: [currentUser],
                });
            }
        }

        toggleLiked((state) => !state);
    };

    const handleSaveComment = (commentText: string) => {
        if (!postObj) return;
        if (commentText.trim() === '') return;

        const newCommentObj: Comment = {
            id: Math.max(...postObj.commentList.map((comment) => comment.id)) + 1,
            username: currentUser.username,
            created_by: currentUser.name,
            profilePic: currentUser.profilePic,
            created_at: new Date(),
            commentText,
        };
        postObj.commentList.push(newCommentObj);
        forceRerender(); // To update the comment count in the parent component without re-rendering the whole component
        console.log(postObj.commentList);
    };

    if (!postObj) {
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
                'post-frame',
                'flex min-w-fit flex-col gap-5 rounded-[1.5rem] border border-gray-100 bg-white p-7 shadow-lg',
                className
            )}
        >
            <section className='post-author flex items-center gap-3'>
                <Avatar src={postObj?.avatar} />
                <div>
                    <h6 className='post-author-name font-bold'>{postObj?.author}</h6>
                    <cap className='post-author-time font-medium text-gray-500'>
                        {getTimeStamp(postObj?.created_at)}
                    </cap>
                </div>
            </section>
            <section>
                <p1 className='post-text text-justify font-medium'>{postObj?.description}</p1>
            </section>

            <MultimediaSection attachmentList={postObj.attachmentList} maxNumberOfDisplays={maxNumberOfDisplays} />

            <section className='post-comments'>
                <div className='button-bar flex flex-col gap-2'>
                    <hr />
                    <div className='flex items-center justify-between gap-3'>
                        <div className='reaction-container flex gap-4'>
                            <ReactButton reactionList={postObj?.reactionList} handleClickReact={handleClickReact} />
                            <CommentSection
                                reactionList={postObj?.reactionList}
                                commentList={postObj?.commentList}
                                handleClickReact={handleClickReact}
                                handleSaveComment={handleSaveComment}
                            />
                            <button>
                                <Icon name='Repost' width={24} height={24} />
                            </button>
                        </div>
                        <div className='share-container flex gap-4'>
                            <button>
                                <Icon name='Share' width={24} height={24} className='text-[1.5rem]' />
                            </button>
                            <button>
                                <Icon name='Save' width={24} height={24} />
                            </button>
                        </div>
                    </div>
                    <hr />
                </div>
            </section>
            <section className='post-counters flex items-center justify-between gap-3 whitespace-nowrap'>
                <subtitle2 className='w-fit font-bold'>{getSumReactions(postObj?.reactionList)} Reactions</subtitle2>
                <div className='flex gap-3 text-gray-600'>
                    <p2 className='w-fit'>{postObj?.viewCount} Views</p2>
                    <p2 className='w-fit'>{postObj?.commentList.length} Comments</p2>
                    <p2 className='w-fit'>{postObj?.repostCount} Reposts</p2>
                    <p2 className='w-fit'>{postObj?.shareCount} Shares</p2>
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

export default Post;
