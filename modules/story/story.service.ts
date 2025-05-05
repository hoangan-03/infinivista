import {axiosInstance} from '@/lib/axios';

import {PaginationRequest, PaginationResponse} from '../api.interface';
import {APIBaseService} from '../main.service';
import {
    IStoryComment,
    IStoryCommentCreate,
    IStoryCommentUpdate,
    IStoryReaction,
    IStoryReactionAdd,
    IStoryReactionCount,
    IStoryReactionDelete,
} from './story.interface';

export class StoryService extends APIBaseService {
    public static readonly ROUTES = {
        storiesByNewsFeed: (newsFeedId: string) => APIBaseService.BASE_API_URL + `/newsfeed/${newsFeedId}/stories`,
        storyComments: (storyId: string) => APIBaseService.BASE_API_URL + `/story/${storyId}/comments`,
        storyComment: (storyId: string) => APIBaseService.BASE_API_URL + `/story/${storyId}/comment`,
        comment: (commentId: string) => APIBaseService.BASE_API_URL + `/story/comment/${commentId}`,
        storyReactionCount: (storyId: string) => APIBaseService.BASE_API_URL + `/story/${storyId}/reaction-counts`,
        storyReactions: (storyId: string) => APIBaseService.BASE_API_URL + `/story/${storyId}/reactions`,
        storyReaction: (storyId: string) => APIBaseService.BASE_API_URL + `/story/${storyId}/reaction`,
    };

    public static async getStories({newsFeedId, pagination}: {newsFeedId: string; pagination?: PaginationRequest}) {
        return await axiosInstance
            .get(StoryService.ROUTES.storiesByNewsFeed(newsFeedId), {
                params: {
                    page: pagination?.page,
                    limit: pagination?.limit,
                },
            })
            .then((res) => res.data);
    }

    public static async getStoryComments({storyId, pagination}: {storyId: string; pagination?: PaginationRequest}) {
        return await axiosInstance
            .get<PaginationResponse<IStoryComment>>(StoryService.ROUTES.storyComments(storyId), {
                params: {
                    page: pagination?.page,
                    limit: pagination?.limit,
                },
            })
            .then((res) => res.data);
    }

    public static async createStoryComment(storyId: string, payload: IStoryCommentCreate) {
        const formData = new FormData();
        formData.append('text', payload.text);

        return await axiosInstance
            .post<null>(StoryService.ROUTES.storyComment(storyId), formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((res) => res.data);
    }

    public static async updateStoryComment(commentId: string, payload: IStoryCommentUpdate) {
        const formData = new FormData();
        formData.append('text', payload.text);

        return await axiosInstance.patch<null>(StoryService.ROUTES.comment(commentId), formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    }

    public static async deleteStoryComment(commentId: string) {
        return await axiosInstance.delete<null>(StoryService.ROUTES.comment(commentId));
    }

    public static async getStoryReactions({storyId}: {storyId: string}) {
        return await axiosInstance
            .get<IStoryReaction[]>(StoryService.ROUTES.storyReactions(storyId))
            .then((res) => res.data);
    }

    public static async getStoryReactionCount({storyId}: {storyId: string}) {
        return await axiosInstance
            .get<IStoryReactionCount>(StoryService.ROUTES.storyReactionCount(storyId))
            .then((res) => res.data);
    }

    public static async addStoryReaction(storyId: string, payload: IStoryReactionAdd) {
        return await axiosInstance.post<null>(StoryService.ROUTES.storyReaction(storyId), payload);
    }

    public static async deleteStoryReaction(storyId: string, payload: IStoryReactionDelete) {
        return await axiosInstance.delete<null>(StoryService.ROUTES.storyReaction(storyId), {data: payload});
    }
}
