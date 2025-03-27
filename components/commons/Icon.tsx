import {Ellipsis} from 'lucide-react';
import Image, {StaticImageData} from 'next/image';
import React from 'react';
import {IoMdEye as EyeOpen} from 'react-icons/io';
import {IoMdEyeOff as EyeClose} from 'react-icons/io';
import {RiShareForwardLine as Share} from 'react-icons/ri';

import {cn} from '@/lib/utils';
import Attachment from '@/public/assets/icons/attachment.svg';
import CaretDown from '@/public/assets/icons/caret-down.svg';
import Chat from '@/public/assets/icons/chat.svg';
import Comment from '@/public/assets/icons/chat_bubble.svg';
import Repost from '@/public/assets/icons/Direct Right.svg';
import emojiHappy from '@/public/assets/icons/emoji/Emoji Happy.svg';
import Facebook from '@/public/assets/icons/facebook.png';
import Globe from '@/public/assets/icons/globe.svg';
import Like from '@/public/assets/icons/heart-3.svg';
import FilledLike from '@/public/assets/icons/heart-3-filled.svg';
import Home from '@/public/assets/icons/home.svg';
import Plus from '@/public/assets/icons/icon-plus.svg';
import Picture from '@/public/assets/icons/image.svg';
import Instagram from '@/public/assets/icons/instagram.png';
import LeftRight from '@/public/assets/icons/left-right.svg';
import LinkedIn from '@/public/assets/icons/linkedin.png';
import Locate from '@/public/assets/icons/location.svg';
import Logout from '@/public/assets/icons/logout.svg';
import Love from '@/public/assets/icons/love.svg';
import Mail from '@/public/assets/icons/mail.svg';
import Mention from '@/public/assets/icons/mention.svg';
import More from '@/public/assets/icons/more.svg';
import Navigation from '@/public/assets/icons/navigation.svg';
import NotificationBell from '@/public/assets/icons/notification-bell.svg';
import Save from '@/public/assets/icons/Save Archive.svg';
import Search from '@/public/assets/icons/search.svg';
import SendArrow from '@/public/assets/icons/send-arrow.svg';
import SettingsGear from '@/public/assets/icons/settings-gear.svg';
import ShopCart from '@/public/assets/icons/shop-cart.svg';
import Smiley from '@/public/assets/icons/smiley.svg';
import Study from '@/public/assets/icons/study.svg';
import Tiktok from '@/public/assets/icons/tiktok.png';
import UserAdd from '@/public/assets/icons/user-add.svg';
import Work from '@/public/assets/icons/work.svg';
import ZoomIn from '@/public/assets/icons/zoom-in.svg';
import ZoomOut from '@/public/assets/icons/zoom-out.svg';

const Icons = {
    Search,
    More,
    Attachment,
    Picture,
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
    ZoomIn,
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
    UserAdd,
    Work,
    Study,
    Home,
    Locate,
    Love,
    Facebook,
    Instagram,
    Tiktok,
    LinkedIn,
};

const Emojis = {
    emojiHappy,
};

interface IconProps {
    width?: number;
    height?: number;
    name: keyof typeof Icons | keyof typeof Emojis;
    className?: string;
}

const Icon: React.FC<IconProps> = ({width = 20, height = 20, name, className}) => {
    const IconComponent = name in Icons ? Icons[name as keyof typeof Icons] : Emojis[name as keyof typeof Emojis];

    // Determine if it's an image or an SVG/React component
    if (typeof IconComponent === 'object' && 'src' in IconComponent) {
        return (
            <Image
                src={(IconComponent as StaticImageData).src}
                alt={name}
                width={width}
                height={height}
                className={cn(className)}
            />
        );
    }

    // Otherwise, render the SVG or React icon
    return <IconComponent width={width} height={height} className={cn(className)} aria-label={name} />;
};

export default Icon;

export type {IconProps};
