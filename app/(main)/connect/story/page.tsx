'use client';

import {useEffect, useState} from 'react';

import {IStory, stories} from '@/mock_data/story';

import {ModalStory, requiredItemsPerRow, StoryRow} from './_components';

type RowData = {
    pattern: 1 | 2 | 3 | 4 | 5 | 6 | 7;
    data: IStory[];
};

function StoryPage() {
    const [showStoryModal, setShowStoryModal] = useState<boolean>(false);
    const [showStory, setShowStory] = useState<IStory | undefined>(undefined);
    // Use state to store rows, initially empty
    const [storyRows, setStoryRows] = useState<RowData[]>([]);

    useEffect(() => {
        const availableStories = [...stories];
        const rows: RowData[] = [];
        let currentIndex = 0;

        while (currentIndex < availableStories.length && rows.length < 10) {
            // Put this into useEffect due to inconsistencies in the random number generation of client and server
            const pattern = (Math.floor(Math.random() * 7) + 1) as 1 | 2 | 3 | 4 | 5 | 6 | 7;

            const requiredItems = requiredItemsPerRow[pattern];

            if (currentIndex + requiredItems <= availableStories.length) {
                const rowData = availableStories.slice(currentIndex, currentIndex + requiredItems);

                rows.push({
                    pattern,
                    data: rowData,
                });

                currentIndex += requiredItems;
            } else {
                continue;
            }
        }

        setStoryRows(rows);
    }, []);

    return (
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
            <ModalStory open={showStoryModal} data={showStory} onClose={() => setShowStoryModal(false)} />
        </div>
    );
}

export default StoryPage;
