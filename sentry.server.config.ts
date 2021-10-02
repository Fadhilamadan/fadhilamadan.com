import * as Sentry from '@sentry/nextjs';

Sentry.init({
  environment: process.env.NODE_ENV,
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
});
