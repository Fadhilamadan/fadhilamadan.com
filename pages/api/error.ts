import { withSentry } from '@sentry/nextjs';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  throw new Error('API throw error test');
  res.status(200).json({ name: 'Fadhil Amadan' });
};

export default withSentry(handler);
