import React from 'react';

const Sidebar: React.FC = () => {
    return (
        <aside className='w-64 bg-white p-4 shadow-md'>
            <ul className='space-y-4'>
                <li className='font-semibold text-gray-600 hover:text-blue-600'>Connect</li>
                <li className='font-semibold text-gray-600 hover:text-blue-600'>Discover</li>
                <li className='font-semibold text-gray-600 hover:text-blue-600'>Message</li>
                <li className='font-semibold text-gray-600 hover:text-blue-600'>Shop</li>
                <li className='font-semibold text-gray-600 hover:text-blue-600'>Settings</li>
            </ul>
        </aside>
    );
};

export default Sidebar;
