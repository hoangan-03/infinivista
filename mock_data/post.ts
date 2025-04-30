import {IComment} from './comment';

export enum ATTACHMENT_TYPE {
    IMAGE = 'image',
    VIDEO = 'video',
}

export enum REACTION_TYPE {
    LIKE = 'like',
    LOVE = 'love',
    CARE = 'care',
    HAHA = 'haha',
    WOW = 'wow',
    SAD = 'sad',
    ANGRY = 'angry',
}

export interface IAttachment {
    id: number;
    type: ATTACHMENT_TYPE;
    src: string;
    alt: string;
}

export interface IPerson {
    username: string;
    name: string;
    avatar: string;
}

export interface IReaction {
    id: number;
    type: REACTION_TYPE;
    count: number;
    people: IPerson[];
}

export interface IPost {
    id: number;
    author: string;
    createdAt: Date;
    avatar: string;
    description: string;
    attachments: IAttachment[];
    reactions: IReaction[];
    comments: IComment[];
    viewCount: number;
    repostCount: number;
    shareCount: number;
}

export const posts: IPost[] = [
    {
        id: 1,
        author: 'John Nguyen',
        createdAt: new Date(),
        avatar: '/assets/images/avatar.jpg',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet quam non lectus facilisis consectetur.',
        attachments: [
            {
                id: 2,
                type: ATTACHMENT_TYPE.IMAGE,
                src: 'https://res.cloudinary.com/dght74v9o/image/upload/v1735408648/cld-sample-4.jpg',
                alt: 'Image 1',
            },
            {
                id: 3,
                type: ATTACHMENT_TYPE.IMAGE,
                src: 'https://res.cloudinary.com/dght74v9o/image/upload/v1735408639/samples/landscapes/beach-boat.jpg',
                alt: 'Image 2',
            },
            // {
            //     id: 4,
            //     type: 'video',
            //     src: 'https://res.cloudinary.com/dght74v9o/video/upload/v1735408640/samples/elephants.mp4',
            //     alt: 'Video 1',
            // },
            {
                id: 5,
                type: ATTACHMENT_TYPE.VIDEO,
                src: 'https://res.cloudinary.com/dght74v9o/video/upload/v1735408641/samples/cld-sample-video.mp4',
                alt: 'Video 2',
            },
            {
                id: 6,
                type: ATTACHMENT_TYPE.IMAGE,
                src: 'https://res.cloudinary.com/dght74v9o/image/upload/v1735408639/samples/ecommerce/leather-bag-gray.jpg',
                alt: 'Image 3',
            },
            {
                id: 7,
                type: ATTACHMENT_TYPE.IMAGE,
                src: 'https://res.cloudinary.com/dght74v9o/image/upload/v1735408639/samples/ecommerce/leather-bag-gray.jpg',
                alt: 'Image 3',
            },
            {
                id: 8,
                type: ATTACHMENT_TYPE.IMAGE,
                src: 'https://res.cloudinary.com/dght74v9o/image/upload/v1735408639/samples/ecommerce/leather-bag-gray.jpg',
                alt: 'Image 3',
            },
        ],
        reactions: [
            {
                id: 7,
                type: REACTION_TYPE.LIKE,
                count: 5,
                people: [
                    {
                        username: 'alice',
                        name: 'Alice',
                        avatar: 'alice.jpg',
                    },
                    {
                        username: 'bob',
                        name: 'Bob',
                        avatar: 'bob.jpg',
                    },
                ],
            },
            {
                id: 10,
                type: REACTION_TYPE.LOVE,
                count: 3,
                people: [
                    {
                        username: 'charlie',
                        name: 'Charlie',
                        avatar: 'charlie.jpg',
                    },
                ],
            },
            {
                id: 12,
                type: REACTION_TYPE.SAD,
                count: 2,
                people: [
                    {
                        username: 'david',
                        name: 'David',
                        avatar: 'david.jpg',
                    },
                ],
            },
        ],
        viewCount: 3000,
        comments: [
            {
                id: 14,
                username: 'jane-smith',
                avatar: 'https://res.cloudinary.com/dght74v9o/image/upload/v1735408640/samples/landscapes/nature-mountains.jpg',
                createdAt: new Date(),
                text: 'Great post! Thanks for sharing.',
                date: '10 weeks ago',
                likeAmount: 5000,
            },
            {
                id: 15,
                username: 'bob-johnson',
                avatar: '',
                createdAt: new Date(),
                text: 'I agree. It was very informative.',
                likeAmount: 5000,
                date: '10 weeks ago',
            },
        ],
        repostCount: 10,
        shareCount: 7,
    },
    {
        id: 2,
        author: 'Jane Doe',
        createdAt: new Date(),
        avatar: '/assets/images/avatar.jpg',
        description: 'Exploring the beauty of nature through photography.',
        attachments: [
            {
                id: 21,
                type: ATTACHMENT_TYPE.IMAGE,
                src: 'https://res.cloudinary.com/demo/image/upload/sample.jpg',
                alt: 'Sample Image',
            },
            {
                id: 22,
                type: ATTACHMENT_TYPE.IMAGE,
                src: 'https://res.cloudinary.com/demo/image/upload/samples/landscapes/nature-mountains.jpg',
                alt: 'Mountain Landscape',
            },
            {
                id: 23,
                type: ATTACHMENT_TYPE.VIDEO,
                src: 'https://res.cloudinary.com/demo/video/upload/dog.mp4',
                alt: 'Dog Video',
            },
        ],
        reactions: [
            {
                id: 24,
                type: REACTION_TYPE.LIKE,
                count: 8,
                people: [
                    {
                        username: 'emma',
                        name: 'Emma',
                        avatar: 'emma.jpg',
                    },
                    {
                        username: 'liam',
                        name: 'Liam',
                        avatar: 'liam.jpg',
                    },
                ],
            },
            {
                id: 25,
                type: REACTION_TYPE.LOVE,
                count: 5,
                people: [
                    {
                        username: 'olivia',
                        name: 'Olivia',
                        avatar: 'olivia.jpg',
                    },
                ],
            },
        ],
        viewCount: 4500,
        comments: [
            {
                id: 26,
                username: 'sophia',
                avatar: 'https://res.cloudinary.com/demo/image/upload/samples/people/boy-snow-hoodie.jpg',
                createdAt: new Date(),
                text: 'Amazing photos! Nature is truly breathtaking.',
                likeAmount: 5000,
                date: '10 weeks ago',
            },
        ],
        repostCount: 12,
        shareCount: 9,
    },
    {
        id: 3,
        author: 'Michael Smith',
        createdAt: new Date(),
        avatar: '/assets/images/avatar.jpg',
        description: 'Capturing urban life in the city.',
        attachments: [
            {
                id: 31,
                type: ATTACHMENT_TYPE.IMAGE,
                src: 'https://res.cloudinary.com/demo/image/upload/samples/people/bicycle.jpg',
                alt: 'City Bicycle',
            },
            {
                id: 32,
                type: ATTACHMENT_TYPE.IMAGE,
                src: 'https://res.cloudinary.com/demo/image/upload/samples/people/kitchen-bar.jpg',
                alt: 'Kitchen Bar',
            },
            {
                id: 33,
                type: ATTACHMENT_TYPE.VIDEO,
                src: 'https://res.cloudinary.com/demo/video/upload/elephants.mp4',
                alt: 'Elephants Video',
            },
        ],
        reactions: [
            {
                id: 34,
                type: REACTION_TYPE.LIKE,
                count: 10,
                people: [
                    {
                        username: 'noah',
                        name: 'Noah',
                        avatar: 'noah.jpg',
                    },
                    {
                        username: 'ava',
                        name: 'Ava',
                        avatar: 'ava.jpg',
                    },
                ],
            },
            {
                id: 35,
                type: REACTION_TYPE.LOVE,
                count: 7,
                people: [
                    {
                        username: 'isabella',
                        name: 'Isabella',
                        avatar: 'isabella.jpg',
                    },
                ],
            },
        ],
        viewCount: 5200,
        comments: [
            {
                id: 36,
                username: 'mia',
                avatar: 'https://res.cloudinary.com/demo/image/upload/samples/people/boy-snow-hoodie.jpg',
                createdAt: new Date(),
                text: 'Love the urban vibes in these shots!',
                likeAmount: 5000,
                date: '10 weeks ago',
            },
        ],
        repostCount: 15,
        shareCount: 11,
    },
];
