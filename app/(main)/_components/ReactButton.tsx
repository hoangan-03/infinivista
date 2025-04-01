'use client';

import React from 'react';

import IconButton from '@/components/commons/IconButton';
import {cn} from '@/lib/utils';
import currentUser from '@/mock_data/self';

type ReactionType = 'like' | 'love' | 'sad';

interface ReactButtonProps {
    width?: number;
    height?: number;
    reactionList: {id: number; type: ReactionType; count: number; people: Array<{username: string}>}[];
    handleClickReact: (event: React.MouseEvent<HTMLButtonElement>, reactionType: ReactionType) => void;
    className?: string;
}

const ReactButton: React.FC<ReactButtonProps> = ({
    width = 24,
    height = 24,
    reactionList,
    handleClickReact,
    className,
}) => {
    const liked = reactionList.some((reaction) =>
        reaction.people.some((person) => person.username === currentUser.username)
    );

    return (
        <IconButton
            label='React to post'
            defaultName={liked ? 'Like_filled' : 'Like'}
            hoverName='Like_filled'
            width={width}
            height={height}
            onClick={(event) => handleClickReact(event, 'like')}
            className={cn(className)}
        />
    );
};

export default ReactButton;
