/** @type {import('next').NextConfig} */
require("dotenv").config({
  path: `.env`,
});

const nextConfig = {
  images: {
    domains: ["localhost", "clemory.io"],
  },
  env: {
    MIXPANEL_TOKEN: process.env.MIXPANEL_TOKEN,
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
    FIREBASE_MEASUREMENT_ID: process.env.FIREBASE_MEASUREMENT_ID,
  },
};

module.exports = nextConfig;
