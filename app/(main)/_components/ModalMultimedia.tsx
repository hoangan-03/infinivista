import Image from 'next/image';
import React from 'react';

import {ClientVideo, Spinner} from '@/components/commons';
import {Separator} from '@/components/ui';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {cn} from '@/lib/utils';
import {ATTACHMENT_TYPE} from '@/modules/common.enum';
import {IPostAttachment} from '@/modules/post/post.interface';

interface ModalMultimediaProps {
    attachments?: IPostAttachment[];
    displayCount?: number;
    className?: string;
}

export const ModalMultimedia: React.FC<ModalMultimediaProps> = ({attachments, displayCount = 4, className}) => {
    const imageCount = attachments?.filter((attachment) => attachment.attachmentType === ATTACHMENT_TYPE.IMAGE).length;
    const videoCount = attachments?.filter((attachment) => attachment.attachmentType === ATTACHMENT_TYPE.VIDEO).length;

    return (
        <Dialog>
            <DialogTrigger className='focus-visible:outline-none' asChild>
                <section
                    className={cn(
                        'relative grid cursor-pointer auto-rows-fr grid-cols-[repeat(auto-fill,_minmax(188px,_1fr))] gap-3',
                        (displayCount === 0 || !attachments) && 'h-20 rounded-md bg-slate-100/70'
                    )}
                >
                    {(displayCount === 0 || !attachments) && (
                        <div className='absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2'>
                            <Spinner width={40} height={40} />
                        </div>
                    )}
                    {attachments &&
                        attachments.map((media, index) => {
                            const overflow = attachments.length > displayCount;
                            const lastDisplayIndex = displayCount - 1;
                            return (
                                index < displayCount && (
                                    <div
                                        key={media.id}
                                        className='relative h-[220px] w-[210px] rounded-xl object-cover shadow-sm'
                                    >
                                        {index === lastDisplayIndex && overflow && (
                                            <div className='absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transform select-none text-[4rem] text-white'>
                                                {attachments.length - 2}+
                                            </div>
                                        )}
                                        <div
                                            className={cn(
                                                'h-full w-full',
                                                index === lastDisplayIndex && overflow && 'brightness-[10%] filter'
                                            )}
                                        >
                                            {media.attachmentType === ATTACHMENT_TYPE.IMAGE && (
                                                <Image
                                                    src={media.attachment_url}
                                                    alt={`Image from ${media.attachment_url}`}
                                                    width={0}
                                                    height={0}
                                                    sizes='100vw'
                                                    className='h-full w-full rounded-xl object-cover'
                                                />
                                            )}
                                            {media.attachmentType === ATTACHMENT_TYPE.VIDEO && (
                                                <ClientVideo
                                                    controls={!(lastDisplayIndex && overflow)}
                                                    className='h-full w-full rounded-xl object-cover'
                                                    src={media.attachment_url}
                                                />
                                            )}
                                        </div>
                                    </div>
                                )
                            );
                        })}
                </section>
            </DialogTrigger>
            <DialogContent className={cn('grid h-fit sm:max-w-[425px] md:max-w-[600px] lg:max-w-[800px]', className)}>
                <DialogHeader>
                    <DialogTitle className='sticky top-0 z-10 flex items-center justify-center gap-4 bg-white py-2'>
                        {imageCount && imageCount.toString() + ' Images'}
                        {imageCount && videoCount && <Separator orientation='vertical' className='w-[2px] bg-black' />}
                        {videoCount && videoCount.toString() + ' Videos'}
                    </DialogTitle>
                </DialogHeader>
                <DialogDescription />
                <div className='h-full justify-between space-y-5'>
                    {attachments &&
                        attachments.map((media) => (
                            <div key={media.id} className='relative h-[550px] w-[750px]'>
                                {media.attachmentType === ATTACHMENT_TYPE.IMAGE && (
                                    <Image
                                        src={media.attachment_url}
                                        alt={`Image from ${media.attachment_url}`}
                                        fill
                                        className='h-auto w-full rounded-xl object-cover'
                                    />
                                )}
                                {media.attachmentType === ATTACHMENT_TYPE.VIDEO && (
                                    <ClientVideo
                                        controls
                                        className='h-[550px] w-[750px] rounded-xl'
                                        src={media.attachment_url}
                                    />
                                )}
                            </div>
                        ))}
                </div>
            </DialogContent>
        </Dialog>
    );
};
