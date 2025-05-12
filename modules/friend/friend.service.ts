import {axiosInstance} from '@/lib/axios';

import {PaginationRequest, PaginationResponse} from '../api.interface';
import {APIBaseService} from '../main.service';
import {IFriend, IFriendRequest, IFriendRequestStatus} from './friend.interface';

export class FriendService extends APIBaseService {
    public static readonly ROUTES = {
        friend: (userId: string) => APIBaseService.BASE_API_URL + `/friend/${userId}`,
        mySuggestedFriends: APIBaseService.BASE_API_URL + '/friend/suggested',
        friendRequests: APIBaseService.BASE_API_URL + '/friend/requests',
        acceptFriendRequest: (requestId: string) => APIBaseService.BASE_API_URL + `/friend/request/${requestId}`,
        sendFriendRequest: (userId: string) => APIBaseService.BASE_API_URL + `/friend/request/${userId}`,
        getFriendSuggestions: APIBaseService.BASE_API_URL + '/friend/suggested',
    };

    public static async getFriends({userId, pagination}: {userId: string; pagination?: PaginationRequest}) {
        return await axiosInstance
            .get<PaginationResponse<IFriend>>(FriendService.ROUTES.friend(userId), {
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

    public static async getFriendSuggestions({pagination}: {pagination?: PaginationRequest}) {
        return await axiosInstance
            .get<PaginationResponse<IFriend>>(FriendService.ROUTES.getFriendSuggestions, {
                params: {
                    page: pagination?.page,
                    limit: pagination?.limit,
                },
            })
            .then((res) => res.data);
    }


    public static async sendFriendRequest({userId}: {userId: string}) {
        return await axiosInstance.post(FriendService.ROUTES.sendFriendRequest(userId));
    }

    public static async acceptFriendRequest({requestId, payload}: {requestId: string; payload: IFriendRequestStatus}) {
        return await axiosInstance.put(FriendService.ROUTES.acceptFriendRequest(requestId), payload);
    }

    public static async getMySuggestedFriends({pagination}: {pagination?: PaginationRequest}) {
        return await axiosInstance
            .get<PaginationResponse<IFriend>>(FriendService.ROUTES.mySuggestedFriends, {
                params: {
                    page: pagination?.page,
                    limit: pagination?.limit,
                },
            })
            .then((res) => res.data);
    }
}
