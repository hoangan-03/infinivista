export enum ROUTES {
    HOME = '/',

    LOGIN = '/auth/login',
    REGISTER = '/auth/register',
    FORGOT_PASSWORD = '/auth/forgot-password',

    CONNECT_FEED = '/connect/feed',
    CONNECT_STORY = '/connect/story',

    PROFILE = '/profile/[username]',

    COMMUNICATION = '/communication',
    COMMUNICATION_CHANNEL = '/communication/[channelId]',
}
