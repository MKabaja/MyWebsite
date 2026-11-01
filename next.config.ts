import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
	output: 'standalone',
	reactCompiler: true,
	allowedDevOrigins: ['192.168.*.*'],
};

export default withNextIntl(nextConfig);
