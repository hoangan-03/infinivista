import {axiosInstance} from '@/lib/axios';

import {PaginationRequest, PaginationResponse} from '../api.interface';
import {APIBaseService} from '../main.service';
import {IFriend, IFriendRequest} from './friend.interface';

export class FriendService extends APIBaseService {
    public static readonly ROUTES = {
        friend: APIBaseService.BASE_API_URL + '/friend',
        friendRequests: APIBaseService.BASE_API_URL + '/friend/requests',
    };

    public static async getFriends({pagination}: {pagination?: PaginationRequest}) {
        return await axiosInstance
            .get<PaginationResponse<IFriend>>(FriendService.ROUTES.friend, {
                params: {
                    page: pagination?.page,
                    limit: pagination?.limit,
                },
            })
            .then((res) => res.data);
    }

    public static async getFriendRequests({pagination}: {pagination?: PaginationRequest}) {
        return await axiosInstance
            .get<PaginationResponse<IFriendRequest>>(FriendService.ROUTES.friendRequests, {
                params: {
                    page: pagination?.page,
                    limit: pagination?.limit,
                },
            })
            .then((res) => res.data);
    }
}
