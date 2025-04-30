import Link from 'next/link';
import {ReactNode} from 'react';

import {Icon} from '@/components/commons';
import {Button, ScrollArea, Separator} from '@/components/ui';
import {ROUTES} from '@/routes/routes.enum';

interface Props {
    children: ReactNode;
}

type LinkInfo = {
    label: string;
    href: string;
    icon: ReactNode;
};

function SettingsLayout({children}: Props) {
    const links: LinkInfo[] = [
        // {
        //     label: 'Profile',
        //     href: ROUTES.SETTINGS_PROFILE,
        //     icon: <Icon name='user' />,
        // },
        {
            label: 'Privacy',
            href: ROUTES.SETTINGS_PRIVACY,
            icon: <Icon name='shield-check' />,
        },
        {
            label: 'Language',
            href: ROUTES.SETTINGS_LANGUAGE,
            icon: <Icon name='language' />,
        },
    ];

    return (
        <div className='flex'>
            <ScrollArea className='h-screen w-[330px] border-r border-gray-300'>
                <div className='space-y-6'>
                    <div className='mx-6 mt-6 space-y-1'>
                        <h5 className='font-extrabold text-blue-700'>Settings</h5>
                        <Separator className='bg-gray-300' />
                    </div>
                    <nav className='px-4'>
                        <ul className='space-y-2'>
                            {links.map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href}>
                                        <Button
                                            variant='raw'
                                            size='raw'
                                            className='inline-flex w-full items-center justify-start gap-2 whitespace-nowrap rounded-md p-4 hover:bg-gray-100'
                                        >
                                            {link.icon}
                                            {link.label}
                                        </Button>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </ScrollArea>
            <div className='w-0 flex-grow'>{children}</div>
        </div>
    );
}

export default SettingsLayout;
