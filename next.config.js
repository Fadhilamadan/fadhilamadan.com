const path = require('path');

const csp = `
  child-src *.twitter.com;
  connect-src *;
  default-src 'self';
  font-src 'self' fonts.gstatic.com;
  img-src * blob: data:;
  media-src 'none';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' cdn.usefathom.com;
  style-src 'self' 'unsafe-inline' fonts.googleapis.com;
`;

module.exports = {
  experimental: {
    esmExternals: false, // https://github.com/vercel/next.js/issues/30330#issuecomment-952172377
    workerThreads: true,
  },

  // https://nextjs.org/docs/api-reference/next.config.js/headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // https://vercel.com/support/articles/how-to-enable-cors#enabling-cors-in-a-next.js-app
          {
            key: 'Access-Control-Allow-Credentials',
            value: 'true',
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: `X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version`,
          },

          // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=1, stale-while-revalidate=59',
          },

          // https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
          {
            key: 'Content-Security-Policy',
            value: csp.replace(/\n/g, ''),
          },

          // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy
          // Opt-out of Google FLoC: https://amifloced.org/
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },

          // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },

          // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },

          // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },

          // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },

          // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
        ],
      },
    ];
  },

  // https://nextjs.org/docs/basic-features/image-optimization#domains
  images: {
    domains: ['datocms-assets.com', 'pbs.twimg.com'],
  },

  // https://nextjs.org/docs/advanced-features/source-maps
  productionBrowserSourceMaps: true,

  // https://nextjs.org/docs/api-reference/next.config.js/react-strict-mode
  reactStrictMode: true,

  // https://nextjs.org/docs/api-reference/next.config.js/custom-webpack-config
  /** @param {import("webpack").Configuration} config */
  webpack(config, { defaultLoaders }) {
    const resolvedBaseUrl = path.resolve(config.context, '../../');
    config.module.rules = [
      ...config.module.rules,
      {
        test: /\.(tsx|ts|js|mjs|jsx)$/,
        include: [resolvedBaseUrl],
        use: defaultLoaders.babel,
        exclude: (excludePath) => {
          return /node_modules/.test(excludePath);
        },
      },
    ];
    return config;
  },
};
