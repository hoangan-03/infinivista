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
                source: '/settings',
                destination: '/settings/profile',
                permanent: true,
            },
        ];
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                // pathname: '/res.cloudinary.com/**'
            },
        ],
    },
};

export default nextConfig;
