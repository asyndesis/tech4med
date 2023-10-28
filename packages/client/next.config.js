/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    CLIENT_APOLLO_URL: process.env.CLIENT_APOLLO_URL,
  },
};

module.exports = nextConfig;
