export interface IComment {
    id: number;
    username: string;
    text: string;
    avatar: string;
    likeAmount: number;
    date: string;
    createdAt: Date;
}

export const comments: IComment[] = [
    {
        id: 1,
        username: 'User 1',
        text: 'Comment 1 once upon a time, there was a princess who lived in a castle. she was very beautiful and kind, and everyone loved her. one day, a handsome prince came to the castle and fell in love with her. they lived happily ever after.',
        likeAmount: 5000,
        date: '10 weeks ago',
        avatar: 'https://res.cloudinary.com/dght74v9o/image/upload/v1735408648/cld-sample-4.jpg',
        createdAt: new Date(),
    },
    {
        id: 2,
        username: 'User 2',
        text: 'Comment 2 once upon a time, there was a princess who lived in a castle. she was very beautiful and kind, and everyone loved her. one day, a handsome prince came to the castle and fell in love with her. they lived happily ever after.',
        likeAmount: 5000,
        date: '10 weeks ago',
        avatar: 'https://res.cloudinary.com/dght74v9o/image/upload/v1735408648/cld-sample-4.jpg',
        createdAt: new Date(),
    },
    {
        id: 3,
        username: 'User 3',
        text: 'Comment 3 once upon a time, there was a princess who lived in a castle. she was very beautiful and kind, and everyone loved her. one day, a handsome prince came to the castle and fell in love with her. they lived happily ever after.',
        likeAmount: 5000,
        date: '10 weeks ago',
        avatar: 'https://res.cloudinary.com/dght74v9o/image/upload/v1735408648/cld-sample-4.jpg',
        createdAt: new Date(),
    },
    {
        id: 4,
        username: 'User 4',
        text: 'Comment 4 once upon a time, there was a princess who lived in a castle. she was very beautiful and kind, and everyone loved her. one day, a handsome prince came to the castle and fell in love with her. they lived happily ever after.',
        likeAmount: 5000,
        date: '10 weeks ago',
        avatar: 'https://res.cloudinary.com/dght74v9o/image/upload/v1735408648/cld-sample-4.jpg',
        createdAt: new Date(),
    },
    {
        id: 5,
        username: 'User 5',
        text: 'Comment 5 once upon a time, there was a princess who lived in a castle. she was very beautiful and kind, and everyone loved her. one day, a handsome prince came to the castle and fell in love with her. they lived happily ever after.',
        likeAmount: 5000,
        date: '10 weeks ago',
        avatar: 'https://res.cloudinary.com/dght74v9o/image/upload/v1735408648/cld-sample-4.jpg',
        createdAt: new Date(),
    },
];
