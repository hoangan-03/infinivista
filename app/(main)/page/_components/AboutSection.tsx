import React from 'react';

import {ScrollArea} from '@/components/ui';
import {IPage} from '@/modules/page/page.interface';

interface Props {
    page?: IPage;
}

export const AboutSection: React.FC<Props> = ({page}) => {
    return (
        <div className='flex gap-8 rounded-lg bg-white py-6 pr-6 shadow-sm'>
            <div className='w-52 self-start border-b border-blue-600 pb-3'>
                <h2 className='ml-6 text-[28px] font-bold text-blue-600'>About</h2>
            </div>
            <ScrollArea className='max-h-[200px] w-[calc(100%-208px)] flex-grow'>
                <p className='text-justify text-gray-700'>{page?.description}</p>
            </ScrollArea>
        </div>
    );
};
