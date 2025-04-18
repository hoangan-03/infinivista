export enum ATTACHMENT_TYPE {
    IMAGE = 'image',
    VIDEO = 'video',
}

export enum REACTION_TYPE {
    LIKE = 'like',
    LOVE = 'love',
    SAD = 'sad',
}

export interface Attachment {
    id: number;
    type: ATTACHMENT_TYPE;
    src: string;
    alt: string;
}

export interface Person {
    username: string;
    name: string;
    avatar: string;
}

export interface Reaction {
    id: number;
    type: REACTION_TYPE;
    count: number;
    people: Person[];
}

export interface Comment {
    id: number;
    username: string;
    created_by: string;
    avatar: string;
    created_at: Date;
    commentText: string;
}

export interface Post {
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

export const posts: Post[] = [
    {
        id: 1,
        author: 'John Nguyen',
        created_at: new Date(),
        avatar: '/assets/images/avatar.jpg',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet quam non lectus facilisis consectetur.',
        attachmentList: [
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
        ],
        reactionList: [
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
        commentList: [
            {
                id: 14,
                username: 'jane-smith',
                created_by: 'Jane Smith',
                avatar: 'https://res.cloudinary.com/dght74v9o/image/upload/v1735408640/samples/landscapes/nature-mountains.jpg',
                created_at: new Date(),
                commentText: 'Great post! Thanks for sharing.',
            },
            {
                id: 15,
                username: 'bob-johnson',
                created_by: 'Bob Johnson',
                avatar: '',
                created_at: new Date(),
                commentText: 'I agree. It was very informative.',
            },
        ],
        repostCount: 10,
        shareCount: 7,
    },
    {
        id: 2,
        author: 'Jane Doe',
        created_at: new Date(),
        avatar: '/assets/images/avatar.jpg',
        description: 'Exploring the beauty of nature through photography.',
        attachmentList: [
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
        reactionList: [
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
        commentList: [
            {
                id: 26,
                username: 'sophia',
                created_by: 'Sophia',
                avatar: 'https://res.cloudinary.com/demo/image/upload/samples/people/boy-snow-hoodie.jpg',
                created_at: new Date(),
                commentText: 'Amazing photos! Nature is truly breathtaking.',
            },
        ],
        repostCount: 12,
        shareCount: 9,
    },
    {
        id: 3,
        author: 'Michael Smith',
        created_at: new Date(),
        avatar: '/assets/images/avatar.jpg',
        description: 'Capturing urban life in the city.',
        attachmentList: [
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
        reactionList: [
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
        commentList: [
            {
                id: 36,
                username: 'mia',
                created_by: 'Mia',
                avatar: 'https://res.cloudinary.com/demo/image/upload/samples/people/boy-snow-hoodie.jpg',
                created_at: new Date(),
                commentText: 'Love the urban vibes in these shots!',
            },
        ],
        repostCount: 15,
        shareCount: 11,
    },
];
