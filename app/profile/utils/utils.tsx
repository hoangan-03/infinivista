export const getTimeStamp = (time: Date): string => {
    if (!time) return '';

    const timeOffset: number = (new Date().getTime() - time.getTime()) / 1000;
    let timeStamp: string;
    if (timeOffset < 60) {
        const seconds = Math.floor(timeOffset);
        timeStamp = seconds >= 30 ? `${seconds} second${seconds !== 1 ? 's' : ''} ago` : 'Just now';
    } else if (timeOffset < 3600) {
        const minutes = Math.floor(timeOffset / 60);
        timeStamp = `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    } else if (timeOffset < 86400) {
        const hours = Math.floor(timeOffset / 3600);
        timeStamp = `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    } else if (timeOffset < 604800) {
        const days = Math.floor(timeOffset / 86400);
        timeStamp = `${days} day${days !== 1 ? 's' : ''} ago`;
    } else {
        timeStamp = time.toString();
    }

    return timeStamp;
};

export const getSumReactions = (reactionList: {count: number}[]): number => {
    if (!reactionList || reactionList.length === 0) return 0;
    return reactionList.reduce((sum, reaction) => sum + reaction.count, 0);
};