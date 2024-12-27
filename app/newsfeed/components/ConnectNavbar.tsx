import React from 'react';

const defaultTabList = [
    {
        label: 'Tab 1',
        href: '#',
        disabled: false,
    },
    {
        label: 'Tab 2',
        href: '#',
        disabled: true,
    },
    {
        label: 'Tab 3',
        href: '#',
        disabled: true,
    },
    {
        label: 'Tab 4',
        href: '#',
        disabled: true,
    }
];

interface ConnectNavbarProps {
    title: string;
    tabList: { label: string; href: string; disabled: boolean }[];
}

const ConnectNavbar: React.FC<ConnectNavbarProps> = ({title, tabList = defaultTabList}) => {
  return (
    <div className='flex justify-between'>
        <h4>{title}</h4>
        <div className='flex gap-4' />
    </div>
  );
};

export default ConnectNavbar;