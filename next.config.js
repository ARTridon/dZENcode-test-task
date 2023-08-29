const { NEXT_PUBLIC_API_URL } = process.env;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [NEXT_PUBLIC_API_URL,'127.0.0.1'],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/orders',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
