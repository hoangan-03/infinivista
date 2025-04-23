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

type AttachmentType = 'image' | 'video';

interface Attachment {
    id: number;
    type: AttachmentType;
    src: string;
    alt: string;
}

interface ModalMultimediaProps {
    attachments?: Attachment[];
    displayCount?: number;
    className?: string;
}

export const ModalMultimedia: React.FC<ModalMultimediaProps> = ({attachments, displayCount = 4, className}) => {
    const imageCount = attachments?.filter((attachment) => attachment.type === 'image').length;
    const videoCount = attachments?.filter((attachment) => attachment.type === 'video').length;

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
                                        className='relative h-full w-full rounded-xl object-cover shadow-sm'
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
                                            {media.type === 'image' && (
                                                <Image
                                                    src={media.src}
                                                    alt={media.alt}
                                                    width={0}
                                                    height={0}
                                                    sizes='100vw'
                                                    className='h-full w-full rounded-xl object-cover'
                                                />
                                            )}
                                            {media.type === 'video' && (
                                                <ClientVideo
                                                    controls={!(lastDisplayIndex && overflow)}
                                                    className='h-full w-full rounded-xl object-cover'
                                                    src={media.src}
                                                />
                                            )}
                                        </div>
                                    </div>
                                )
                            );
                        })}
                </section>
            </DialogTrigger>
            <DialogContent className={cn('sm:max-w-[425px] md:max-w-[600px] lg:max-w-[800px]', className)}>
                <DialogHeader>
                    <DialogTitle className='sticky top-0 z-10 flex items-center justify-center gap-4 bg-white py-2'>
                        {imageCount && imageCount.toString() + ' Images'}
                        {imageCount && videoCount && <Separator orientation='vertical' className='w-[2px] bg-black' />}
                        {videoCount && videoCount.toString() + ' Videos'}
                    </DialogTitle>
                </DialogHeader>
                <DialogDescription />
                <div className='flex h-full flex-col justify-between gap-5'>
                    {attachments &&
                        attachments.map((media) => (
                            <div key={media.id}>
                                {media.type === 'image' && (
                                    <Image
                                        src={media.src}
                                        alt={media.alt}
                                        width={0}
                                        height={0}
                                        sizes='100vw'
                                        className='h-auto w-full rounded-xl object-cover'
                                    />
                                )}
                                {media.type === 'video' && (
                                    <ClientVideo controls className='h-fit w-full rounded-xl' src={media.src} />
                                )}
                            </div>
                        ))}
                </div>
            </DialogContent>
        </Dialog>
    );
};
