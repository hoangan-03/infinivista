'use client';

import React from 'react';

import {Icon} from '@/components/commons';
import {Input} from '@/components/ui/input';

interface CommentInputProps {
    onSubmit?: (commentText: string) => void;
    placeholder?: string;
    variant?: 'default' | 'with-icon';
}

const CommentInput: React.FC<CommentInputProps> = ({
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
                <button type='button' className='absolute right-3 top-1/2 -translate-y-1/2'>
                    <Icon name='emojiHappy' width={24} height={24} />
                    <span className='sr-only'>Add emoji</span>
                </button>
            )}
        </form>
    );
};

export default CommentInput;
