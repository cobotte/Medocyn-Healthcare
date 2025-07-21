import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  distDir: 'out',
  images: {
    unoptimized: true
  },
  // Ensure the basePath matches the repository name on GitHub Pages
  basePath: process.env.NODE_ENV === 'production' ? '/Medocyn-Healthcare' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/Medocyn-Healthcare/' : ''
};

export default nextConfig;
