const userData = {
    username: '@john-nguyen-03',
    name: 'John Nguyen',
    details: {
        displayedJobNo: 0, // index of the job (in introduction/jobTitles) to be displayed
    },
    socialLinks: {
        facebook: 'https://www.facebook.com/john-nguyen-03',
        instagram: 'https://www.instagram.com/john-nguyen-03',
        tiktok: 'https://www.tiktok.com/john.nguyen6363',
        linkedin: 'https://www.linkedin.com/in/john-ng-03',
    },
    introduction: {
        jobTitles: [
            {job: 'Lead Project Manager', company: 'NVIDIA'},
            {job: 'CTO', company: 'VNG'},
            {job: 'PM', company: 'FPT Software'},
        ],
        academic: ['Oxford International'],
        city: 'Ho Chi Minh City',
        country: 'Vietnam',
        hometown: 'Dong Nai',
        marritalStatus: 'Single',
    },
    about: `With over 20 years of experience leading cross-functional teams, I've consistently driven both brand elevation and customer acquisition across digital channels. From designing omnichannel marketing strategies to implementing data-driven approaches that improve ROI, my expertise is in creating integrated campaigns that resonate with consumers, amplify brand presence, and drive sustainable business growth. I thrive in dynamic environments and am passionate about staying at the forefront of marketing innovations, leveraging everything from AI and machine learning to social media platforms to reach and engage audiences.`,
    profilePic: '/assets/images/avatar.jpg',
    backgroundPic: '/assets/images/back_image.png',
    followerNumber: 100,
    followingNumber: 200,
    connectionNumber: 300,
    postNumber: 4,
};

export default userData;
export type userDataType = typeof userData;
