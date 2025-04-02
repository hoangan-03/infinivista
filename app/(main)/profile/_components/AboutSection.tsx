import React from 'react';

export const AboutSection: React.FC<{text?: string}> = ({text}) => {
    const about = text || 'Hello, nice to meet you!';

    return (
        <div className='flex flex-row rounded-lg bg-white shadow-md'>
            <div className='h-12 w-52 flex-shrink-0 border-b-2 border-blue-600 py-3 pl-6'>
                <h2 className='text-2xl font-bold text-blue-600'>About</h2>
            </div>
            <div className='flex flex-grow items-center justify-center p-6 text-justify'>
                <p className='text-wrap text-base text-gray-700'>{about}</p>
            </div>
        </div>
    );
};
