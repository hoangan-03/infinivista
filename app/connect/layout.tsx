import ConnectNavbar from './components/ConnectNavbar';

const MainContent: React.FC<{children: React.ReactNode}> = ({children}) => {
    return (
        <div id='main-content' className='min-w-[27rem] flex flex-col flex-2'>
            <ConnectNavbar title='Feed' />
            {children}
        </div>
    );
};

const RightBarContent: React.FC = () => {
    return (
        <div id='right-bar' className='flex flex-col flex-1'>
            Right bar
        </div>
    );
};

type ConnectPageWithLayout = React.FC<{children: React.ReactNode}> & {
    getLayout?: (page: React.ReactElement) => React.ReactElement;
};

const ConnectPage: ConnectPageWithLayout = ({children}) => {
    return (
        <div id='connect' className='flex gap-10'>
            <MainContent>{children}</MainContent>
            <RightBarContent />
        </div>
    );
};

export default function ConnectLayout({children}: {children: React.ReactNode}) {
    return (
        <div className='bg-gray-50'>
            <div className='container'>
                <div className='flex min-h-screen bg-gray-700'>
                    <aside className='w-[250px]'>Sidebar</aside>
                    <main className='w-[calc(100%-250px)] bg-white px-10 py-8'>
                        <ConnectPage children={children} />
                    </main>
                </div>
            </div>
        </div>
    );
}
