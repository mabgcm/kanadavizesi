import type { NextConfig } from 'next';
import { withBotId } from 'botid/next/config';

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
};

export default withBotId(nextConfig);
