/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')({
  disable: process.env.NODE_ENV === 'development',
  dest: 'public',
})

module.exports = withPWA({
  experimental: {
    serverActions: true,
  },
})
