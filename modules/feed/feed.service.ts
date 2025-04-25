import {axiosInstance} from '@/lib/axios';

import {APIBaseService} from '../main.service';
import {IFeed} from './feed.interface';

export class FeedService extends APIBaseService {
    public static readonly ROUTES = {
        feed: APIBaseService.BASE_API_URL + '/newsfeed',
    };

    public static async getNewsFeed() {
        return await axiosInstance.get<IFeed>(FeedService.ROUTES.feed).then((res) => res.data);
    }
}
