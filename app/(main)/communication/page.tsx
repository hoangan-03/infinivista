import Image from 'next/image';

import {Icon} from '@/components/commons';
import {Button, ScrollArea, Separator} from '@/components/ui';
import {cn} from '@/lib/utils';
import placeholderImage from '@/public/assets/images/placeholder.png';

import {GroupCard} from './_components/GroupCard';
import {MessageArea} from './_components/MessageArea';
import {MessageUserCard} from './_components/MessageUserCard';

interface IMessage {
    username: string;
    role: string;
    message: string;
    time: Date;
    isCurrentUser: boolean;
    showAvatar: boolean;
}

interface IUserCard {
    name: string;
    message: string;
    lastActive: number;
}

interface IGroupCard {
    name: string;
    tag1: string;
    tag2?: string;
    lastActive: number;
    className?: string;
}

const messages: IMessage[] = [
    {
        username: 'Khuong',
        role: 'Backend',
        message: 'Hi there, nice to meet you',
        time: new Date(),
        isCurrentUser: true,
        showAvatar: true,
    },
    {
        username: 'Dat',
        role: 'Frontend',
        message: 'Hello Khuong! How are you?',
        time: new Date(),
        isCurrentUser: false,
        showAvatar: true,
    },
    {
        username: 'An',
        role: 'Project Manager',
        message: 'Hi everyone, we will be discussing the upcoming Capstone Project.',
        time: new Date(),
        isCurrentUser: false,
        showAvatar: true,
    },
    {
        username: 'Khuong',
        role: 'Backend',
        message: 'Sure, I have some ideas for the backend architecture.',
        time: new Date(),
        isCurrentUser: true,
        showAvatar: true,
    },
    {
        username: 'Dat',
        role: 'Frontend',
        message: 'I can work on the frontend components.',
        time: new Date(),
        isCurrentUser: false,
        showAvatar: true,
    },
    {
        username: 'An',
        role: 'Project Manager',
        message: 'Great! I am going to set up a meeting to discuss the details.',
        time: new Date(),
        isCurrentUser: false,
        showAvatar: true,
    },
    {
        username: 'Khuong',
        role: 'Backend',
        message: 'I am available tomorrow afternoon.',
        time: new Date(),
        isCurrentUser: true,
        showAvatar: true,
    },
    {
        username: 'Dat',
        role: 'Frontend',
        message: 'Tomorrow afternoon works for me too.',
        time: new Date(),
        isCurrentUser: false,
        showAvatar: true,
    },
    {
        username: 'An',
        role: 'Project Manager',
        message: 'Perfect! We will meet at 2 PM.',
        time: new Date(),
        isCurrentUser: false,
        showAvatar: true,
    },
    {
        username: 'Khuong',
        role: 'Backend',
        message: 'Looking forward to it!',
        time: new Date(),
        isCurrentUser: true,
        showAvatar: true,
    },
];

const userCards: IUserCard[] = [
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

const groupCards: IGroupCard[] = [
    {
        name: 'Capstone Project Team',
        tag1: 'Backend',
        tag2: 'Frontend',
        lastActive: 12,
    },
    {
        name: 'Web Development Team',
        tag1: 'Frontend',
        lastActive: 5,
    },
    {
        name: 'Mobile Development Team',
        tag1: 'Mobile',
        lastActive: 2,
    },
    {
        name: 'Marketing Team',
        tag1: 'Marketing',
        lastActive: 30,
    },
];

export default function Communication() {
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
                    <div>
                        <Icon name='More' width={18} height={3} />
                    </div>
                </div>
                <div className='shadow-custom-1 relative flex h-[90vh] flex-col gap-2 rounded-b-xl bg-white p-4'>
                    <ScrollArea className='h-[90%] pr-4'>
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={cn('mt-4 flex', message.isCurrentUser ? 'justify-end' : 'justify-start')}
                            >
                                <MessageArea
                                    username={message.username}
                                    role={message.role}
                                    message={message.message}
                                    time={message.time}
                                    isCurrentUser={message.isCurrentUser}
                                    showAvatar={message.showAvatar}
                                    className='w-4/5'
                                />
                            </div>
                        ))}
                    </ScrollArea>
                    <div className='flex h-[10%] items-center gap-2 rounded-xl bg-primary px-5 py-3'>
                        <div className='flex gap-2'>
                            <div className='relative h-6 w-6'>
                                <Icon name='Picture' className='absolute inset-0 h-full w-full text-white' />
                            </div>
                            <Icon name='Attachment' className='text-white' />
                            <Icon name='Smiley' className='text-white' />
                            <Icon name='Mention' className='text-white' />
                        </div>
                        <div className='flex h-5 flex-grow items-center gap-2'>
                            <Separator className='h-full bg-white' orientation='vertical' />
                            <input
                                type='text'
                                className='w-full border-none bg-primary pl-2 text-white placeholder:text-white focus:outline-1 focus:outline-white'
                                placeholder='Start typing...'
                            />
                            <Button
                                variant='secondary'
                                size='square'
                                className='h-10 w-10 rounded-sm bg-white flex-center'
                            >
                                <Icon name='SendArrow' width={20} height={20} />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-[30%]'>
                <div className='mb-10'>
                    <div className='mb-5 flex items-center gap-3'>
                        <h5 className='text-heading5 font-bold'>Messages</h5>
                        <Icon name='CaretDown' width={16} height={16} />
                        <p className='rounded-full bg-gray-200 px-2 py-1'>2</p>
                    </div>
                    <div>
                        {userCards.map((user, index) => (
                            <MessageUserCard
                                key={index}
                                name={user.name}
                                message={user.message}
                                lastActive={user.lastActive}
                                className='mb-5'
                            />
                        ))}
                    </div>
                </div>
                <div>
                    <div className='mb-5 flex items-center justify-between'>
                        <h5 className='text-heading5 font-bold'>Groups</h5>
                        <div className='flex h-8 w-8 items-center justify-center rounded-full bg-blue-100'>
                            <Icon name='More' width={18} height={4} className='rotate-90' />
                        </div>
                    </div>
                    <div>
                        {groupCards.map((group, index) => (
                            <GroupCard
                                key={index}
                                name={group.name}
                                tag1={group.tag1}
                                tag2={group.tag2}
                                lastActive={group.lastActive}
                                className='mb-2'
                            />
                        ))}
                    </div>
                </div>
            </div>
            {/* <h1 className='text-display1'>Communication</h1> */}
        </div>
    );
}
