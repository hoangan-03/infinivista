import '@/app/globals.css';

import React from 'react';

interface CustomAppProps {
    Component: React.ComponentType & {getLayout?: (page: React.ReactElement) => React.ReactElement};
    pageProps: object;
}

export default function CustomApp({Component, pageProps}: CustomAppProps): React.ReactElement {
    // Use the layout defined at the page level, if available
    const getLayout = Component.getLayout ?? ((page: React.ReactElement) => page);

    return getLayout(<Component {...pageProps} />);
}
