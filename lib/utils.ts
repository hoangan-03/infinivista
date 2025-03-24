import {type ClassValue, clsx} from 'clsx';
import {twMerge} from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function capitalizeString(str: string) {
    if (str.length === 0) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function sleep(seconds: number) {
    new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}

export function getTimeStamp(time: Date | string): string {
    if (!time) return '';
    if (typeof time === 'string') time = new Date(time);

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
}

export function getSumReactions(reactionList: {count: number}[]): number {
    if (!reactionList || reactionList.length === 0) return 0;
    return reactionList.reduce((sum, reaction) => sum + reaction.count, 0);
}
