import {axiosInstance} from '@/lib/axios';

import {PaginationRequest, PaginationResponse} from '../api.interface';
import {APIBaseService} from '../main.service';
import {IPost} from '../post/post.interface';
import {IPage, IPageUser} from './page.interface';

export class PageService extends APIBaseService {
    public static readonly ROUTES = {
        myPages: APIBaseService.BASE_API_URL + '/page/my-pages',
        pageById: (pageId: string) => APIBaseService.BASE_API_URL + `/page/${pageId}`,
        pageFollowers: (pageId: string) => APIBaseService.BASE_API_URL + `/page/${pageId}/followers`,
        pagePosts: (pageId: string) => APIBaseService.BASE_API_URL + `/page/${pageId}/posts`,
    };

    public static async getMyPages({pagination}: {pagination?: PaginationRequest}) {
        return await axiosInstance
            .get<PaginationResponse<IPage>>(PageService.ROUTES.myPages, {
                params: {
                    page: pagination?.page,
                    limit: pagination?.limit,
                },
            })
            .then((res) => res.data);
    }

    public static async getPageById({pageId}: {pageId: string}) {
        return await axiosInstance.get<IPage>(PageService.ROUTES.pageById(pageId)).then((res) => res.data);
    }

    public static async getPageFollowers({pageId, pagination}: {pageId: string; pagination?: PaginationRequest}) {
        return await axiosInstance
            .get<PaginationResponse<IPageUser>>(PageService.ROUTES.pageFollowers(pageId), {
                params: {
                    page: pagination?.page,
                    limit: pagination?.limit,
                },
            })
            .then((res) => res.data);
    }

    public static async getPagePosts({pageId, pagination}: {pageId: string; pagination?: PaginationRequest}) {
        return await axiosInstance
            .get<PaginationResponse<IPost>>(PageService.ROUTES.pagePosts(pageId), {
                params: {
                    page: pagination?.page,
                    limit: pagination?.limit,
                },
            })
            .then((res) => res.data);
    }
}
