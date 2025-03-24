import React from 'react';

const AboutSection: React.FC<{text?: string}> = ({text}) => {
    const about = text || 'Hello, nice to meet you!';

    return (
        <div className='flex flex-row rounded-lg bg-white shadow-md'>
            <div className='h-[50px] w-[200px] flex-shrink-0 border-b-2 border-[#2563EB] py-3 pl-6'>
                <h2 className='text-2xl font-bold text-[#2563EB]'>About</h2>
            </div>
            <div className='flex flex-grow items-center justify-center p-6 text-justify'>
                <p className='text-wrap text-base text-gray-700'>{about}</p>
            </div>
        </div>
    );
};

export default AboutSection;
