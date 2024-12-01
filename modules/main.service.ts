export abstract class APIBaseService {
    protected static readonly BASE_URL = process.env.NEXT_PUBLIC_API_URL;
    protected static readonly API_VERSION = process.env.NEXT_PUBLIC_API_VERSION;
    protected static readonly BASE_API_URL = this.BASE_URL + '/' + this.API_VERSION;
}
