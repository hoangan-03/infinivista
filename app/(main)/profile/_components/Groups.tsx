import Image from 'next/image';
import {useRouter} from 'next/navigation';

import {Spinner} from '@/components/commons';
import {useInfiniteScrolling} from '@/hooks';
import {cn} from '@/lib/utils';
import {useGetInfiniteMyGroups} from '@/modules/group/group.swr';
import {ROUTES} from '@/routes/routes.enum';

export const Groups: React.FC = () => {
    const router = useRouter();

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
            {isLoading && (
                <div className='my-10 flex items-center justify-center'>
                    <Spinner width={60} height={60} />
                </div>
            )}
            <div className='space-y-4 p-7'>
                {groups.map((group, index) => (
                    <div
                        key={index}
                        className='flex cursor-pointer items-center gap-2 rounded-md bg-slate-100 p-3 hover:bg-slate-200'
                        onClick={() => router.push(ROUTES.GROUP + `/${group.id}`)}
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
