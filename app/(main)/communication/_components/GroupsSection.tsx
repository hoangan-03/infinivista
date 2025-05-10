import {Icon, Spinner} from '@/components/commons';
import {Button, ScrollArea} from '@/components/ui';
import {useInfiniteScrolling} from '@/hooks';
import {PaginationMetadata} from '@/modules/api.interface';
import {MESSAGE_TARGET_TYPE} from '@/modules/common.enum';
import {IGroupChat} from '@/modules/groupchat/groupchat.interface';

import {GroupItem} from './GroupItem';

interface Props {
    groups: IGroupChat[];
    pagination: PaginationMetadata[];
    size: number;
    setSize: (size: number) => void;
    isValidating: boolean;
    isLoading: boolean;

    // Props drilling for GroupItem
    setCurrentTargetType: (targetType: MESSAGE_TARGET_TYPE) => void;
    setCurrentTargetId: (targetId: string) => void;
}

export const GroupsSection: React.FC<Props> = ({
    groups,
    pagination,
    size,
    setSize,
    isValidating,
    isLoading,
    setCurrentTargetType,
    setCurrentTargetId,
}) => {
    const {loadMoreRef} = useInfiniteScrolling({
        data: groups,
        pagination,
        size,
        isValidating,
        setSize,
    });
    return (
        <div className='space-y-5'>
            <div className='flex items-center justify-between'>
                <h5 className='text-heading5 font-bold'>Groups</h5>
                {/* <Button variant='icon' size='icon' className='size-8 rounded-full bg-blue-100 p-1 hover:bg-blue-200'>
                    <Icon name='more' width={18} height={18} className='rotate-90' />
                </Button> */}
            </div>
            <ScrollArea className='h-[40vh]'>
                <div className='space-y-2'>
                    {groups.map((group, index) => (
                        <GroupItem
                            key={index}
                            group={group}
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
