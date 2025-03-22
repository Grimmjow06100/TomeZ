/** @type {import('next').NextConfig} */
import dotenv from 'dotenv';
dotenv.config();
const nextConfig = {
    images: {
      domains: [process.env.HOSTNAME],
        remotePatterns: [
          {
            protocol: process.env.PROTOCOL,
            hostname: process.env.HOSTNAME,
            port: process.env.PORT,
            pathname: process.env.PATHNAME,
          },
        ],
      },
};

export default nextConfig;
