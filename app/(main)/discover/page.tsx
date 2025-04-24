import {Icon} from '@/components/commons';
import {Input} from '@/components/ui';
import {posts} from '@/mock_data/post';

import {Post} from '../_components';

function DiscoverPage() {
    const filteredPosts = posts;

    return (
        <div className='relative flex justify-center px-10 py-4'>
            <div className='w-4/5'>
                <div className='sticky top-0 z-20 flex h-[3.875rem] w-full items-center justify-between bg-white pb-10 pt-8'>
                    <h5 className='font-extrabold text-blue-700'>Discover</h5>
                    <div className='w-4/5'>
                        <Input
                            placeholder='Search'
                            prefixIcon={<Icon name='search' />}
                            className='border border-slate-300'
                        />
                    </div>
                </div>
                <div className='space-y-7 px-4'>
                    {filteredPosts.map((post) => (
                        <Post key={post.id} data={post} sharedPost={post} />
                    ))}
                    {filteredPosts.map((post) => (
                        <Post key={post.id} data={post} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default DiscoverPage;
