interface ISuggestion {
    username: string;
    name: string;
    avatar: string;
}

const suggestions: ISuggestion[] = [
    {username: 'alexandra-tan', name: 'Alexandra Tan', avatar: '/assets/images/avatar.jpg'},
    {username: 'benjamin-lee', name: 'Benjamin Lee', avatar: '/assets/images/avatar.jpg'},
    {username: 'charlotte-wu', name: 'Charlotte Wu', avatar: '/assets/images/avatar.jpg'},
    {username: 'david-johnson', name: 'David Johnson', avatar: '/assets/images/avatar.jpg'},
    {username: 'emma-zhang', name: 'Emma Zhang', avatar: '/assets/images/avatar.jpg'},
    {username: 'felix-wong', name: 'Felix Wong', avatar: '/assets/images/avatar.jpg'},
    {username: 'grace-lin', name: 'Grace Lin', avatar: '/assets/images/avatar.jpg'},
    {username: 'henry-chen', name: 'Henry Chen', avatar: '/assets/images/avatar.jpg'},
    {username: 'isabella-smith', name: 'Isabella Smith', avatar: '/assets/images/avatar.jpg'},
    {username: 'jacob-miller', name: 'Jacob Miller', avatar: '/assets/images/avatar.jpg'},
];

export {suggestions};
