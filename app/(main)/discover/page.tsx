import {posts} from '@/mock_data/post';

import {Post, SharedPost} from '../_components';

function DiscoverPage() {
    const filteredPosts = posts;

    return (
        <div className='w-4/5'>
            <div className='sticky top-0 z-20 flex h-[3.875rem] w-full items-center justify-between bg-white py-8'>
                <h5 className='z-20 font-extrabold text-blue-700'>Discover</h5>
            </div>
            <div className='space-y-7 px-4'>
                {filteredPosts.map((post) => (
                    <SharedPost key={post.id} data={post} />
                ))}
                {filteredPosts.map((post) => (
                    <Post key={post.id} data={post} />
                ))}
            </div>
        </div>
    );
}

export default DiscoverPage;
