import * as React from 'react';

import { Link, Text } from '@chakra-ui/react';
import {
  NormalComponents,
  SpecialComponents,
} from 'react-markdown/src/ast-to-react';

type Components = Partial<NormalComponents & SpecialComponents>;

export const baseComponents: Components = {
  a({ node, ...rest }) {
    const href = rest.href as string;
    return <Link isExternal={!href.startsWith('#')} variant="link" {...rest} />;
  },

  p({ node, ...rest }) {
    return <Text as="div" {...rest} />;
  },
};
