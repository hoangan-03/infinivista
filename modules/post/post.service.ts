import {axiosInstance} from '@/lib/axios';

import {PaginationResponse} from '../api.interface';
import {APIBaseService} from '../main.service';
import {IPost} from './post.interface';

export class PostService extends APIBaseService {
    public static readonly ROUTES = {
        postsByNewsFeed: (newsFeedId: string) => APIBaseService.BASE_API_URL + `/newsfeed/${newsFeedId}/posts`,
        post: APIBaseService.BASE_API_URL + '/post',
    };

    public static async getPosts(newsFeedId: string) {
        return await axiosInstance
            .get<PaginationResponse<IPost>>(PostService.ROUTES.postsByNewsFeed(newsFeedId))
            .then((res) => res.data);
    }

    // public static async createPost()
}
