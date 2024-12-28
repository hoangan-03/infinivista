import React from 'react';
import {cn} from '@/lib/utils';
import Avatar from './Avatar';
import {Icon} from '@/components/commons';
import {Plus} from 'lucide-react';

const postMockupData = {
    id: 1,
    author: 'John Doe',
    time: new Date(),
    avatar: '',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet quam non lectus facilisis consectetur.',
    multimedia: [
        {
            id: 2,
            type: 'image',
            src: 'https://res.cloudinary.com/dght74v9o/image/upload/v1735408648/cld-sample-4.jpg',
            alt: 'Image 1',
        },
        {
            id: 3,
            type: 'video',
            src: 'https://res.cloudinary.com/dght74v9o/video/upload/v1735408640/samples/elephants.mp4',
            alt: 'Video 1',
        },
        {
            id: 4,
            type: 'image',
            src: 'https://res.cloudinary.com/dght74v9o/image/upload/v1735408639/samples/landscapes/beach-boat.jpg',
            alt: 'Image 2',
        },
        {
            id: 5,
            type: 'video',
            src: 'https://res.cloudinary.com/dght74v9o/video/upload/v1735408641/samples/cld-sample-video.mp4',
            alt: 'Video 2',
        },
        {
            id: 6,
            type: 'video',
            src: 'https://res.cloudinary.com/dght74v9o/image/upload/v1735408639/samples/ecommerce/leather-bag-gray.jpg',
            alt: 'Image 3',
        },
    ],
    reactions: [
        {
            id: 7, // Updated ID for reaction
            type: 'like',
            count: 5,
            people: [
                {
                    id: 8,
                    name: 'Alice',
                    profilePic: 'alice.jpg',
                },
                {
                    id: 9,
                    name: 'Bob',
                    profilePic: 'bob.jpg',
                },
            ],
        },
        {
            id: 10, // Updated ID for reaction
            type: 'reply',
            count: 3,
            people: [
                {
                    id: 11,
                    name: 'Charlie',
                    profilePic: 'charlie.jpg',
                },
            ],
        },
        {
            id: 12, // Updated ID for reaction
            type: 'love',
            count: 2,
            people: [
                {
                    id: 13,
                    name: 'David',
                    profilePic: 'david.jpg',
                },
            ],
        },
    ],
    comments: [
        {
            id: 14, // Updated ID for comment
            author: 'Jane Smith',
            text: 'Great post! Thanks for sharing.',
        },
        {
            id: 15, // Updated ID for comment
            author: 'Bob Johnson',
            text: 'I agree. It was very informative.',
        },
    ],
    reposts: 7,
};

interface PostProps {
    className?: string;
}

const Post: React.FC<PostProps> = ({className}) => {
    const getTimeStamp = (time: Date): string => {
        const timeOffset: number = (new Date().getTime() - postMockupData.time.getTime()) / 1000;
        let timeStamp: string;
        if (timeOffset < 60) {
            const seconds = Math.floor(timeOffset);
            timeStamp = seconds >= 30 ? `${seconds} second${seconds !== 1 && 's'} ago` : 'Just now';
        } else if (timeOffset < 3600) {
            const minutes = Math.floor(timeOffset / 60);
            timeStamp = `${minutes} minute${minutes !== 1 && 's'} ago`;
        } else if (timeOffset < 86400) {
            const hours = Math.floor(timeOffset / 3600);
            timeStamp = `${hours} hour${hours !== 1 && 's'} ago`;
        } else if (timeOffset < 604800) {
            const days = Math.floor(timeOffset / 86400);
            timeStamp = `${days} day${days !== 1 && 's'} ago`;
        } else {
            timeStamp = postMockupData.toString();
        }

        return timeStamp;
    };

    return (
        <div id='post-frame' className={cn('flex flex-col gap-5 rounded-[1.5rem] p-7 shadow-xl', className)}>
            <section id='post-author' className='flex items-center gap-3'>
                <Avatar src={postMockupData.avatar} />
                <div>
                    <h6 id='post-author-name' className='font-bold'>
                        {postMockupData.author}
                    </h6>
                    <c id='post-author-time' className='font-medium text-gray-500'>
                        {getTimeStamp(postMockupData.time)}
                    </c>
                </div>
            </section>
            <section id='post-text'>
                <p1 className='text-justify font-medium'>{postMockupData.text}</p1>
            </section>
            <section id='post-multimedia' className='grid grid-cols-[repeat(auto-fill,_minmax(180px,_1fr))] gap-3'>
                {postMockupData.multimedia.map(
                    (media, index) =>
                        index < 4 && (
                            <div
                                id={media.type + '-' + media.id}
                                key={media.id}
                                className={`relative h-full w-full rounded-xl object-cover`}
                            >
                                {index === 3 && (
                                    <Icon
                                        name='Plus'
                                        width='30%'
                                        height='30%'
                                        className='absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transform select-none text-[4rem] text-white'
                                    />
                                )}
                                <div className={`h-full w-full ${index === 3 && 'brightness-[10%] filter'}}`}>
                                    {media.type === 'image' && (
                                        <img
                                            src={media.src}
                                            alt={media.alt}
                                            className='h-full w-full rounded-xl object-cover'
                                        />
                                    )}
                                    {media.type === 'video' && (
                                        <video controls={index < 3} className='h-full w-full rounded-xl object-cover'>
                                            <source src={media.src} type='video/mp4' />
                                        </video>
                                    )}
                                </div>
                            </div>
                        )
                )}
            </section>
            <section id='post-comments'>Comments</section>
        </div>
    );
};

export default Post;
