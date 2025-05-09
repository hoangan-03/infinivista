import Image from 'next/image';

import {Spinner} from '@/components/commons';
import {useInfiniteScrolling} from '@/hooks';
import {cn} from '@/lib/utils';
import {useGetInfiniteMyGroups} from '@/modules/group/group.swr';

export const Groups: React.FC = () => {
    const {data: groups, pagination, size, setSize, isValidating, isLoading} = useGetInfiniteMyGroups();
    const {loadMoreRef} = useInfiniteScrolling({
        data: groups,
        pagination,
        size,
        isValidating,
        setSize,
    });

    return (
        <>
            <div className='space-y-4 p-7'>
                {groups.map((group, index) => (
                    <div
                        key={index}
                        className='flex cursor-pointer items-center gap-2 rounded-md bg-slate-100 p-3 hover:bg-slate-200'
                    >
                        <div className='relative size-16 flex-shrink-0'>
                            <Image src={group.profileImageUrl} alt='image' fill sizes='64px' />
                        </div>
                        <div>
                            <p className='font-bold'>{group.name}</p>
                            <p className='line-clamp-1 w-full text-sm text-gray-500'>{group.description}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div ref={loadMoreRef} className={cn('flex justify-center', isValidating && !isLoading && 'py-8')}>
                {isValidating && !isLoading && <Spinner width={60} height={60} />}
            </div>
        </>
    );
};
