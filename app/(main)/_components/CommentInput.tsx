'use client';

import React from 'react';

import {IconButton} from '@/components/commons';
import {Input} from '@/components/ui';

interface CommentInputProps {
    onSubmit?: (commentText: string) => void;
    placeholder?: string;
    variant?: 'default' | 'with-icon';
}

export const CommentInput: React.FC<CommentInputProps> = ({
    onSubmit,
    placeholder = 'Add a comment...',
    variant = 'default',
}) => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const comment = form.comment.value;
        if (comment.trim() && onSubmit) {
            onSubmit(comment);
            form.reset();
        }
    };

    return (
        <form onSubmit={handleSubmit} className='relative'>
            <Input type='text' name='comment' placeholder={placeholder} fontSize='text-paragraph2' />
            {variant === 'with-icon' && (
                <div className='absolute right-3 top-1/2 -translate-y-1/2 flex-center'>
                    <IconButton label='Add emoji' defaultName='emojiHappy' hoverName='emojiHappy_filled' />
                </div>
            )}
        </form>
    );
};
