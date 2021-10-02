import * as Sentry from '@sentry/nextjs';

Sentry.init({
  debug: true,
  tracesSampleRate: 1.0,
  dsn: process.env.SENTRY_DSN,
  environment: process.env.IS_PREVIEW ? 'preview' : process.env.NODE_ENV,
});
