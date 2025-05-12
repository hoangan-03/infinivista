import {axiosInstance} from '@/lib/axios';

import {PaginationRequest, PaginationResponse} from '../api.interface';
import {APIBaseService} from '../main.service';
import {IPost} from '../post/post.interface';
import {IGroup, IGroupUser} from './group.interface';

export class GroupService extends APIBaseService {
    public static readonly ROUTES = {
        myGroups: APIBaseService.BASE_API_URL + '/group/my-groups',
        groupById: (groupId: string) => APIBaseService.BASE_API_URL + `/group/${groupId}`,
        groupFollowers: (groupId: string) => APIBaseService.BASE_API_URL + `/group/${groupId}/members`,
        groupPosts: (groupId: string) => APIBaseService.BASE_API_URL + `/group/${groupId}/posts`,
    };

    public static async getMyGroups({pagination}: {pagination?: PaginationRequest}) {
        return await axiosInstance
            .get<PaginationResponse<IGroup>>(GroupService.ROUTES.myGroups, {
                params: {
                    page: pagination?.page,
                    limit: pagination?.limit,
                },
            })
            .then((res) => res.data);
    }

    public static async getGroupById({groupId}: {groupId: string}) {
        return await axiosInstance.get<IGroup>(GroupService.ROUTES.groupById(groupId)).then((res) => res.data);
    }

    public static async getGroupFollowers({groupId, pagination}: {groupId: string; pagination?: PaginationRequest}) {
        return await axiosInstance
            .get<PaginationResponse<IGroupUser>>(GroupService.ROUTES.groupFollowers(groupId), {
                params: {
                    page: pagination?.page,
                    limit: pagination?.limit,
                },
            })
            .then((res) => res.data);
    }

    public static async getGroupPosts({groupId, pagination}: {groupId: string; pagination?: PaginationRequest}) {
        return await axiosInstance
            .get<PaginationResponse<IPost>>(GroupService.ROUTES.groupPosts(groupId), {
                params: {
                    page: pagination?.page,
                    limit: pagination?.limit,
                },
            })
            .then((res) => res.data);
    }
}
