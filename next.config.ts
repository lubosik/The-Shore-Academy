import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.pexels.com' },
      { protocol: 'https', hostname: '**.railway.app' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
    ],
  },
  async redirects() {
    return [
      {
        source: '/how-to-escape-a-rip-current.html',
        destination: '/academy-resources/how-to-escape-a-rip-current',
        permanent: true,
      },
      {
        source: '/beach-flag-colors-florida.html',
        destination: '/academy-resources/beach-flag-colors-florida',
        permanent: true,
      },
      {
        source: '/is-my-child-ready-for-ocean-swimming.html',
        destination: '/academy-resources/is-my-child-ready-for-ocean-swimming',
        permanent: true,
      },
      {
        source: '/ocean-safety-school-west-palm-beach.html',
        destination: '/locations/west-palm-beach',
        permanent: true,
      },
      {
        source: '/ocean-safety-school-boca-raton.html',
        destination: '/locations/boca-raton',
        permanent: true,
      },
      {
        source: '/ocean-safety-school-delray-beach.html',
        destination: '/locations/delray-beach',
        permanent: true,
      },
      {
        source: '/ocean-safety-school-miami.html',
        destination: '/locations/miami',
        permanent: true,
      },
      {
        source: '/ocean-safety-school-fort-lauderdale.html',
        destination: '/locations/fort-lauderdale',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
