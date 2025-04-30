import Image from 'next/image';
import {ReactNode} from 'react';

import {cn} from '@/lib/utils';

interface Props {
    width?: number;
    text?: string;
    src?: string;
    className?: string;
    children?: ReactNode;
}

export const EmptyState: React.FC<Props> = ({
    width = 200,
    text,
    src = '/assets/images/empty-state/no-image.svg',
    className,
    children,
}) => {
    return (
        <div className={cn('h-full w-full flex-col items-center justify-center gap-2 flex-center', className)}>
            <Image src={src} alt='Empty State' className='aspect-square' width={width} height={width} />
            {text && <p className='text-slate-600'>{text}</p>}
            {children}
        </div>
    );
};
