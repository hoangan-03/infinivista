interface ITrending {
    id: number;
    topic: string;
    postCount: number;
}

const trendings: ITrending[] = [
    {id: 1, topic: 'AI and Machine Learning', postCount: 1200},
    {id: 2, topic: 'Climate Change', postCount: 950},
    {id: 3, topic: 'Cryptocurrency Market', postCount: 870},
    {id: 4, topic: 'Space Exploration', postCount: 810},
    {id: 5, topic: 'Mental Health Awareness', postCount: 760},
    {id: 6, topic: 'Remote Work Trends', postCount: 700},
    {id: 7, topic: 'Electric Vehicles', postCount: 680},
    {id: 8, topic: 'Startup Ecosystem', postCount: 650},
    {id: 9, topic: 'Web3 and Blockchain', postCount: 630},
    {id: 10, topic: 'Gaming Industry Updates', postCount: 600},
];

export {trendings};
