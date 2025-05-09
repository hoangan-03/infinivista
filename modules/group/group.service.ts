import {axiosInstance} from '@/lib/axios';

import {PaginationRequest, PaginationResponse} from '../api.interface';
import {APIBaseService} from '../main.service';
import {IGroup} from './group.interface';

export class GroupService extends APIBaseService {
    public static readonly ROUTES = {
        myGroups: '/groups/my-groups',
        groupById: (groupId: string) => `/groups/${groupId}`,
    };

    public static async getMyGroups({pagination}: {pagination?: PaginationRequest}) {
        return await axiosInstance
            .get<PaginationResponse<IGroup>>(this.ROUTES.myGroups, {
                params: {
                    page: pagination?.page,
                    limit: pagination?.limit,
                },
            })
            .then((res) => res.data);
    }

    public static async getGroupById({groupId}: {groupId: string}) {
        return await axiosInstance.get<IGroup>(this.ROUTES.groupById(groupId)).then((res) => res.data);
    }
}
