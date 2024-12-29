import React from 'react';

import Search from '@/assets/icons/search.svg';
import Plus from '@/assets/icons/icon-plus.svg';
import Like from '@/assets/icons/heart-3.svg';
import FilledLike from '@/assets/icons/heart-3-filled.svg';
import Comment from '@/assets/icons/chat_bubble.svg';
import Repost from '@/assets/icons/Direct Right.svg';
// import Share from '@/assets/icons/Arrow-share-forward.svg';
import { RiShareForwardLine as Share } from "react-icons/ri";
import Save from '@/assets/icons/Save Archive.svg';

import emoji_Happy from '@/assets/icons/emoji/Emoji Happy.svg'

import {cn} from '@/lib/utils';

const Icons = {
    Search,
    Plus,
    Like,
    FilledLike,
    Comment,
    Repost,
    Share,
    Save,

    emoji_Happy
};

interface IconProps {
    width?: number | string;
    height?: number | string;
    name: keyof typeof Icons;
    className?: string;
}

const Icon: React.FC<IconProps> = ({width = 20, height = 20, name, className}) => {
    const IconComponent = Icons[name];
    return <IconComponent width={width} height={height} className={cn(className)} />;
};

export default Icon;
