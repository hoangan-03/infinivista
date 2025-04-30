import {axiosInstance} from '@/lib/axios';

import {PaginationRequest, PaginationResponse} from '../api.interface';
import {APIBaseService} from '../main.service';
import {IPost, IPostComment, IPostReactionCount} from './post.interface';

export class PostService extends APIBaseService {
    public static readonly ROUTES = {
        postsByNewsFeed: (newsFeedId: string) => APIBaseService.BASE_API_URL + `/newsfeed/${newsFeedId}/posts`,
        post: APIBaseService.BASE_API_URL + '/post',
        postDiscover: APIBaseService.BASE_API_URL + '/newsfeed/discover',
        postComments: (postId: string) => APIBaseService.BASE_API_URL + `/post/${postId}/comments`,
        postReactionCount: (postId: string) => APIBaseService.BASE_API_URL + `/post/${postId}/reaction-counts`,
    };

    public static async getPosts({newsFeedId, pagination}: {newsFeedId: string; pagination?: PaginationRequest}) {
        return await axiosInstance
            .get<PaginationResponse<IPost>>(PostService.ROUTES.postsByNewsFeed(newsFeedId), {
                params: {
                    page: pagination?.page,
                    limit: pagination?.limit,
                },
            })
            .then((res) => res.data);
    }

    public static async getDiscoverPosts({pagination}: {pagination?: PaginationRequest}) {
        return await axiosInstance
            .get<PaginationResponse<IPost>>(PostService.ROUTES.postDiscover, {
                params: {
                    page: pagination?.page,
                    limit: pagination?.limit,
                },
            })
            .then((res) => res.data);
    }

    public static async getPostComments({postId, pagination}: {postId: string; pagination?: PaginationRequest}) {
        return await axiosInstance
            .get<PaginationResponse<IPostComment>>(PostService.ROUTES.postComments(postId), {
                params: {
                    page: pagination?.page,
                    limit: pagination?.limit,
                },
            })
            .then((res) => res.data);
    }

    public static async getPostReactionCount({postId}: {postId: string}) {
        return await axiosInstance
            .get<IPostReactionCount>(PostService.ROUTES.postReactionCount(postId))
            .then((res) => res.data);
    }
}
