'use client';

import {useEffect, useRef, useState} from 'react';

import {Spinner} from '@/components/commons';
import {useFeedContext} from '@/context';
import {useInfiniteScrolling} from '@/hooks/useInfiniteScrolling';
import {IStory} from '@/modules/story/story.interface';
import {useGetInfiniteStories} from '@/modules/story/story.swr';

import {ModalStory, requiredItemsPerRow, StoryRow} from './_components';

type RowData = {
    pattern: 1 | 2 | 3 | 4 | 5 | 6 | 7;
    data: IStory[];
};

function StoryPage() {
    const [showStoryModal, setShowStoryModal] = useState<boolean>(false);
    const [showStory, setShowStory] = useState<IStory | undefined>(undefined);

    const {newsFeed} = useFeedContext();
    const {data: stories, pagination, size, setSize, isValidating, isLoading} = useGetInfiniteStories(newsFeed?.id);
    const {loadMoreRef} = useInfiniteScrolling({
        data: stories,
        pagination,
        size,
        isValidating,
        setSize,
    });

    const [storyRows, setStoryRows] = useState<RowData[]>([]);
    const processedStoriesCount = useRef<number>(0);

    useEffect(() => {
        if (!stories || stories.length === 0) return;

        if (stories.length <= processedStoriesCount.current) return;

        const newStories = stories.slice(processedStoriesCount.current);
        let currentIndex = 0;
        const newRows: RowData[] = [];

        while (currentIndex < newStories.length) {
            const remainingStories = newStories.length - currentIndex;

            // Find all patterns that can fit with remaining stories
            const suitablePatterns: Array<1 | 2 | 3 | 4 | 5 | 6 | 7> = [];

            for (let i = 1; i <= 7; i++) {
                const patternKey = i as 1 | 2 | 3 | 4 | 5 | 6 | 7;
                if (requiredItemsPerRow[patternKey] <= remainingStories) {
                    suitablePatterns.push(patternKey);
                }
            }

            // If no suitable patterns found, break (shouldn't happen normally)
            if (suitablePatterns.length === 0) {
                break;
            }

            // Randomly select one of the suitable patterns
            const randomIndex = Math.floor(Math.random() * suitablePatterns.length);
            const selectedPattern = suitablePatterns[randomIndex];
            const requiredItems = requiredItemsPerRow[selectedPattern];

            if (currentIndex + requiredItems <= newStories.length) {
                const rowData = newStories.slice(currentIndex, currentIndex + requiredItems);

                newRows.push({
                    pattern: selectedPattern,
                    data: rowData,
                });

                currentIndex += requiredItems;
            } else {
                continue;
            }
        }

        processedStoriesCount.current = stories.length;

        setStoryRows((prev) => [...prev, ...newRows]);
    }, [stories]);

    return (
        <>
            <div className='grid auto-rows-[250px] grid-cols-3 gap-1'>
                {storyRows.map((row, index) => (
                    <StoryRow
                        onClickCard={(story) => {
                            setShowStory(story);
                            setShowStoryModal(true);
                        }}
                        key={index}
                        pattern={row.pattern}
                        data={row.data}
                    />
                ))}
            </div>
            <div ref={loadMoreRef} className='flex justify-center'>
                {isValidating && !isLoading && <Spinner width={60} height={60} />}
            </div>
            <ModalStory open={showStoryModal} story={showStory} onClose={() => setShowStoryModal(false)} />
        </>
    );
}

export default StoryPage;
