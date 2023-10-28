/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    CLIENT_APOLLO_SERVER_URL: process.env.CLIENT_APOLLO_SERVER_URL,
    CLIENT_APOLLO_PORT: process.env.CLIENT_APOLLO_PORT,
  },
};

module.exports = nextConfig;
