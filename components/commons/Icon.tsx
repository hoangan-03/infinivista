import React from 'react';

import Search from '@/public/assets/icons/search.svg';
import Plus from '@/public/assets/icons/icon-plus.svg';
import Like from '@/public/assets/icons/heart-3.svg';
import FilledLike from '@/public/assets/icons/heart-3-filled.svg';
import Comment from '@/public/assets/icons/chat_bubble.svg';
import Repost from '@/public/assets/icons/Direct Right.svg';
// import Share from '@/assets/icons/Arrow-share-forward.svg';
import { RiShareForwardLine as Share } from "react-icons/ri";
import Save from '@/public/assets/icons/Save Archive.svg';
import { Ellipsis } from 'lucide-react';

import emoji_Happy from '@/public/assets/icons/emoji/Emoji Happy.svg'

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
    Ellipsis,

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
