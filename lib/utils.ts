import {type ClassValue, clsx} from 'clsx';
import {twMerge} from 'tailwind-merge';

import {IPostReactionCount} from '@/modules/post/post.interface';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function capitalize(str: string) {
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

export function getSumReactions(
    reactionCounts: IPostReactionCount | Record<string, number> | null | undefined
): number {
    if (!reactionCounts) return 0;

    // Sum all reaction counts
    return Object.values(reactionCounts).reduce((sum, count) => sum + (count || 0), 0);
}
