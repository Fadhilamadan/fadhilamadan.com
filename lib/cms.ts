import { getSdk } from '~generated/graphql';
import client from '~lib/cms-client';

export default function cms() {
  return getSdk(client);
}
