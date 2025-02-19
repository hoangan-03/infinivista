import React from 'react';

const AboutSection: React.FC = () => {
    return (
        <div className='flex flex-row rounded-lg bg-white shadow-md'>
            <div className='h-[50px] w-[200px] flex-shrink-0 border-b-2 border-[#2563EB] py-3 pl-6'>
                <h2 className='text-2xl font-bold text-[#2563EB]'>About</h2>
            </div>
            <div className='flex flex-grow items-center justify-center p-6 text-justify'>
                <p className='text-gray-700 text-base'>
                    With over 20 years of experience leading cross-functional teams, I’ve consistently driven both brand
                    elevation and customer acquisition across digital channels. From designing omnichannel marketing
                    strategies to implementing data-driven approaches that improve ROI, my expertise is in creating
                    integrated campaigns that resonate with consumers, amplify brand presence, and drive sustainable
                    business growth. I thrive in dynamic environments and am passionate about staying at the forefront
                    of marketing innovations, leveraging everything from AI and machine learning to social media
                    platforms to reach and engage audiences.
                </p>
            </div>
        </div>
    );
};

export default AboutSection;
