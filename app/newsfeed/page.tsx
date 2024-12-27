import React, {ReactElement} from 'react';

// import Layout from '@/app/newsfeed/components/Layout';

const MainContent: React.FC = () => {
    return (
        <div id='main-content' className='flex' />
    );
};

const RightBarContent: React.FC = () => {
    return (
        <div id='right-bar' className='flex flex-col' />
    );
};

type NewsfeedPageWithLayout = React.FC & {
    getLayout?: (page: ReactElement) => ReactElement;
};

const NewsfeedPage: NewsfeedPageWithLayout = () => {
    return (
        <div id='newsfeed' className='flex bg-black'>
            hello
            <MainContent />
            <RightBarContent />
        </div>
    );
};

// NewsfeedPage.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default NewsfeedPage;
