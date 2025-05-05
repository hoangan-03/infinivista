export interface IMessage {
    username: string;
    role: string;
    message?: string;
    image?: string;
    video?: string;
    time: Date;
}

export const messages: IMessage[] = [
    {
        username: 'Khuong',
        role: 'Backend',
        message: 'Hi there, nice to meet you',
        time: new Date(),
    },
    {
        username: 'Dat',
        role: 'Frontend',
        message: 'Hello Khuong! How are you?',
        time: new Date(),
    },
    {
        username: 'An',
        role: 'Project Manager',
        message: 'Hi everyone, we will be discussing the upcoming Capstone Project.',
        time: new Date(),
    },
    {
        username: 'An',
        role: 'Project Manager',
        message: 'This is a hassle, so be sure to be prepared.',
        time: new Date(),
    },
    {
        username: 'Khuong',
        role: 'Backend',
        message: 'Sure, I have some ideas for the backend architecture.',
        time: new Date(),
    },
    {
        username: 'Khuong',
        role: 'Backend',
        message: 'But it may take some time to implement.',
        time: new Date(),
    },
    {
        username: 'Dat',
        role: 'Frontend',
        message: 'I can work on the frontend components.',
        time: new Date(),
    },
    {
        username: 'Dat',
        role: 'Frontend',
        message: 'I have few experiences with React and Next.js.',
        time: new Date(),
    },
    {
        username: 'Dat',
        role: 'Frontend',
        message: 'And well I have 3 years of experiences in Javascript.',
        time: new Date(),
    },
    {
        username: 'Khuong',
        role: 'Backend',
        image: 'https://res.cloudinary.com/dght74v9o/image/upload/v1735408639/samples/landscapes/beach-boat.jpg',
        time: new Date(),
    },
    {
        username: 'Dat',
        role: 'Frontend',
        image: 'https://res.cloudinary.com/dght74v9o/image/upload/v1735408639/samples/landscapes/beach-boat.jpg',
        time: new Date(),
    },
    {
        username: 'Dat',
        role: 'Frontend',
        image: 'https://res.cloudinary.com/dght74v9o/image/upload/v1735408639/samples/landscapes/beach-boat.jpg',
        time: new Date(),
    },
    {
        username: 'An',
        role: 'Project Manager',
        video: 'https://res.cloudinary.com/dght74v9o/video/upload/v1735408641/samples/cld-sample-video.mp4',
        time: new Date(),
    },
    {
        username: 'An',
        role: 'Project Manager',
        video: 'https://res.cloudinary.com/dght74v9o/video/upload/v1735408641/samples/cld-sample-video.mp4',
        time: new Date(),
    },
];
