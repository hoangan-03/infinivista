import {Icon, Spinner} from '@/components/commons';
import {ScrollArea} from '@/components/ui';
import {useInfiniteScrolling} from '@/hooks';
import {PaginationMetadata} from '@/modules/api.interface';
import {MESSAGE_TARGET_TYPE} from '@/modules/common.enum';
import {IFriend} from '@/modules/friend/friend.interface';

import {UserItem} from './UserItem';

interface Props {
    friends: IFriend[];
    pagination: PaginationMetadata[];
    size: number;
    setSize: (size: number) => void;
    isValidating: boolean;
    isLoading: boolean;

    // Props drilling for UserItem
    setCurrentTargetType: (targetType: MESSAGE_TARGET_TYPE) => void;
    setCurrentTargetId: (targetId: string) => void;
}

export const UsersSection: React.FC<Props> = ({
    friends,
    pagination,
    size,
    setSize,
    isValidating,
    isLoading,
    setCurrentTargetType,
    setCurrentTargetId,
}) => {
    const {loadMoreRef} = useInfiniteScrolling({
        data: friends,
        pagination,
        size,
        isValidating,
        setSize,
    });
    return (
        <div className='space-y-5'>
            <div className='flex items-center gap-3'>
                <h5 className='text-heading5 font-bold'>Messages</h5>
                <Icon name='caret-down' width={16} height={16} />
                <p className='rounded-full bg-gray-200 px-2 py-1'>2</p>
            </div>
            <ScrollArea className='h-[40vh]'>
                <div className='space-y-2'>
                    {friends.map((friend, index) => (
                        <UserItem
                            key={index}
                            friend={friend}
                            setCurrentTargetType={setCurrentTargetType}
                            setCurrentTargetId={setCurrentTargetId}
                        />
                    ))}
                </div>
                <div ref={loadMoreRef} className='flex justify-center'>
                    {isValidating && !isLoading && <Spinner width={60} height={60} />}
                </div>
            </ScrollArea>
        </div>
    );
};
