'use client';

import React from 'react';

import {Icon} from '@/components/commons';
import {Button, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from '@/components/ui';
import {REACTION_TYPE} from '@/mock_data/post';

interface ReactButtonProps {
    width?: number;
    height?: number;
    reacted?: boolean;
    onReact: (reaction: REACTION_TYPE) => void;
}

type Icon = {
    name: string;
    type: REACTION_TYPE;
};

const icons: Icon[] = Object.values(REACTION_TYPE).map((type) => ({
    name: `emote-${type}`,
    type,
}));

export const ReactionButton: React.FC<ReactButtonProps> = ({width = 24, height = 24, onReact, reacted}) => {
    return (
        <TooltipProvider delayDuration={150}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant='icon' size='icon'>
                        <Icon
                            name={!reacted ? 'heart' : 'heart-filled'}
                            width={width}
                            height={height}
                            className='block group-hover:hidden'
                        />
                        <Icon
                            name='heart-filled'
                            width={width}
                            height={height}
                            className='hidden text-primary/80 group-hover:block'
                        />
                    </Button>
                </TooltipTrigger>
                <TooltipContent className='flex h-12 items-center justify-center gap-2 bg-white' align='center'>
                    {icons.map((icon) => (
                        <Button
                            key={icon.type}
                            variant='icon'
                            size='icon'
                            onClick={() => onReact(icon.type)}
                            className='hover:animate-scale-pulse'
                        >
                            <Icon name={icon.name} width={32} height={32} />
                        </Button>
                    ))}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};
