import {Icon} from '@/components/commons';

import {IUserItem} from '../page';
import {UserItem} from './UserItem';

interface Props {
    data: IUserItem[];
}

export const UsersSection: React.FC<Props> = ({data}) => {
    return (
        <div className='space-y-5'>
            <div className='flex items-center gap-3'>
                <h5 className='text-heading5 font-bold'>Messages</h5>
                <Icon name='caret-down' width={16} height={16} />
                <p className='rounded-full bg-gray-200 px-2 py-1'>2</p>
            </div>
            <div className='space-y-2'>
                {data.map((user, index) => (
                    <UserItem key={index} name={user.name} message={user.message} lastActive={user.lastActive} />
                ))}
            </div>
        </div>
    );
};
