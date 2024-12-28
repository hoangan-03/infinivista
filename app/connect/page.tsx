// import React, { ReactElement } from 'react';
// import ConnectNavbar from './components/ConnectNavbar';

// // import Layout from '@/app/connect/components/Layout';

// const MainContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//     return (
//         <div id="main-content" className="w-full flex">
//             <ConnectNavbar title="Feed" />
//             {children}
//         </div>
//     );
// };

// const RightBarContent: React.FC = () => {
//     return (
//         <div id="right-bar" className="w-full flex flex-col" />
//     );
// };

// type ConnectPageWithLayout = React.FC<{ children: React.ReactNode }> & {
//     getLayout?: (page: ReactElement) => ReactElement;
// };

// const ConnectPage: ConnectPageWithLayout = ({ children }) => {
//     return (
//         <div id="connect" className="flex">
//             <MainContent>{children}</MainContent>
//             <RightBarContent />
//         </div>
//     );
// };

// // Uncomment and implement this if a custom layout is required
// // ConnectPage.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

// export default ConnectPage;
