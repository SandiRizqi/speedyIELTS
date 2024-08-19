/** @type {import('next').NextConfig} */
const nextConfig = {
    //output: 'export',
    reactStrictMode: false,
    images: {
        domains: ['lh3.googleusercontent.com'],
      },
      async redirects() {
        return [
          {
            source: "/",
            destination: "/dashboard",
            permanent: true,
          },
        ];
      }
};

export default nextConfig;
