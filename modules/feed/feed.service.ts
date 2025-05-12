import {axiosInstance} from '@/lib/axios';

import {APIBaseService} from '../main.service';
import {IFeed} from './feed.interface';

export class FeedService extends APIBaseService {
    public static readonly ROUTES = {
        feed: APIBaseService.BASE_API_URL + '/newsfeed',
        feedByUserId: (userId: string) => APIBaseService.BASE_API_URL + `/newsfeed/${userId}`,
    };

    public static async getNewsFeed() {
        return await axiosInstance.get<IFeed>(FeedService.ROUTES.feed).then((res) => res.data);
    }

    public static async getNewsFeedByUserId({userId}: {userId: string}) {
        return await axiosInstance.get<IFeed>(FeedService.ROUTES.feedByUserId(userId)).then((res) => res.data);
    }
}
