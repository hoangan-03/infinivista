'use client';

import React from 'react';
import {cn} from '@/lib/utils';

import Avatar from './Avatar';
import {Icon} from '@/components/commons';
import CommentInput from './CommentInput';

import CurrentUser from '../mockData/self';
import CommentSection from './CommentSection';
import ReactButton from './ReactButton';
import {getSumReactions, getTimeStamp} from '../utils/utils';

type AttachmentType = 'image' | 'video';
type ReactionType = 'like' | 'love' | 'sad';

interface Attachment {
    id: number;
    type: AttachmentType;
    src: string;
    alt: string;
}

interface Person {
    id: number;
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
    post: PostInterface | null;
    className?: string;
}

const Post: React.FC<PostProps> = ({post, className}) => {
    const [postObj, setPostObj] = React.useState<PostInterface | null>(post);

    React.useEffect(() => {
        setPostObj(post);
    }, []);

    const maxNumberOfDisplays = 3;

    const handleClickReact = (
        event: React.MouseEvent<HTMLButtonElement>,
        reactionType: ReactionType
    ) => {
        console.log('Reacted');

        if (!postObj) return;

        const liked = postObj.reactionList.some((reaction) =>
            reaction.people.some((person) => person.id === CurrentUser.id)
        );
        const reaction = postObj.reactionList.find(
            (reaction) => reaction.type === reactionType
        );

        const updatedReactionList = [...postObj.reactionList];

        if (liked) {
            if (reaction) {
                reaction.people = reaction.people.filter(
                    (person) => person.id !== CurrentUser.id
                );
                reaction.count--;
                if (reaction.count === 0) {
                    updatedReactionList.splice(
                        updatedReactionList.indexOf(reaction),
                        1
                    );
                }
            }
        } else {
            if (reaction) {
                reaction.people.push(CurrentUser);
                reaction.count++;
            } else {
                updatedReactionList.push({
                    id: Math.max(...updatedReactionList.map((r) => r.id)) + 1,
                    type: reactionType,
                    count: 1,
                    people: [CurrentUser],
                });
            }
        }

        setPostObj({ ...postObj, reactionList: updatedReactionList });
    };

    if (!postObj) {
        // Show loading indicator or placeholder
        return (
            <div className="flex items-center justify-center h-40">
                <p>Loading post...</p>
            </div>
        );
    }

    return (
        <div
            id='post-frame'
            className={cn(
                'flex min-w-fit flex-col gap-5 rounded-[1.5rem] border-[1px] border-gray-100 bg-white p-7 shadow-lg',
                className
            )}
        >
            <section id='post-author' className='flex items-center gap-3'>
                <Avatar src={postObj?.avatar} />
                <div>
                    <h6 id='post-author-name' className='font-bold'>
                        {postObj?.author}
                    </h6>
                    <cap id='post-author-time' className='font-medium text-gray-500'>
                        {getTimeStamp(postObj?.created_at)}
                    </cap>
                </div>
            </section>
            <section id='post-text'>
                <p1 className='text-justify font-medium'>{postObj?.description}</p1>
            </section>
            <section
                id='post-multimedia'
                className='grid auto-rows-fr grid-cols-[repeat(auto-fill,_minmax(188px,_1fr))] gap-3'
            >
                {postObj?.attachmentList.map((media, index) => {
                    const length = postObj?.attachmentList.length;
                    const overflow = length > maxNumberOfDisplays;
                    const lastDisplayIndex = maxNumberOfDisplays - 1;

                    return (
                        index < maxNumberOfDisplays && (
                            <div
                                id={media.type + '-' + media.id}
                                key={media.id}
                                className='relative h-full w-full rounded-xl object-cover shadow-sm'
                            >
                                {index === lastDisplayIndex && overflow && (
                                    // <Icon
                                    //     name='Plus'
                                    //     width='30%'
                                    //     height='30%'
                                    //     className='absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transform select-none text-[4rem] text-white'
                                    // />
                                    <div className='absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transform select-none text-[4rem] text-white'>
                                        {length - 2}+
                                    </div>
                                )}
                                <div
                                    className={cn(
                                        'h-full w-full',
                                        index === lastDisplayIndex && overflow && 'brightness-[10%] filter'
                                    )}
                                >
                                    {media.type === 'image' && (
                                        <img
                                            src={media.src}
                                            alt={media.alt}
                                            className='h-full w-full rounded-xl object-cover'
                                        />
                                    )}
                                    {media.type === 'video' && (
                                        <video
                                            controls={!(lastDisplayIndex && overflow)}
                                            className='h-full w-full rounded-xl object-cover'
                                        >
                                            <source src={media.src} type='video/mp4' />
                                        </video>
                                    )}
                                </div>
                            </div>
                        )
                    );
                })}
            </section>
            <section id='post-comments'>
                <div id='button-bar' className='flex flex-col gap-2'>
                    <hr />
                    <div className='flex items-center justify-between gap-3'>
                        <div id='react-container' className='flex gap-4'>
                            {/* <ReactButton reactionList={postObj?.reactionList} handleClickReact={handleClickReact} /> */}
                            {/* <CommentSection reactionList={postObj?.reactionList} commentList={postObj?.commentList} /> */}
                            <button>
                                <Icon name='Repost' width={24} height={24} />
                            </button>
                        </div>
                        <div id='share-container' className='flex gap-4'>
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
            <section id='post-counters' className='flex items-center justify-between gap-3 whitespace-nowrap'>
                <subtitle2 className='w-fit font-bold'>{getSumReactions(postObj?.reactionList)} Reactions</subtitle2>
                <div className='flex gap-3 text-gray-600'>
                    <p2 className='w-fit'>{postObj?.viewCount} Views</p2>
                    <p2 className='w-fit'>{postObj?.commentList.length} Comments</p2>
                    <p2 className='w-fit'>{postObj?.repostCount} Reposts</p2>
                    <p2 className='w-fit'>{postObj?.shareCount} Shares</p2>
                </div>
            </section>
            <section id='post-textbox'>
                <CommentInput placeholder='Add a comment...' variant='with-icon' />
                {/* <p className={cn('text-heading5 text-white')}>kjfhasdjklfhlkjfjklasf</p> */}
                {/* <p className={`text-heading5 text-white`}>kjfhasdjklfhlkjfjklasf</p> */}
            </section>
        </div>
    );
};

export default Post;
