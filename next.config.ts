/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    domains: [
      'img.icons8.com',
      'encrypted-tbn0.gstatic.com',
      'lh3.googleusercontent.com',   // Google profile photos
      'avatars.githubusercontent.com', // GitHub
      'secure.gravatar.com',        // Gravatar
      'gravatar.com',
      'res.cloudinary.com',
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
      // Support for Icons8
      {
        protocol: 'https',
        hostname: 'img.icons8.com',
        pathname: '/**',  // Allow all paths on icons8.com
      },

      // Support for Google images
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
        pathname: '/images**',  // Allow image paths
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**',  // Allow all paths (e.g., profile photos)
      },

      // Support for Gravatar
      {
        protocol: 'https',
        hostname: 'secure.gravatar.com',
        pathname: '/**',  // Allow all paths
      },
      {
        protocol: 'https',
        hostname: 'gravatar.com',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
