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
                destination: '/connect/for-you',
                permanent: true,
            },
            {
                source: '/connect/feed',
                destination: '/connect/feed/for-you',
                permanent: true,
            },
            {
                source: '/connect/story',
                destination: '/connect/story/for-you',
                permanent: true,
            },
        ]
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                // pathname: '/res.cloudinary.com/**'
            }
        ],
    }
};

export default nextConfig;
