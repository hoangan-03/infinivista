export enum INTRODUCTION {
    WORK = 'work',
    EDUCATION = 'education',
    CITY = 'location',
    COUNTRY = 'country',
    MARRIAGE = 'marriage',
}

export enum SOCIAL_LINKS {
    FACEBOOK = 'facebook',
    INSTAGRAM = 'instagram',
    TIKTOK = 'tiktok',
    LINKEDIN = 'linkedin',
}

export interface Profile {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    avatar: string;
    backgroundImage: string;
    bio: string;
    followers: number;
    following: number;
    posts: number;
    socialLinks: {
        type: SOCIAL_LINKS;
        url: string;
    }[];
    introduction: {
        type: INTRODUCTION;
        value: string;
    }[];
}

export const profile: Profile = {
    id: '3f5d8e69-c812-4f0b-b3e4-a1b26f9c7d85',
    username: 'john_doe',
    firstName: 'John',
    lastName: 'Doe',
    email: 'someone@example.com',
    backgroundImage: '/assets/images/back_image.png',
    avatar: '/assets/images/avatar.jpg',
    bio: "With over 20 years of experience leading cross-functional teams, I've consistently driven both brand elevation and customer acquisition across digital channels. From designing omnichannel marketing strategies to implementing data-driven approaches that improve ROI, my expertise is in creating integrated campaigns that resonate with consumers, amplify brand presence, and drive sustainable business growth. I thrive in dynamic environments and am passionate about staying at the forefront of marketing innovations, leveraging everything from AI and machine learning to social media platforms to reach and engage audiences.",
    followers: 1200,
    following: 300,
    posts: 45,
    socialLinks: [
        {type: SOCIAL_LINKS.FACEBOOK, url: 'https://www.facebook.com/johndoe'},
        {type: SOCIAL_LINKS.INSTAGRAM, url: 'https://www.instagram.com/johndoe'},
        {type: SOCIAL_LINKS.TIKTOK, url: 'https://www.tiktok.com/@johndoe'},
        {type: SOCIAL_LINKS.LINKEDIN, url: 'https://www.linkedin.com/in/johndoe'},
    ],
    introduction: [
        {type: INTRODUCTION.EDUCATION, value: 'Harvard University'},
        {type: INTRODUCTION.WORK, value: 'VNG Corporation'},
        {type: INTRODUCTION.CITY, value: 'Ho Chi Minh City'},
        {type: INTRODUCTION.COUNTRY, value: 'Vietnam'},
        {type: INTRODUCTION.MARRIAGE, value: 'Single'},
    ],
};
