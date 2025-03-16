import React from 'react';
// import Share from '@/public/assets/icons/Arrow-share-forward.svg';

import Attachment from '@/public/assets/icons/attachment.svg';
import CaretDown from '@/public/assets/icons/caret-down.svg';
import Chat from '@/public/assets/icons/chat.svg';
import Globe from '@/public/assets/icons/globe.svg';
import Image from '@/public/assets/icons/image.svg';
import LeftRight from '@/public/assets/icons/left-right.svg';
import Logout from '@/public/assets/icons/logout.svg';
import Mail from '@/public/assets/icons/mail.svg';
import Mention from '@/public/assets/icons/mention.svg';
import More from '@/public/assets/icons/more.svg';
import Navigation from '@/public/assets/icons/navigation.svg';
import NotificationBell from '@/public/assets/icons/notification-bell.svg';
import SendArrow from '@/public/assets/icons/send-arrow.svg';
import SettingsGear from '@/public/assets/icons/settings-gear.svg';
import ShopCart from '@/public/assets/icons/shop-cart.svg';
import Smiley from '@/public/assets/icons/smiley.svg';
import ZoomOut from '@/public/assets/icons/zoom-out.svg';
import Search from '@/public/assets/icons/search.svg';
import Plus from '@/public/assets/icons/icon-plus.svg';
import Like from '@/public/assets/icons/heart-3.svg';
import FilledLike from '@/public/assets/icons/heart-3-filled.svg';
import Comment from '@/public/assets/icons/chat_bubble.svg';
import Repost from '@/public/assets/icons/Direct Right.svg';
// import Share from '@/public/assets/icons/Arrow-share-forward.svg';
import {RiShareForwardLine as Share} from 'react-icons/ri';
import Save from '@/public/assets/icons/Save Archive.svg';
import {IoMdEye as EyeOpen} from 'react-icons/io';
import {IoMdEyeOff as EyeClose} from 'react-icons/io';
import {Ellipsis} from 'lucide-react';

import emoji_Happy from '@/public/assets/icons/emoji/Emoji Happy.svg';

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
    EyeOpen,
    EyeClose,
    Ellipsis,
    emoji_Happy,
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

export type {IconProps};
