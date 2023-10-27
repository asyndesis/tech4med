/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    APOLLO_SERVER_URL: process.env.APOLLO_SERVER_URL,
    APOLLO_PORT: process.env.APOLLO_PORT,
  },
};

module.exports = nextConfig;
