import Image, {StaticImageData} from 'next/image';
import React from 'react';
import {AiOutlineFacebook as Facebook} from 'react-icons/ai';
import {AiOutlineInstagram as Instagram} from 'react-icons/ai';
import {AiFillLinkedin as LinkedIn} from 'react-icons/ai';
import {AiOutlineTikTok as Tiktok} from 'react-icons/ai';

import {cn} from '@/lib/utils';
import Share from '@/public/assets/icons/Arrow-share-forward.svg';
import Share_filled from '@/public/assets/icons/Arrow-share-forward-filled.svg';
import Attachment from '@/public/assets/icons/attachment.svg';
import CaretDown from '@/public/assets/icons/caret-down.svg';
import Chat from '@/public/assets/icons/chat.svg';
import Comment from '@/public/assets/icons/chat-4.svg';
import Comment_filled from '@/public/assets/icons/chat-4-filled.svg';
import emojiHappy from '@/public/assets/icons/emoji/happy.svg';
import emojiHappy_filled from '@/public/assets/icons/emoji/happy-filled.svg';
import EyeOpen from '@/public/assets/icons/eye.svg';
import EyeOpen_filled from '@/public/assets/icons/eye-filled.svg';
import EyeClose from '@/public/assets/icons/eye-off.svg';
import EyeClose_filled from '@/public/assets/icons/eye-off-filled.svg';
import Repost from '@/public/assets/icons/file-copy.svg';
import Repost_filled from '@/public/assets/icons/file-copy-filled.svg';
import Globe from '@/public/assets/icons/globe.svg';
import Like from '@/public/assets/icons/heart-3.svg';
import Like_filled from '@/public/assets/icons/heart-3-filled.svg';
import Home from '@/public/assets/icons/home.svg';
import Plus from '@/public/assets/icons/icon-plus.svg';
import Picture from '@/public/assets/icons/image.svg';
import LeftRight from '@/public/assets/icons/left-right.svg';
import Locate from '@/public/assets/icons/location.svg';
import Logout from '@/public/assets/icons/logout.svg';
import Love from '@/public/assets/icons/love.svg';
import Mail from '@/public/assets/icons/mail.svg';
import Mention from '@/public/assets/icons/mention.svg';
import More from '@/public/assets/icons/more.svg';
import Navigation from '@/public/assets/icons/navigation.svg';
import NotificationBell from '@/public/assets/icons/notification-bell.svg';
import Save from '@/public/assets/icons/save.svg';
import Save_filled from '@/public/assets/icons/save-filled.svg';
import Search from '@/public/assets/icons/search.svg';
import SendArrow from '@/public/assets/icons/send-arrow.svg';
import SettingsGear from '@/public/assets/icons/settings-gear.svg';
import ShopCart from '@/public/assets/icons/shop-cart.svg';
import Smiley from '@/public/assets/icons/smiley.svg';
import Study from '@/public/assets/icons/study.svg';
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
    Like_filled,
    Comment,
    Comment_filled,
    Repost,
    Repost_filled,
    Share,
    Share_filled,
    Save,
    Save_filled,
    EyeOpen,
    EyeOpen_filled,
    EyeClose,
    EyeClose_filled,
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
    emojiHappy_filled,
};

interface IconProps {
    width?: number;
    height?: number;
    name: keyof typeof Icons | keyof typeof Emojis;
    className?: string;
}

export const Icon: React.FC<IconProps> = ({width = 24, height = 24, name, className}) => {
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
    return (
        <IconComponent
            aria-label={name}
            width={width}
            height={height}
            style={{fontSize: `${width}px`}} // for react-icons components
            className={cn(className)}
        />
    );
};

export type {IconProps};
