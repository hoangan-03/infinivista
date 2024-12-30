import React from 'react';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogOverlay,
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

interface MultimediaSectionProps {
    attachmentList: Attachment[];
    maxNumberOfDisplays: number;
    className?: string;
}

const MultimediaSection: React.FC<MultimediaSectionProps> = ({attachmentList, maxNumberOfDisplays, className}) => {
    const imageCount = attachmentList.filter((attachment) => attachment.type === 'image').length;
    const videoCount = attachmentList.filter((attachment) => attachment.type === 'video').length;

    return (
        <div className=''>
            <Dialog>
                <DialogTrigger>
                    <section
                        id='post-multimedia'
                        className='grid auto-rows-fr grid-cols-[repeat(auto-fill,_minmax(188px,_1fr))] gap-3'
                    >
                        {attachmentList.map((media, index) => {
                            const length = attachmentList.length;
                            const overflow = length > maxNumberOfDisplays;
                            const lastDisplayIndex = maxNumberOfDisplays - 1;

                            return (
                                index < maxNumberOfDisplays && (
                                    <div
                                        id={media.type + '-' + media.id}
                                        key={media.id}
                                        className='relative h-full w-full rounded-xl object-cover shadow-sm'
                                    >
                                        {index === lastDisplayIndex && overflow && (
                                            // <Icon
                                            //     name='Plus'
                                            //     width='30%'
                                            //     height='30%'
                                            //     className='absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transform select-none text-[4rem] text-white'
                                            // />
                                            <div className='absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transform select-none text-[4rem] text-white'>
                                                {length - 2}+
                                            </div>
                                        )}
                                        <div
                                            className={cn(
                                                'h-full w-full',
                                                index === lastDisplayIndex && overflow && 'brightness-[10%] filter'
                                            )}
                                        >
                                            {media.type === 'image' && (
                                                <img
                                                    src={media.src}
                                                    alt={media.alt}
                                                    className='h-full w-full rounded-xl object-cover'
                                                />
                                            )}
                                            {media.type === 'video' && (
                                                <video
                                                    controls={!(lastDisplayIndex && overflow)}
                                                    className='h-full w-full rounded-xl object-cover'
                                                >
                                                    <source src={media.src} type='video/mp4' />
                                                </video>
                                            )}
                                        </div>
                                    </div>
                                )
                            );
                        })}
                    </section>
                </DialogTrigger>
                <DialogContent id='dialog-content' className={cn(className)}>
                    <DialogHeader>
                        <DialogTitle className='sticky top-0 z-10 flex justify-center items-center gap-4 bg-white py-2'>
                            {imageCount && imageCount.toString() + ' Images'}
                            {imageCount && videoCount && <div id='divider' className='h-full w-[2px] bg-black' />}
                            {videoCount && videoCount.toString() + ' Videos'}
                        </DialogTitle>
                        <DialogDescription className='flex h-full flex-col justify-between gap-5 pt-5'>
                            {attachmentList.map((media) => {
                                return (
                                    <div key={media.id}>
                                        {media.type === 'image' && (
                                            <img src={media.src} alt={media.alt} className='h-fit w-full rounded-xl' />
                                        )}
                                        {media.type === 'video' && (
                                            <video controls className='h-fit w-full rounded-xl'>
                                                <source src={media.src} type='video/mp4' />
                                            </video>
                                        )}
                                    </div>
                                );
                            })}
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default MultimediaSection;