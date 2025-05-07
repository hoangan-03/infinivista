import {axiosInstance} from '@/lib/axios';

import {PaginationRequest, PaginationResponse} from '../api.interface';
import {APIBaseService} from '../main.service';
import {
    IPost,
    IPostComment,
    IPostCommentCreate,
    IPostCommentUpdate,
    IPostCreate,
    IPostReaction,
    IPostReactionAdd,
    IPostReactionCount,
    IPostReactionDelete,
} from './post.interface';

export class PostService extends APIBaseService {
    public static readonly ROUTES = {
        postsByNewsFeed: (newsFeedId: string) => APIBaseService.BASE_API_URL + `/newsfeed/${newsFeedId}/posts`,
        post: APIBaseService.BASE_API_URL + '/post',
        postDiscover: APIBaseService.BASE_API_URL + '/newsfeed/discover',
        postComments: (postId: string) => APIBaseService.BASE_API_URL + `/post/${postId}/comments`,
        postComment: (postId: string) => APIBaseService.BASE_API_URL + `/post/${postId}/comment`,
        postReactions: (postId: string) => APIBaseService.BASE_API_URL + `/post/${postId}/reactions`,
        postReaction: (postId: string) => APIBaseService.BASE_API_URL + `/post/${postId}/reaction`,
        postReactionCount: (postId: string) => APIBaseService.BASE_API_URL + `/post/${postId}/reaction-counts`,
        comment: (commentId: string) => APIBaseService.BASE_API_URL + `/post/comment/${commentId}`,
        createPost: APIBaseService.BASE_API_URL + '/newsfeed/post',
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

    public static async createPost({payload}: {payload: IPostCreate}) {
        const formData = new FormData();
        formData.append('newsFeedId', payload.newsFeedId);
        formData.append('content', payload.content);

        for (let i = 0; i < payload.files.length; i++) {
            formData.append('files', payload.files[i]);
        }

        for (let i = 0; i < payload.attachmentTypes.length; i++) {
            formData.append('attachmentTypes', payload.attachmentTypes[i]);
        }

        return await axiosInstance
            .post<null>(PostService.ROUTES.createPost, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
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

    public static async createPostComment(postId: string, payload: IPostCommentCreate) {
        const formData = new FormData();
        formData.append('text', payload.text);

        return await axiosInstance
            .post<null>(PostService.ROUTES.postComment(postId), formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((res) => res.data);
    }

    public static async updatePostComment(commentId: string, payload: IPostCommentUpdate) {
        const formData = new FormData();
        formData.append('text', payload.text);

        return await axiosInstance.patch<null>(PostService.ROUTES.comment(commentId), formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    }

    public static async deletePostComment(commentId: string) {
        return await axiosInstance.delete<null>(PostService.ROUTES.comment(commentId));
    }

    public static async getPostReactions({postId}: {postId: string}) {
        return await axiosInstance
            .get<IPostReaction[]>(PostService.ROUTES.postReactions(postId))
            .then((res) => res.data);
    }

    public static async getPostReactionCount({postId}: {postId: string}) {
        return await axiosInstance
            .get<IPostReactionCount>(PostService.ROUTES.postReactionCount(postId))
            .then((res) => res.data);
    }

    public static async addPostReaction(postId: string, payload: IPostReactionAdd) {
        return await axiosInstance.post<null>(PostService.ROUTES.postReaction(postId), payload);
    }

    public static async deletePostReaction(postId: string, payload: IPostReactionDelete) {
        return await axiosInstance.delete<null>(PostService.ROUTES.postReaction(postId), {data: payload});
    }
}
