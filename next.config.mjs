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
            // Basic redirect
            {
                source: '/connect',
                destination: '/connect/for-you',
                permanent: true,
            },
        ]
    },
};

export default nextConfig;
