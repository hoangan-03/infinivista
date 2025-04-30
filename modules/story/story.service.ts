import {axiosInstance} from '@/lib/axios';

import {PaginationRequest, PaginationResponse} from '../api.interface';
import {APIBaseService} from '../main.service';
import {IStoryComment, IStoryReactionCount} from './story.interface';

export class StoryService extends APIBaseService {
    public static readonly ROUTES = {
        storiesByNewsFeed: (newsFeedId: string) => APIBaseService.BASE_API_URL + `/newsfeed/${newsFeedId}/stories`,
        storyComments: (storyId: string) => APIBaseService.BASE_API_URL + `/story/${storyId}/comments`,
        storyReactionCount: (storyId: string) => APIBaseService.BASE_API_URL + `/story/${storyId}/reaction-counts`,
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

    public static async getStoryReactionCount({storyId}: {storyId: string}) {
        return await axiosInstance
            .get<IStoryReactionCount>(StoryService.ROUTES.storyReactionCount(storyId))
            .then((res) => res.data);
    }
}
