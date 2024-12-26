import Layout from '@/components/commons/Layout';
import React, {ReactElement} from 'react';

type NewsfeedPageWithLayout = React.FC & {
    getLayout?: (page: ReactElement) => ReactElement;
};

const NewsfeedPage: NewsfeedPageWithLayout = () => {
    return (
        <div id='newsfeed'>
            <h1>Newsfeed Page</h1>
            <p>Welcome to the Newsfeed Page!</p>
        </div>
    );
};

NewsfeedPage.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default NewsfeedPage;
