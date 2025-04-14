import pwa from 'next-pwa'

const withPwa = pwa({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development', // 开发环境禁用 PWA
});
const url = process.env.NEXT_PUBLIC_API_URL

const nextConfig = withPwa({
  /* config options here */
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: `${url}/:path*`,
      },
    ];
  },
});

export default nextConfig;
