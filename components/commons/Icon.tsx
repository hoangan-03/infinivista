import React from 'react';
// import Share from '@/assets/icons/Arrow-share-forward.svg';

import Attachment from '@/assets/icons/attachment.svg';
import CaretDown from '@/assets/icons/caret-down.svg';
import Chat from '@/assets/icons/chat.svg';
import Globe from '@/assets/icons/globe.svg';
import Image from '@/assets/icons/image.svg';
import LeftRight from '@/assets/icons/left-right.svg';
import Logout from '@/assets/icons/logout.svg';
import Mail from '@/assets/icons/mail.svg';
import Mention from '@/assets/icons/mention.svg';
import More from '@/assets/icons/more.svg';
import Navigation from '@/assets/icons/navigation.svg';
import NotificationBell from '@/assets/icons/notification-bell.svg';
import SendArrow from '@/assets/icons/send-arrow.svg';
import SettingsGear from '@/assets/icons/settings-gear.svg';
import ShopCart from '@/assets/icons/shop-cart.svg';
import Smiley from '@/assets/icons/smiley.svg';
import ZoomOut from '@/assets/icons/zoom-out.svg';
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
    More,
    Attachment,
    Image,
    Mention,
    Smiley,
    CaretDown,
    SendArrow,
    Globe,
    Navigation,
    Chat,
    ShopCart,
    Mail,
    NotificationBell,
    SettingsGear,
    LeftRight,
    Logout,
    ZoomOut,
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