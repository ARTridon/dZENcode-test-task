/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['test-task.fra1.digitaloceanspaces.com'],
  },
  // async redirects() {
  //   return [
  //     {
  //       source: '/',
  //       destination: '/orders',
  //       permanent: true,
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
