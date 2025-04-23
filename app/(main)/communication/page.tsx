import Image from 'next/image';

import {Icon} from '@/components/commons';
import {
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    ScrollArea,
    Separator,
} from '@/components/ui';
import {cn} from '@/lib/utils';
import {messages} from '@/mock_data/message';
import {profile} from '@/mock_data/profile';
import placeholderImage from '@/public/assets/images/placeholder.png';

import {GroupsSection, MessageItem, UsersSection} from './_components';

export interface IUserItem {
    name: string;
    message: string;
    lastActive: number;
}

export interface IGroupItem {
    name: string;
    tags: string[];
    lastActive: number;
    className?: string;
}

const userItems: IUserItem[] = [
    {
        name: 'Khuong',
        message: 'Hi there, nice to meet you',
        lastActive: 12,
    },
    {
        name: 'Dat',
        message: 'Hello Khuong! How are you?',
        lastActive: 5,
    },
    {
        name: 'An',
        message: 'Hi everyone, we will be discussing the upcoming Capstone Project.',
        lastActive: 2,
    },
    {
        name: 'Kevin',
        message: 'Hi long time no see',
        lastActive: 30,
    },
];

const groupItems: IGroupItem[] = [
    {
        name: 'Capstone Project Team',
        tags: ['Backend', 'Frontend', 'Mobile', 'AI Research', 'Marketing', 'Design', 'Project Management'],
        lastActive: 12,
    },
    {
        name: 'Web Development Team',
        tags: ['Frontend'],
        lastActive: 5,
    },
    {
        name: 'Mobile Development Team',
        tags: ['Mobile'],
        lastActive: 2,
    },
    {
        name: 'Marketing Team',
        tags: ['Marketing'],
        lastActive: 30,
    },
    {
        name: 'Marketing Team',
        tags: ['Marketing'],
        lastActive: 30,
    },
    {
        name: 'Marketing Team',
        tags: ['Marketing'],
        lastActive: 30,
    },
    {
        name: 'Marketing Team',
        tags: ['Marketing'],
        lastActive: 30,
    },
];

export default function CommunicationPage() {
    return (
        <div className='flex gap-10'>
            <div className='w-[70%]'>
                <div className='mb-2 flex items-center justify-between'>
                    <div className='flex'>
                        <Image
                            src={placeholderImage}
                            alt='User Avatar'
                            width={40}
                            height={40}
                            className='rounded-full bg-transparent'
                        />
                        <Image
                            src={placeholderImage}
                            alt='User Avatar'
                            width={40}
                            height={40}
                            className='-translate-x-4 transform rounded-full bg-none'
                        />
                        <Image
                            src={placeholderImage}
                            alt='User Avatar'
                            width={40}
                            height={40}
                            className='-translate-x-8 transform rounded-full bg-none'
                        />
                    </div>
                    <div>
                        <p className='text-paragraph2'>Capstone Project Team</p>
                        <p className='text-caption text-gray-500'>last seen 12 minutes ago</p>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild className='outline-none ring-0 focus-visible:ring-0'>
                            <Button variant='raw' size='icon'>
                                <Icon name='more' width={15} height={15} />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent alignOffset={16}>
                            <DropdownMenuItem>Settings</DropdownMenuItem>
                            <DropdownMenuItem>Invite Member</DropdownMenuItem>
                            <DropdownMenuItem>Leave Group</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div className='shadow-custom-1 relative flex h-[89vh] flex-col gap-2 rounded-b-xl bg-white p-4'>
                    <ScrollArea className='h-[90%] pr-4'>
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={cn(
                                    'my-4 flex',
                                    message.username === profile.username ? 'justify-end' : 'justify-start'
                                )}
                            >
                                <MessageItem
                                    data={message}
                                    isCurrentUser={message.username === profile.username}
                                    showAvatar={message.username !== messages[index - 1]?.username}
                                    className='w-4/5'
                                />
                            </div>
                        ))}
                    </ScrollArea>
                    <div className='flex h-[10%] items-center gap-2 rounded-xl bg-primary px-5 py-3'>
                        <div className='flex gap-2'>
                            <div className='relative h-6 w-6'>
                                <Button variant='raw' size='icon'>
                                    <Icon name='image' className='absolute inset-0 h-full w-full text-white' />
                                </Button>
                            </div>
                            <Button variant='raw' size='icon'>
                                <Icon name='attachment' className='text-white' />
                            </Button>
                            <Button variant='raw' size='icon'>
                                <Icon name='smile' className='text-white' />
                            </Button>
                            <Button variant='raw' size='icon'>
                                <Icon name='mention' className='text-white' />
                            </Button>
                        </div>
                        <div className='flex h-5 flex-grow items-center gap-2'>
                            <Separator className='h-full bg-white' orientation='vertical' />
                            <input
                                type='text'
                                className='w-full rounded-sm border border-white bg-primary py-1 pl-2 text-white placeholder:text-white focus:outline-1 focus:outline-white'
                                placeholder='Start typing...'
                            />
                            <Button
                                variant='secondary'
                                className='aspect-square h-10 w-10 rounded-sm bg-white p-1 flex-center'
                            >
                                <Icon name='arrow-send' width={20} height={20} />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <ScrollArea className='h-[calc(100vh-32px)] w-[30%]'>
                <div className='space-y-4 pr-2'>
                    <UsersSection data={userItems} />
                    <GroupsSection data={groupItems} />
                </div>
            </ScrollArea>
        </div>
    );
}
