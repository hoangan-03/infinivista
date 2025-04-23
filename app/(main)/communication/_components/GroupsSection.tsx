import {Icon} from '@/components/commons';
import {Button} from '@/components/ui';

import {IGroupItem} from '../page';
import {GroupItem} from './GroupItem';

interface Props {
    data: IGroupItem[];
}

export const GroupsSection: React.FC<Props> = ({data}) => {
    return (
        <div className='space-y-5'>
            <div className='flex items-center justify-between'>
                <h5 className='text-heading5 font-bold'>Groups</h5>
                <Button variant='raw' size='icon'>
                    <div className='flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 hover:bg-blue-200'>
                        <Icon name='more' width={18} height={4} className='rotate-90' />
                    </div>
                </Button>
            </div>
            <div className='space-y-2'>
                {data.map((group, index) => (
                    <GroupItem key={index} name={group.name} tags={group.tags} lastActive={group.lastActive} />
                ))}
            </div>
        </div>
    );
};
