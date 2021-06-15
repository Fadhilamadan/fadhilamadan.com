import * as React from 'react';

import { baseComponents } from '~components/markdown';
import { useMeta } from '~store/meta';

import {
  ButtonGroup,
  Container,
  Icon,
  IconButton,
  Stack,
} from '@chakra-ui/react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';

const Footer: React.FC = () => {
  const meta = useMeta();

  const content = `
Contents licensed under [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/).${'  '}
Made using [Next.js](https://nextjs.org), [Chakra UI](https://chakra-ui.com),
and [DatoCMS](https://www.datocms.com). Hosted on [Vercel](https://vercel.com).
Inspired from [Griko](https://griko.id).

MIT License &copy; ${new Date().getFullYear()}&ndash;present
[${meta.site.seo.siteName}](.).`;

  const { GitHub, LinkedIn, Twitter } = meta.about.socials as Record<
    string,
    string
  >;

  return (
    <Container as="footer" color="whiteAlpha.700" maxW="4xl" p={[4, 8]}>
      <Stack align="center" fontSize="xs" spacing={4} textAlign="center">
        <ReactMarkdown children={content.trim()} components={baseComponents} />
        <ButtonGroup>
          <IconButton
            aria-label="Twitter"
            as="a"
            href={Twitter}
            icon={<Icon as={FaTwitter} />}
            target="_blank"
            variant="ghost"
          />
          <IconButton
            aria-label="GitHub"
            as="a"
            href={GitHub}
            icon={<Icon as={FaGithub} />}
            target="_blank"
            variant="ghost"
          />
          <IconButton
            aria-label="LinkedIn"
            as="a"
            href={LinkedIn}
            icon={<Icon as={FaLinkedin} />}
            target="_blank"
            variant="ghost"
          />
        </ButtonGroup>
      </Stack>
    </Container>
  );
};

export default Footer;
