import React from 'react';

const PostsSection: React.FC = () => {
    return (
        <div className='rounded-3xl bg-white p-6 shadow-md w-full'>
            <h3 className='mb-4 text-lg font-bold'>Posts</h3>
            <div className='text-gray-600'>
                <p>No posts yet.</p>
            </div>
        </div>
    );
};

export default PostsSection;
