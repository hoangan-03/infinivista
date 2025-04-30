/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        });

        return config;
    },
    async redirects() {
        return [
            {
                source: '/connect',
                destination: '/connect/feed',
                permanent: true,
            },
            {
                source: '/settings',
                destination: '/settings/privacy',
                permanent: true,
            },
        ];
    },
    images: {
        remotePatterns: [
            // {
            //     protocol: 'https',
            //     hostname: 'res.cloudinary.com',
            //     // pathname: '/res.cloudinary.com/**'
            // },
            // {
            //     protocol: 'https',
            //     hostname: 'drive.usercontent.google.com',
            //     pathname: '/**',
            // },
            // {
            //     protocol: 'https',
            //     hostname: 'cdn.jsdelivr.net',
            //     pathname: '/gh/faker-js/**',
            // },
            // {
            //     protocol: 'https',
            //     hostname: 'picsum.photos',
            // },
            {
                protocol: 'https',
                hostname: '**',
            },
            {
                protocol: 'http',
                hostname: '**',
            },
        ],
    },
};

export default nextConfig;
