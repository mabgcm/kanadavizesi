import type { NextConfig } from 'next';
import { withBotId } from 'botid/next/config';

const nextConfig: NextConfig = {
  // Vercel Domains owns apex -> www redirects. Do not add the reverse
  // redirect here: it creates a production-only redirect loop.
  async redirects() {
    return [{
      source: '/kanadada-yasam/ilk-90-gun',
      destination: '/kanadada-yasam/kanadada-yasam-ve-ilk-90-gun',
      permanent: true,
    }];
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
    ];
  },
  turbopack: {
    root: process.cwd(),
  },
};

export default withBotId(nextConfig);
