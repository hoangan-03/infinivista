'use client';

import {Post} from '@/app/(main)/_components';
import {useFeedContext} from '@/context';
import posts from '@/mock_data/postMockData';

function ConnectFeed() {
    const {feedType} = useFeedContext();

    // TODO: Implement once API is ready
    const filteredPosts = feedType === 'for-you' ? posts : posts;

    return (
        <div className='flex flex-col gap-7'>
            {filteredPosts.map((post) => (
                <Post key={post.id} postObject={post} />
            ))}
        </div>
    );
}

export default ConnectFeed;
