import Image from 'next/image';

import {Spinner} from '@/components/commons';
import {useInfiniteScrolling} from '@/hooks';
import {capitalize, cn} from '@/lib/utils';
import {useGetInfiniteMyPages} from '@/modules/page/page.swr';

export const Pages: React.FC = () => {
    const {data: pages, pagination, size, setSize, isValidating, isLoading} = useGetInfiniteMyPages();
    const {loadMoreRef} = useInfiniteScrolling({
        data: pages,
        pagination,
        size,
        isValidating,
        setSize,
    });

    return (
        <>
            <div className='space-y-4 p-7'>
                {pages.map((page, index) => (
                    <div
                        key={index}
                        className='flex cursor-pointer items-center gap-2 rounded-md bg-slate-100 p-3 hover:bg-slate-200'
                    >
                        <div className='relative size-16 flex-shrink-0'>
                            <Image src={page.profileImageUrl} alt='image' fill sizes='64px' />
                        </div>
                        <div>
                            <p className='font-bold'>{page.name}</p>
                            <p className='line-clamp-1 w-full text-sm text-gray-500'>{page.description}</p>
                            <p className='text-sm'>Category: {capitalize(page.category.toLowerCase())}</p>
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
