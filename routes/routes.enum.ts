export enum ENUM_ROUTES {
    HOME_LANDINGPAGE = '/',

    LOGIN = '/auth/login',
    REGISTER = '/auth/register',
    FORGOT_PASSWORD = '/auth/forgot-password',
    // RESET_PASSWORD = '/auth/reset-password/:token',
    // RESET_SUCCESS = '/auth/reset-password/success',
    // RESET_EXPIRED = '/auth/reset-password/expired',

    'CONNECT_FEED_FOR-YOU' = '/connect' + '/connect/feed' + '/connect/feed/for-you',
    CONNECT_FEED_FRIENDS = '/connect/feed/friends',
    CONNECT_FEED_FOLLOWING = '/connect/feed/following',
    CONNECT_FEED_POPULAR = '/connect/feed/popular',
    
    'CONNECT_STORY_FOR-YOU' = '/connect/story' + '/connect/story/for-you',
    CONNECT_STORY_FRIENDS = '/connect/story/friends',
    CONNECT_STORY_FOLLOWING = '/connect/story/following',
    CONNECT_STORY_POPULAR = '/connect/story/popular',

    PROFILE = '/profile/[userId]',

    COMMUNICATION = '/communication',
    COMMUNICATION_CHANNEL = '/communication/[channelId]',
}
