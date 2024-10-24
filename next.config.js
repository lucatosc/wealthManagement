/** @type {import('next').NextConfig} */
// const nextConfig = {};

// module.exports = nextConfig;

module.exports = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/sign-in',
                permanent: false, // Use 'true' for permanent redirects (301)
            },
        ];
    },
};