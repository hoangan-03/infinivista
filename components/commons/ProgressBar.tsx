'use client';

import {usePathname, useSearchParams} from 'next/navigation';
import {useEffect, useState} from 'react';

import {Progress} from '@/components/ui/progress';

export const ProgressBar: React.FC = () => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [isNavigating, setIsNavigating] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        setIsNavigating(true);
        setProgress(20);

        const timer1 = setTimeout(() => setProgress(60), 100);
        const timer2 = setTimeout(() => setProgress(80), 200);

        const timer3 = setTimeout(() => {
            setProgress(100);
            const hideTimer = setTimeout(() => setIsNavigating(false), 200);
            return () => clearTimeout(hideTimer);
        }, 300);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
        };
    }, [pathname, searchParams]);

    if (!isNavigating) return null;

    return (
        <div className='fixed left-0 right-0 top-0 z-50'>
            <Progress value={progress} className='h-1 w-full bg-slate-100' />
        </div>
    );
};
