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

export interface IProfile {
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

export const profile: IProfile = {
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

// const userData = [
//     {
//         username: 'janedoe42',
//         name: 'Jane Doe',
//         email: 'janedoe42@example.com',
//         about: 'Passionate software engineer with a love for solving complex problems and building scalable applications.',
//         details: {
//             displayedJobNo: 0,
//         },
//         socialLinks: {
//             facebook: 'https://www.facebook.com/jane.doe.42',
//             instagram: 'https://www.instagram.com/jane.doe.42',
//             tiktok: 'https://www.tiktok.com/@jane.doe.42',
//             linkedin: 'https://www.linkedin.com/in/jane-doe-42',
//         },
//         introduction: {
//             jobTitles: [
//                 {job: 'Senior Software Engineer', company: 'Google'},
//                 {job: 'Tech Lead', company: 'Microsoft'},
//                 {job: 'Frontend Developer', company: 'Amazon'},
//             ],
//             academic: ['Harvard University'],
//             city: 'San Francisco',
//             country: 'USA',
//             hometown: 'Los Angeles',
//             marritalStatus: 'Married',
//         },
//         profilePic: '/assets/images/avatar.jpg',
//         backgroundPic:
//             'https://res.cloudinary.com/dght74v9o/image/upload/v1735408640/samples/landscapes/nature-mountains.jpg',
//         followerNumber: 250,
//         followingNumber: 180,
//         connectionNumber: 500,
//         postNumber: 12,
//     },
//     {
//         username: 'alexsmith99',
//         name: 'Alex Smith',
//         email: 'alexsmith99@example.com',
//         about: 'Full-stack developer with expertise in React, Node.js, and cloud technologies.',
//         details: {
//             displayedJobNo: 0,
//         },
//         socialLinks: {
//             facebook: 'https://www.facebook.com/alex.smith.99',
//             instagram: 'https://www.instagram.com/alex.smith.99',
//             tiktok: 'https://www.tiktok.com/@alex.smith.99',
//             linkedin: 'https://www.linkedin.com/in/alex-smith-99',
//         },
//         introduction: {
//             jobTitles: [
//                 {job: 'Software Architect', company: 'Netflix'},
//                 {job: 'Backend Engineer', company: 'Spotify'},
//             ],
//             academic: ['MIT'],
//             city: 'New York',
//             country: 'USA',
//             hometown: 'Chicago',
//             marritalStatus: 'Single',
//         },
//         profilePic: 'https://res.cloudinary.com/dght74v9o/image/upload/v1735408641/samples/people/man.jpg',
//         backgroundPic:
//             'https://res.cloudinary.com/dght74v9o/image/upload/v1735408642/samples/landscapes/city-skyline.jpg',
//         followerNumber: 400,
//         followingNumber: 300,
//         connectionNumber: 600,
//         postNumber: 20,
//     },
//     {
//         username: 'sarahlee88',
//         name: 'Sarah Lee',
//         email: 'sarahlee88@example.com',
//         about: 'Digital marketer and content creator specializing in brand growth and social media strategy.',
//         details: {
//             displayedJobNo: 0,
//         },
//         socialLinks: {
//             facebook: 'https://www.facebook.com/sarah.lee.88',
//             instagram: 'https://www.instagram.com/sarah.lee.88',
//             tiktok: 'https://www.tiktok.com/@sarah.lee.88',
//             linkedin: 'https://www.linkedin.com/in/sarah-lee-88',
//         },
//         introduction: {
//             jobTitles: [
//                 {job: 'Marketing Manager', company: 'Adobe'},
//                 {job: 'Brand Strategist', company: 'Nike'},
//             ],
//             academic: ['Stanford University'],
//             city: 'Los Angeles',
//             country: 'USA',
//             hometown: 'San Diego',
//             marritalStatus: 'Engaged',
//         },
//         profilePic: 'https://res.cloudinary.com/dght74v9o/image/upload/v1735408643/samples/people/woman.jpg',
//         backgroundPic: 'https://res.cloudinary.com/dght74v9o/image/upload/v1735408644/samples/landscapes/mountain.jpg',
//         followerNumber: 500,
//         followingNumber: 450,
//         connectionNumber: 700,
//         postNumber: 30,
//     },
// ];

// export default userData;
