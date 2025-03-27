'use client';

import React from 'react';

import {Icon} from '@/components/commons';
import {cn} from '@/lib/utils';
import currentUser from '@/mock_data/self';

type ReactionType = 'like' | 'love' | 'sad';

interface ReactButtonProps {
    reactionList: {id: number; type: ReactionType; count: number; people: Array<{username: string}>}[];
    handleClickReact: (event: React.MouseEvent<HTMLButtonElement>, reactionType: ReactionType) => void;
    className?: string;
}

const ReactButton: React.FC<ReactButtonProps> = ({reactionList, handleClickReact, className}) => {
    const liked = reactionList.some((reaction) =>
        reaction.people.some((person) => person.username === currentUser.username)
    );

    return (
        <button onClick={(event) => handleClickReact(event, 'like')}>
            <Icon name={liked ? 'FilledLike' : 'Like'} width={24} height={24} className={cn(className)} />
        </button>
    );
};

export default ReactButton;
