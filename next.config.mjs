/** @type @type {import('next').NextConfig} */

  const nextConfig = {
     images: {
        remotePatterns:[new URL('http://localhost:8080/mangas/**')],
        unoptimized: true,

      }

  };

export default nextConfig;
