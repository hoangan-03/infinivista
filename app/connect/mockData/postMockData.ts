type AttachmentType = 'image' | 'video';
type ReactionType = 'like' | 'love' | 'sad';

export default {
    id: 1,
    author: 'John Doe',
    created_at: new Date(),
    avatar: '',
    description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet quam non lectus facilisis consectetur.',
    attachmentList: [
        {
            id: 2,
            type: 'image' as AttachmentType, // Type assertion here
            src: 'https://res.cloudinary.com/dght74v9o/image/upload/v1735408648/cld-sample-4.jpg',
            alt: 'Image 1',
        },
        {
            id: 3,
            type: 'image' as AttachmentType,
            src: 'https://res.cloudinary.com/dght74v9o/image/upload/v1735408639/samples/landscapes/beach-boat.jpg',
            alt: 'Image 2',
        },
        {
            id: 4,
            type: 'video' as AttachmentType,
            src: 'https://res.cloudinary.com/dght74v9o/video/upload/v1735408640/samples/elephants.mp4',
            alt: 'Video 1',
        },
        {
            id: 5,
            type: 'video' as AttachmentType,
            src: 'https://res.cloudinary.com/dght74v9o/video/upload/v1735408641/samples/cld-sample-video.mp4',
            alt: 'Video 2',
        },
        {
            id: 6,
            type: 'video' as AttachmentType,
            src: 'https://res.cloudinary.com/dght74v9o/image/upload/v1735408639/samples/ecommerce/leather-bag-gray.jpg',
            alt: 'Image 3',
        },
    ],
    reactionList: [
        {
            id: 7,
            type: 'like' as ReactionType, // Type assertion
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
            id: 10,
            type: 'love' as ReactionType, // Type assertion
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
            id: 12,
            type: 'sad' as ReactionType, // Type assertion
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
    viewCount: 3000,
    commentList: [
        {
            id: 14, // Updated ID for comment
            created_by: 'Jane Smith',
            profilePic: '',
            created_at: new Date(),
            commentText: 'Great post! Thanks for sharing.',
        },
        {
            id: 15, // Updated ID for comment
            created_by: 'Bob Johnson',
            profilePic: '',
            created_at: new Date(),
            commentText: 'I agree. It was very informative.',
        },
    ],
    repostCount: 10,
    shareCount: 7,
};
