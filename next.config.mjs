/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  eslint: {
    dirs: ['app'], // Only run ESLint on the 'pages' and 'utils' directories during production builds (next build)
  },
  images: {
    domains: ["avatars.githubusercontent.com", "lh3.googleusercontent.com", "picsum.photos"]
  }
};

export default nextConfig;
