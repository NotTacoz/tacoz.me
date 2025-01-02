/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    basePath: process.env.NODE_ENV === 'production' ? '/tacoz.me' : '',
    images: {
        unoptimized: true,
        remotePatterns: [
          {
              protocol: 'https',
              hostname: '**',
          },
        ],
    },
    trailingSlash: true,
    assetPrefix: process.env.NODE_ENV === 'production' ? '/tacoz.me' : '',
    experimental: {
        outputFileTracingIncludes: {
          '/posts/assets/**/*': true,
        },
    },
};

module.exports = nextConfig;