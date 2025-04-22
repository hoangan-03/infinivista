'use client';

import {Post} from '@/app/(main)/_components';
import {useFeedContext} from '@/context';
import {posts} from '@/mock_data/post';

function FeedPage() {
    const {feedType} = useFeedContext();

    // TODO: Implement once API is ready
    const filteredPosts = feedType === 'for-you' ? posts : posts;

    return (
        <div className='space-y-7'>
            {filteredPosts.map((post) => (
                <Post key={post.id} data={post} sharedPost={post} />
            ))}
            {filteredPosts.map((post) => (
                <Post key={post.id} data={post} />
            ))}
        </div>
    );
}

export default FeedPage;
