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
    outputFileTracingIncludes: [
     './posts/assets/**/*'
    ],
    pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
    webpack: (config) => {
        config.module.rules.push({
            test: /\.md$/,
            use: 'raw-loader',
        });
        return config;
    },
};

module.exports = nextConfig;