'use client';

import {useEffect, useState} from 'react';

import {Progress} from '@/components/ui/progress';

export const ProgressBar: React.FC = () => {
    const [isNavigating, setIsNavigating] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const handleNavigationStart = () => {
            setIsNavigating(true);
            setProgress(20);

            const timer1 = setTimeout(() => setProgress(60), 100);
            const timer2 = setTimeout(() => setProgress(80), 200);

            return () => {
                clearTimeout(timer1);
                clearTimeout(timer2);
            };
        };

        const handleNavigationComplete = () => {
            const progressTimer = setTimeout(() => {
                setProgress(100);
            }, 300);
            const navigatingTimer = setTimeout(() => {
                setIsNavigating(false);
            }, 400);

            return () => {
                clearTimeout(progressTimer);
                clearTimeout(navigatingTimer);
            };
        };

        const handleClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const link = target.closest('a');

            if (link && link.href && !link.target && link.href.startsWith(window.location.origin)) {
                handleNavigationStart();
            }
        };

        const observer = new MutationObserver(() => {
            const cleanup = handleNavigationComplete();

            return () => {
                cleanup();
            };
        });

        observer.observe(document.documentElement, {
            childList: true,
            subtree: true,
        });

        // Show progress bar when navigating to a new page
        document.addEventListener('click', handleClick);
        // Show progress bar when reloading the page
        window.addEventListener('beforeunload', handleNavigationStart);

        return () => {
            document.removeEventListener('click', handleClick);
            window.removeEventListener('beforeunload', handleNavigationStart);
            observer.disconnect();
        };
    }, []);

    if (!isNavigating) return null;

    return (
        <div className='fixed left-0 right-0 top-0 z-50'>
            <Progress value={progress} className='h-1 w-full bg-slate-100' />
        </div>
    );
};
