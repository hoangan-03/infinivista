import {IStory} from '@/mock_data/story';

import {StoryCard} from '.';

// THERE WILL BE 7 PATTERNS
// 1. 2 small items (1x1) + 2 small items (1x1) + 1 large item (2x1) --> 5 items
// 2. 1 large item (2x1) + 2 small items (1x1) + 2 small items (1x1) --> 5 items
// 3. 1 large item (2x1) + 2 small items (1x1) + 1 large item (2x1) --> 4 items
// 4. 1 large item (2x2) + 2 small items (1x1) --> 3 items
// 5. 2 small items (1x1) + 1 large item (2x2) --> 3 items
// 6. 1 large item (2x2) + 1 large item (2x1) --> 2 items
// 7. 1 very large item (3x2) --> 1 item

interface Props {
    pattern: 1 | 2 | 3 | 4 | 5 | 6 | 7;
    data?: IStory[];
    onClickCard: (story?: IStory) => void;
}

export const requiredItemsPerRow: Record<number, number> = {
    1: 5,
    2: 5,
    3: 4,
    4: 3,
    5: 3,
    6: 2,
    7: 1,
};

function StoryRow({pattern, data, onClickCard}: Props) {
    const requiredItems = requiredItemsPerRow[pattern] || 0;

    if (!(data && data.length >= requiredItems)) {
        console.error(`Not enough data items for pattern ${pattern}. Expected ${requiredItems}, got ${data?.length}.`);
        return null; // or handle the error as needed
    }

    switch (pattern) {
        case 1:
            return (
                <>
                    <StoryCard onClick={() => onClickCard(data?.[0])} width={1} height={1} data={data?.[0]} />
                    <StoryCard onClick={() => onClickCard(data?.[1])} width={1} height={1} data={data?.[1]} />
                    <StoryCard onClick={() => onClickCard(data?.[2])} width={1} height={2} data={data?.[2]} />
                    <StoryCard onClick={() => onClickCard(data?.[3])} width={1} height={1} data={data?.[3]} />
                    <StoryCard onClick={() => onClickCard(data?.[4])} width={1} height={1} data={data?.[4]} />
                </>
            );
        case 2:
            return (
                <>
                    <StoryCard onClick={() => onClickCard(data?.[0])} width={1} height={2} data={data?.[0]} />
                    <StoryCard onClick={() => onClickCard(data?.[1])} width={1} height={1} data={data?.[1]} />
                    <StoryCard onClick={() => onClickCard(data?.[2])} width={1} height={1} data={data?.[2]} />
                    <StoryCard onClick={() => onClickCard(data?.[3])} width={1} height={1} data={data?.[3]} />
                    <StoryCard onClick={() => onClickCard(data?.[4])} width={1} height={1} data={data?.[4]} />
                </>
            );
        case 3:
            return (
                <>
                    <StoryCard onClick={() => onClickCard(data?.[0])} width={1} height={2} data={data?.[0]} />
                    <StoryCard onClick={() => onClickCard(data?.[1])} width={1} height={1} data={data?.[1]} />
                    <StoryCard onClick={() => onClickCard(data?.[2])} width={1} height={2} data={data?.[2]} />
                    <StoryCard onClick={() => onClickCard(data?.[3])} width={1} height={1} data={data?.[3]} />
                </>
            );
        case 4:
            return (
                <>
                    <StoryCard onClick={() => onClickCard(data?.[0])} width={2} height={2} data={data?.[0]} />
                    <StoryCard onClick={() => onClickCard(data?.[1])} width={1} height={1} data={data?.[1]} />
                    <StoryCard onClick={() => onClickCard(data?.[2])} width={1} height={1} data={data?.[2]} />
                </>
            );
        case 5:
            return (
                <>
                    <StoryCard onClick={() => onClickCard(data?.[0])} width={1} height={1} data={data?.[0]} />
                    <StoryCard onClick={() => onClickCard(data?.[1])} width={2} height={2} data={data?.[1]} />
                    <StoryCard onClick={() => onClickCard(data?.[2])} width={1} height={1} data={data?.[2]} />
                </>
            );
        case 6:
            return (
                <>
                    <StoryCard onClick={() => onClickCard(data?.[0])} width={2} height={2} data={data?.[0]} />
                    <StoryCard onClick={() => onClickCard(data?.[1])} width={1} height={2} data={data?.[1]} />
                </>
            );
        case 7:
            return (
                <>
                    <StoryCard onClick={() => onClickCard(data?.[0])} width={3} height={2} data={data?.[0]} />
                </>
            );
        default:
            return (
                <>
                    <StoryCard onClick={() => onClickCard(data?.[0])} width={3} height={2} data={data?.[0]} />
                </>
            );
    }
}

export default StoryRow;
