'use client';

import React from 'react';

import {Icon} from '@/components/commons';
import {Button, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from '@/components/ui';
import {REACTION_TYPE} from '@/mock_data/post';

interface ReactButtonProps {
    width?: number;
    height?: number;
    onReact: (reaction: REACTION_TYPE) => void;
}

export const ReactionButton: React.FC<ReactButtonProps> = ({width = 24, height = 24}) => {
    return (
        <TooltipProvider delayDuration={150}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant='icon' size='icon'>
                        <Icon name='heart' width={width} height={height} className='block group-hover:hidden' />
                        <Icon
                            name='heart-filled'
                            width={width}
                            height={height}
                            className='hidden text-primary/80 group-hover:block'
                        />
                    </Button>
                </TooltipTrigger>
                {/* TODO: List out all reaction icons */}
                <TooltipContent>Hello</TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};
