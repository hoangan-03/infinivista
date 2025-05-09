'use client';

import React, {useState} from 'react';

import {ModalNewPost} from '@/app/(main)/_components';
import {Icon} from '@/components/commons';
import {Button, ScrollArea} from '@/components/ui';
import {useGetProfileInfo} from '@/hooks';
import {capitalize, cn} from '@/lib/utils';
import {IProfile} from '@/modules/profile/profile.interface';

import {Groups} from './Groups';
import {Pages} from './Pages';
import {Posts} from './Posts';

enum SECTION_TYPE {
    POSTS = 'posts',
    PAGES = 'pages',
    GROUPS = 'groups',
}

const sections = Object.values(SECTION_TYPE);

interface MainSectionProps {
    profile?: IProfile;
    className?: string;
}

export const MainSection: React.FC<MainSectionProps> = ({profile, className}) => {
    const [currentSection, setCurrentSection] = useState<SECTION_TYPE>(SECTION_TYPE.POSTS);
    const [showModalNewPost, setShowModalNewPost] = useState<boolean>(false);

    const {userId: currentUserId} = useGetProfileInfo();

    return (
        <div className={cn('space-y-4', className)}>
            <div className='flex flex-row gap-3'>
                {sections.map((section) => (
                    <Button
                        key={section}
                        variant={currentSection === section ? 'default' : 'secondary'}
                        className='w-[120px]'
                        onClick={() => {
                            if (currentSection === section) return;
                            setCurrentSection(section);
                        }}
                    >
                        {capitalize(section)}
                    </Button>
                ))}
                {/* <Button variant='secondary' className='w-[120px]'>
                    Photos
                </Button>
                <Button variant='secondary' className='w-[120px]'>
                    Videos
                </Button> */}
                {/* <Button
                    size='default'
                    className='w-[120px] bg-white text-slate-900 shadow-md flex-center hover:shadow-lg'
                >
                    More
                    <ArrowRightIcon className='h-4 w-4' />
                </Button> */}
            </div>
            <div className='rounded-3xl bg-white pt-7 shadow-sm'>
                <div className='flex items-center justify-between pr-5'>
                    <div className='w-52 border-b border-blue-600 pb-4'>
                        <h2 className='ml-9 text-[28px] font-bold text-blue-600'>{capitalize(currentSection)}</h2>
                    </div>
                    {profile?.id === currentUserId && currentSection === SECTION_TYPE.POSTS && (
                        <div className='flex gap-3'>
                            <Button
                                variant='raw'
                                size='raw'
                                className='inline-flex w-fit items-center justify-center gap-2 rounded-[12px] border border-black px-5 py-[6px] font-bold hover:bg-slate-100'
                                onClick={() => setShowModalNewPost(true)}
                            >
                                <Icon name='upload' />
                                Post
                            </Button>
                            {/* <Button
                                variant='raw'
                                size='raw'
                                className='inline-flex items-center justify-center gap-2 rounded-[12px] border border-black px-5 py-[6px] font-bold hover:bg-slate-100'
                            >
                                <Icon name='settings-burger' />
                                Filter
                            </Button>
                            <Button
                                variant='raw'
                                size='raw'
                                className='inline-flex items-center justify-center gap-2 rounded-[12px] border border-black px-5 py-[6px] font-bold hover:bg-slate-100'
                            >
                                <Icon name='settings-gear' />
                                Manage Posts
                            </Button> */}
                        </div>
                    )}
                </div>
                <ScrollArea className='h-[650px]'>
                    {currentSection === SECTION_TYPE.POSTS ? (
                        <Posts profile={profile} />
                    ) : currentSection === SECTION_TYPE.PAGES ? (
                        <Pages />
                    ) : (
                        <Groups />
                    )}
                </ScrollArea>
            </div>
            {profile?.id === currentUserId && (
                <ModalNewPost
                    open={showModalNewPost}
                    onClose={() => setShowModalNewPost(false)}
                    data={profile || undefined}
                />
            )}
        </div>
    );
};
