import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Teljes felbontású képek engedélyezése optimalizálás nélkül
    unoptimized: false,
    // Maximális képméret növelése
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Teljes minőség az optimalizáláshoz
    minimumCacheTTL: 31536000,
    formats: ['image/webp'],
    // Helyi upload mappák engedélyezése
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '**',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: '**',
        pathname: '/uploads/**',
      },
    ],
  },
};

export default nextConfig;
