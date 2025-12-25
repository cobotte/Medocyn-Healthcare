import type { NextConfig } from 'next';

const isGitHubPages = process.env.GITHUB_ACTIONS === 'true';
const repositoryBasePath = '/Medocyn-Healthcare';
const siteUrl = isGitHubPages
  ? `https://cobotte.github.io${repositoryBasePath}`
  : 'https://medocynhealthcare.com';

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: isGitHubPages ? repositoryBasePath : '',
  assetPrefix: isGitHubPages ? repositoryBasePath : '',
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: isGitHubPages ? repositoryBasePath : '',
    NEXT_PUBLIC_SITE_URL: siteUrl,
  },
};

export default nextConfig;
