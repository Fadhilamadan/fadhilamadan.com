import client from '~/lib/cms-client';
import { getSdk } from '~generated/graphql';

export default function cms() {
  return getSdk(client);
}
