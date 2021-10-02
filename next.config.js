const { withSentryConfig } = require('@sentry/nextjs');
const path = require('path');

const moduleExports = {
  // https://nextjs.org/docs/api-reference/next.config.js/headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=1, stale-while-revalidate=59',
          },
        ],
      },
    ];
  },

  // https://nextjs.org/docs/basic-features/image-optimization#domains
  images: {
    domains: ['datocms-assets.com', 'pbs.twimg.com'],
  },

  // https://nextjs.org/docs/api-reference/next.config.js/react-strict-mode
  reactStrictMode: true,

  // https://nextjs.org/docs/api-reference/next.config.js/custom-webpack-config
  /** @param {import("webpack").Configuration} config */
  webpack(config, { defaultLoaders }) {
    // https://github.com/belgattitude/nextjs-monorepo-example/blob/16eceafc9300a268436f007bf0ec2a40953751f9/apps/web-app/next.config.js#L22-L39
    // https://github.com/vercel/next.js/pull/13542
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

const SentryWebpackPluginOptions = {
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
  silent: true,
};

module.exports = withSentryConfig(moduleExports, SentryWebpackPluginOptions);
