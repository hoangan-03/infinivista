'use client';
import Image from 'next/image';
import {useState} from 'react';

import {Avatar, EmptyState} from '@/components/commons';
import {
    Button,
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    ScrollArea,
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
    Textarea,
} from '@/components/ui';
import {capitalize} from '@/lib/utils';
import {POST_PRIVACY_TYPES} from '@/mock_data/post-privacy';
import {IProfile} from '@/mock_data/profile';

interface Props {
    open: boolean;
    data: IProfile;
    onClose: () => void;
}

const postPrivacyTypes = Object.values(POST_PRIVACY_TYPES);

export const ModalNewPost: React.FC<Props> = ({open, data, onClose}) => {
    const [toggle, setToggle] = useState<boolean>(false);

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent autoFocus={false} className='h-fit min-w-[600px] space-y-4'>
                <DialogHeader className='space-y-2'>
                    <DialogTitle>Create a Post</DialogTitle>
                </DialogHeader>
                <form className='space-y-4'>
                    <div className='flex items-center gap-4'>
                        <div className='size-10'>
                            <Avatar />
                        </div>
                        <div className='space-y-1'>
                            <p className='font-semibold'>
                                {data.firstName} {data.lastName}
                            </p>
                            <Select value={postPrivacyTypes[0]} onValueChange={() => {}}>
                                <SelectTrigger className='h-7 w-[100px] border-2 border-slate-300 text-sm'>
                                    <SelectValue placeholder='Friends' className='placeholder:text-sm' />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {postPrivacyTypes.map((type) => (
                                            <SelectItem key={type} value={type}>
                                                {capitalize(type)}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <Textarea
                        placeholder='What is in your mind?'
                        className='custom-scrollbar h-24 resize-none bg-slate-50'
                    />
                    <ScrollArea className='h-[200px]'>
                        {toggle && (
                            <div className='flex flex-wrap gap-2'>
                                {Array.from({length: 8}).map((_, index) => (
                                    <div key={index} className='w-[calc(33.333%-6px)]'>
                                        <Image
                                            src='/assets/images/social_1.jpg'
                                            alt={`Post image ${index + 1}`}
                                            width={160}
                                            height={100}
                                            unoptimized={true}
                                            className='h-auto w-full object-cover'
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                        {!toggle && <EmptyState text='No image added' width={150} />}
                    </ScrollArea>
                    <div className='flex items-center justify-between'>
                        <Button className='h-8 px-3' variant='secondary' onClick={() => setToggle(!toggle)}>
                            Add Media
                        </Button>
                        <p>6 total</p>
                    </div>
                    <Button type='submit' className='w-full rounded-sm'>
                        Post
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};
