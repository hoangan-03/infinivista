import React from 'react';

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
import Plus from '@/assets/icons/plus.svg';
import Search from '@/assets/icons/search.svg';
import SendArrow from '@/assets/icons/send-arrow.svg';
import SettingsGear from '@/assets/icons/settings-gear.svg';
import ShopCart from '@/assets/icons/shop-cart.svg';
import Smiley from '@/assets/icons/smiley.svg';
import ZoomOut from '@/assets/icons/zoom-out.svg';
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
    Plus,
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
};

interface IconProps {
    width?: number;
    height?: number;
    name: keyof typeof Icons;
    className?: string;
}

const Icon: React.FC<IconProps> = ({width = 20, height = 20, name, className}) => {
    const IconComponent = Icons[name];
    return <IconComponent width={width} height={height} className={cn(className)} />;
};

export default Icon;
