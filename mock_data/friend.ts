export interface Friend {
    id: string;
    username: string;
    name: string;
    avatar: string;
    isOnline: boolean;
    isMutualFriend: boolean;
    mutualFriends: number;
    isAllowToAdd: boolean;
}

// id is the same for mocking purpose
export const friends: Friend[] = [
    {
        id: '3f5d8e69-c812-4f0b-b3e4-a1b26f9c7d85',
        username: 'alexandratan',
        name: 'Alexandra Tan',
        avatar: '/assets/images/avatar.jpg',
        isOnline: true,
        isMutualFriend: true,
        mutualFriends: 10,
        isAllowToAdd: true,
    },
    {
        id: '3f5d8e69-c812-4f0b-b3e4-a1b26f9c7d85',
        username: 'johndoe',
        name: 'John Doe',
        avatar: '/assets/images/avatar.jpg',
        isOnline: false,
        isMutualFriend: false,
        mutualFriends: 8,
        isAllowToAdd: true,
    },
    {
        id: '3f5d8e69-c812-4f0b-b3e4-a1b26f9c7d85',
        username: 'janesmith',
        name: 'Jane Smith',
        avatar: '/assets/images/avatar.jpg',
        isOnline: true,
        isMutualFriend: false,
        mutualFriends: 12,
        isAllowToAdd: false,
    },
    {
        id: '3f5d8e69-c812-4f0b-b3e4-a1b26f9c7d85',
        username: 'michaeljohnson',
        name: 'Michael Johnson',
        avatar: '/assets/images/avatar.jpg',
        isOnline: false,
        isMutualFriend: true,
        mutualFriends: 5,
        isAllowToAdd: false,
    },
    {
        id: '3f5d8e69-c812-4f0b-b3e4-a1b26f9c7d85',
        username: 'emilydavis',
        name: 'Emily Davis',
        avatar: '/assets/images/avatar.jpg',
        isOnline: true,
        isMutualFriend: true,
        mutualFriends: 15,
        isAllowToAdd: true,
    },
    {
        id: '3f5d8e69-c812-4f0b-b3e4-a1b26f9c7d85',
        username: 'chrisbrown',
        name: 'Chris Brown',
        avatar: '/assets/images/avatar.jpg',
        isOnline: false,
        isMutualFriend: true,
        mutualFriends: 3,
        isAllowToAdd: true,
    },
    {
        id: '3f5d8e69-c812-4f0b-b3e4-a1b26f9c7d85',
        username: 'jessicawilson',
        name: 'Jessica Wilson',
        avatar: '/assets/images/avatar.jpg',
        isOnline: true,
        isMutualFriend: true,
        mutualFriends: 9,
        isAllowToAdd: true,
    },
    {
        id: '3f5d8e69-c812-4f0b-b3e4-a1b26f9c7d85',
        username: 'davidmartinez',
        name: 'David Martinez',
        avatar: '/assets/images/avatar.jpg',
        isOnline: false,
        isMutualFriend: false,
        mutualFriends: 7,
        isAllowToAdd: true,
    },
    {
        id: '3f5d8e69-c812-4f0b-b3e4-a1b26f9c7d85',
        username: 'sophiagarcia',
        name: 'Sophia Garcia',
        avatar: '/assets/images/avatar.jpg',
        isOnline: true,
        isMutualFriend: true,
        mutualFriends: 20,
        isAllowToAdd: true,
    },
    {
        id: '3f5d8e69-c812-4f0b-b3e4-a1b26f9c7d85',
        username: 'danielrodriguez',
        name: 'Daniel Rodriguez',
        avatar: '/assets/images/avatar.jpg',
        isOnline: false,
        isMutualFriend: true,
        mutualFriends: 4,
        isAllowToAdd: true,
    },
];
