'use client';
import Image from 'next/image';
import {useEffect, useRef} from 'react';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {toast} from 'react-toastify';

import {Avatar, EmptyState, Icon} from '@/components/commons';
import {
    Button,
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    Input,
    ScrollArea,
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
    Textarea,
} from '@/components/ui';
import {useFeedContext} from '@/context';
import {capitalize, getFileType} from '@/lib/utils';
import {ATTACHMENT_TYPE} from '@/modules/common.enum';
import {FileWithMetadata} from '@/modules/common.interface';
import {POST_VISIBILITY} from '@/modules/post/post.enum';
import {IPostCreate} from '@/modules/post/post.interface';
import {PostService} from '@/modules/post/post.service';
import {IProfile} from '@/modules/profile/profile.interface';

interface Props {
    open: boolean;
    data?: IProfile;
    onClose: () => void;
}

const postPrivacyTypes = Object.values(POST_VISIBILITY);

type FormValues = {
    content: string;
    files: FileWithMetadata[];
};

export const ModalNewPost: React.FC<Props> = ({open, data, onClose}) => {
    const {newsFeed} = useFeedContext();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const {
        control,
        handleSubmit,
        watch,
        setValue,
        formState: {isSubmitting, isDirty},
        reset,
    } = useForm<FormValues>({
        defaultValues: {
            content: '',
            files: [],
        },
    });

    const files = watch('files');

    // const getFileType = (file: File): ATTACHMENT_TYPE => {
    //     if (file.type.startsWith('image/')) {
    //         return ATTACHMENT_TYPE.IMAGE;
    //     } else if (file.type.startsWith('video/')) {
    //         return ATTACHMENT_TYPE.VIDEO;
    //     }
    //     return ATTACHMENT_TYPE.IMAGE;
    // };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputFiles = e.target.files;
        if (!inputFiles) return;

        const fileArray = Array.from(inputFiles).map((file) => {
            const fileType = getFileType(file);
            return {
                // ...file,
                data: file,
                objectUrl: URL.createObjectURL(file),
                fileType,
            } as FileWithMetadata;
        });

        setValue('files', [...files, ...fileArray], {shouldDirty: true});
    };

    const handleAddMedia = () => {
        fileInputRef.current?.click();
    };

    const removeFile = (index: number) => {
        const newFiles = [...files];
        URL.revokeObjectURL(newFiles[index].objectUrl);
        newFiles.splice(index, 1);
        setValue('files', newFiles, {shouldDirty: true});
    };

    useEffect(() => {
        return () => {
            files.forEach((file) => {
                URL.revokeObjectURL(file.objectUrl);
            });
        };
    }, [files]);

    useEffect(() => {
        if (open) {
            reset();
        }
    }, [open, reset]);

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        if (!newsFeed) return;
        try {
            const payload: IPostCreate = {
                content: data.content,
                files: data.files.map((file) => file.data),
                attachmentTypes: data.files.map((file) => file.fileType),
                newsFeedId: newsFeed.id,
            };
            await PostService.createPost({payload});
            toast.success('Post created successfully!');
        } catch (error) {
            console.error('Error creating post:', error);
            toast.error('Failed to create post.');
        } finally {
            onClose();
        }
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent autoFocus={false} className='h-fit min-w-[600px] space-y-4'>
                <DialogHeader className='space-y-2'>
                    <DialogTitle>Create a Post</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                    <div className='flex items-center gap-4'>
                        <div className='size-10'>
                            <Avatar src={data?.profileImageUrl} />
                        </div>
                        <div className='space-y-1'>
                            <p className='font-semibold'>{data?.username}</p>
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
                    <Controller
                        name='content'
                        control={control}
                        render={({field}) => (
                            <Textarea
                                {...field}
                                placeholder='What is in your mind?'
                                className='custom-scrollbar h-24 resize-none bg-slate-50'
                            />
                        )}
                    />
                    <ScrollArea className='h-[200px]'>
                        {files.length > 0 ? (
                            <div className='flex flex-wrap gap-2'>
                                {files.map((file, index) => (
                                    <div key={index} className='relative w-[calc(33.333%-6px)]'>
                                        <div className='relative h-[150px] w-full overflow-hidden'>
                                            {file.fileType === ATTACHMENT_TYPE.IMAGE && (
                                                <Image
                                                    src={file.objectUrl}
                                                    alt={`Post image ${index + 1}`}
                                                    width={160}
                                                    height={100}
                                                    unoptimized={true}
                                                    className='absolute inset-0 h-full w-full object-cover'
                                                />
                                            )}
                                            {file.fileType === ATTACHMENT_TYPE.VIDEO && (
                                                <video
                                                    src={file.objectUrl}
                                                    controls
                                                    className='absolute inset-0 h-full w-full object-cover'
                                                />
                                            )}
                                            <div className='absolute right-1 top-1 flex gap-1'>
                                                <button
                                                    type='button'
                                                    onClick={() => removeFile(index)}
                                                    className='flex size-4 items-center justify-center rounded bg-red-500 text-white'
                                                >
                                                    <Icon name='x-mark' className='size-3' />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <EmptyState text='No image added' width={150} />
                        )}
                    </ScrollArea>
                    <div className='flex items-center justify-between'>
                        <Input
                            type='file'
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept='image/*,video/*'
                            multiple
                            wrapperClassName='hidden'
                        />
                        <Button className='h-8 px-3' variant='secondary' onClick={handleAddMedia}>
                            Add Media
                        </Button>
                        <p>{files.length} total</p>
                    </div>
                    <Button type='submit' className='w-full rounded-sm' disabled={!isDirty || isSubmitting}>
                        {isSubmitting ? 'Posting...' : 'Post'}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};
