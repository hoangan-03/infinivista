export interface IStory {
    id: number;
    username: string;
    title: string;
    description: string;
    image: string;
    videoUrl: string;
}

export const stories: IStory[] = [
    {
        id: 1,
        title: 'Story 1',
        username: 'User 1',
        description: 'Description for Story 1',
        image: 'https://res.cloudinary.com/dght74v9o/image/upload/v1735408648/cld-sample-4.jpg',
        videoUrl: 'https://res.cloudinary.com/dght74v9o/video/upload/v1735408641/samples/cld-sample-video.mp4',
    },
    {
        id: 2,
        title: 'Story 2',
        username: 'User 2',
        description: 'Description for Story 2',
        image: 'https://res.cloudinary.com/dght74v9o/image/upload/v1735408648/cld-sample-4.jpg',
        videoUrl: 'https://res.cloudinary.com/dght74v9o/video/upload/v1735408641/samples/cld-sample-video.mp4',
    },
    {
        id: 3,
        title: 'Story 3',
        username: 'User 3',
        description: 'Description for Story 3',
        image: 'https://res.cloudinary.com/dght74v9o/image/upload/v1735408648/cld-sample-4.jpg',
        videoUrl: 'https://res.cloudinary.com/dght74v9o/video/upload/v1735408641/samples/cld-sample-video.mp4',
    },
    {
        id: 4,
        title: 'Story 4',
        username: 'User 3',
        description: 'Description for Story 3',
        image: 'https://res.cloudinary.com/dght74v9o/image/upload/v1735408648/cld-sample-4.jpg',
        videoUrl: 'https://res.cloudinary.com/dght74v9o/video/upload/v1735408641/samples/cld-sample-video.mp4',
    },
    {
        id: 5,
        title: 'Story 5',
        username: 'User 3',
        description: 'Description for Story 3',
        image: 'https://res.cloudinary.com/dght74v9o/image/upload/v1735408648/cld-sample-4.jpg',
        videoUrl: 'https://res.cloudinary.com/dght74v9o/video/upload/v1735408641/samples/cld-sample-video.mp4',
    },
];
