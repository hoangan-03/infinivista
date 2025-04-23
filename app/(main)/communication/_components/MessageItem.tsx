'use client';

import Image from 'next/image';

import {ClientVideo} from '@/components/commons';
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from '@/components/ui';
import {cn} from '@/lib/utils';
import {IMessage} from '@/mock_data/message';
import {REACTION_TYPE} from '@/mock_data/post';
import placeholderImage from '@/public/assets/images/placeholder.png';

import {ReactionButton} from '../../_components';

interface Props {
    data: IMessage;
    isCurrentUser?: boolean;
    showAvatar?: boolean;
    className?: string;
}

export const MessageItem: React.FC<Props> = ({data, isCurrentUser = false, showAvatar = false, className}) => {
    const formattedTime = data.time.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', hour12: true});

    const handleClickReact = (reaction: REACTION_TYPE) => {
        console.log('reaction', reaction);
    };
    return (
        <div className={cn('flex gap-2', className)}>
            {!isCurrentUser && showAvatar ? (
                <TooltipProvider delayDuration={150}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div className='relative h-8 w-8 cursor-pointer overflow-hidden rounded-full'>
                                <Image src={placeholderImage} alt='User Placeholder' width={32} height={32} />
                            </div>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{data.username}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            ) : (
                <div className='w-8' />
            )}
            <div
                className={cn(
                    'relative w-full rounded-md',
                    data.message && 'py-1 pl-2 pr-4',
                    (data.image || data.video) && 'space-y-1',
                    data.message ? (isCurrentUser ? 'bg-primary' : 'bg-gray-100') : ''
                )}
            >
                {!isCurrentUser && (
                    <div className='flex items-center gap-3'>
                        <p className='text-black'>{data.username}</p>
                        <p className='text-caption text-gray-500'>{data.role}</p>
                    </div>
                )}
                <div className='w-full'>
                    {data.message && (
                        <>
                            <p
                                className={cn(
                                    isCurrentUser ? 'text-white' : 'text-black',
                                    'w-[90%] text-justify text-[14px]'
                                )}
                            >
                                {data.message}
                            </p>
                            <p className={cn(isCurrentUser ? 'text-white' : 'text-gray-500', 'text-right text-[12px]')}>
                                {formattedTime}
                            </p>
                        </>
                    )}
                    {data.image && (
                        <Image
                            src={data.image}
                            alt={`${data.username}'s image`}
                            width={200}
                            height={100}
                            unoptimized={true}
                            className='h-auto w-full rounded-md object-cover'
                        />
                    )}
                    {data.video && (
                        <ClientVideo playsInline src={data.video} className='h-auto w-full rounded-md object-cover' />
                    )}
                </div>
                {!isCurrentUser && (
                    <div className='absolute -bottom-2 -right-1 z-10 flex items-center rounded-full bg-slate-100'>
                        <ReactionButton onReact={handleClickReact} width={18} height={18} />
                    </div>
                )}
            </div>
            {isCurrentUser && showAvatar ? (
                <TooltipProvider delayDuration={150}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div className='relative h-8 w-8 cursor-pointer overflow-hidden rounded-full'>
                                <Image src={placeholderImage} alt='User Placeholder' width={32} height={32} />
                            </div>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{data.username}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            ) : (
                <div className='w-8' />
            )}
        </div>
    );
};
