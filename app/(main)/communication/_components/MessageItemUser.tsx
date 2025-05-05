'use client';

import Image from 'next/image';

import {ClientVideo} from '@/components/commons';
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from '@/components/ui';
import {cn} from '@/lib/utils';
import {ATTACHMENT_TYPE, REACTION_TYPE} from '@/modules/common.enum';
import {MESSAGE_TYPE} from '@/modules/message/message.enum';
import {IMessage} from '@/modules/message/message.interface';

import {ReactionButton} from '../../_components';

interface Props {
    message: IMessage;
    isCurrentUser?: boolean;
    showAvatar?: boolean;
    className?: string;
}

export const MessageItemUser: React.FC<Props> = ({message, isCurrentUser = false, showAvatar = false, className}) => {
    const formattedTime = new Date(message.sent_at).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    });

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
                                <Image
                                    src={message.sender.profileImageUrl || '/assets/images/placeholder.png'}
                                    alt='User Placeholder'
                                    width={32}
                                    height={32}
                                />
                            </div>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{message.sender.username}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            ) : (
                <div className='w-8' />
            )}
            <div
                className={cn(
                    'relative w-full rounded-md',
                    message.type === MESSAGE_TYPE.MESSAGE && 'py-1 pl-2 pr-4',
                    message.type === MESSAGE_TYPE.ATTACHMENT && 'space-y-1',
                    message.type === MESSAGE_TYPE.MESSAGE ? (isCurrentUser ? 'bg-primary' : 'bg-gray-100') : ''
                )}
            >
                {!isCurrentUser && (
                    <div className='flex items-center gap-3'>
                        <p className='text-black'>{message.sender.username}</p>
                        {/* <p className='text-caption text-gray-500'>{message.role}</p> */}
                    </div>
                )}
                <div className='w-full'>
                    {message.type && MESSAGE_TYPE.MESSAGE && message.messageText && (
                        <>
                            <p
                                className={cn(
                                    isCurrentUser ? 'text-white' : 'text-black',
                                    'w-[90%] text-justify text-[14px]'
                                )}
                            >
                                {message.messageText}
                            </p>
                            <p className={cn(isCurrentUser ? 'text-white' : 'text-gray-500', 'text-right text-[12px]')}>
                                {formattedTime}
                            </p>
                        </>
                    )}
                    {message.type === MESSAGE_TYPE.ATTACHMENT && message.attachmentType === ATTACHMENT_TYPE.IMAGE && (
                        <Image
                            src={message.attachment_url}
                            alt={message.attachment_name}
                            width={200}
                            height={100}
                            unoptimized={true}
                            className='h-auto w-full rounded-md object-cover'
                        />
                    )}
                    {message.type === MESSAGE_TYPE.ATTACHMENT && message.attachmentType === ATTACHMENT_TYPE.VIDEO && (
                        <ClientVideo
                            playsInline
                            src={message.attachment_url}
                            className='h-auto w-full rounded-md object-cover'
                        />
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
                                <Image
                                    src={message.sender.profileImageUrl || '/assets/images/placeholder.png'}
                                    alt='User Placeholder'
                                    width={32}
                                    height={32}
                                />
                            </div>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{message.sender.username}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            ) : (
                <div className='w-8' />
            )}
        </div>
    );
};
