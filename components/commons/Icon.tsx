import React from 'react';

import Search from '@/assets/icons/search.svg';
import {cn} from '@/lib/utils';

const Icons = {
    Search,
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
