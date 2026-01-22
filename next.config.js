/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        pathname: '/t/p/**',
      },
      {
        protocol: 'https',
        hostname: 'www.themoviedb.org',
        pathname: '/t/p/**',
      },
    ],
    // Cache images for 1 year
    formats: ['image/avif', 'image/webp'],
  },

  // Enable SWR (Stale-While-Revalidate)
  experimental: {
    isrMemoryCacheSize: 52 * 1024 * 1024, // 52MB
  },

  // Optimize for production
  compress: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  
  // Support for Netlify deployment
  swcMinify: true,
  
  // ISR configuration
  onDemandEntries: {
    maxInactiveAge: 60 * 60 * 1000,
    pagesBufferLength: 5,
  },
  
  // Ensure proper headers for server-side rendering
  headers: async () => {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
