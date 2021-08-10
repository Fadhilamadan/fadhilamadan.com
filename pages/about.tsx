import * as React from 'react';

import { baseComponents } from '~components/markdown';
import { AboutStaticPropsQuery } from '~generated/graphql';
import cms from '~lib/cms';
import { useMeta } from '~store/meta';
import trimHttps from '~utils/trim-https';

import {
  Box,
  Container,
  Heading,
  Link,
  List,
  ListItem,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react';
import { GetStaticProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { Image, ResponsiveImageType } from 'react-datocms';
import ReactMarkdown from 'react-markdown';

interface AboutPageProps {
  data: AboutStaticPropsQuery;
}

export const getStaticProps: GetStaticProps<AboutPageProps> = async () => {
  const data = await cms().aboutStaticProps();
  return {
    props: {
      data,
    },
  };
};

const AboutPage: NextPage<AboutPageProps> = (props) => {
  const { data } = props;

  const meta = useMeta();
  const socials = meta.about?.socials as Record<string, string>;

  const pageMeta = {
    title: 'About me',
    description: 'Get to know more about myself',
  };

  return (
    <>
      <NextSeo {...pageMeta} />

      <Container maxW="4xl" p={[4, 8]}>
        <Box pb={8}>
          <Image
            data={data.about?.image?.responsiveImage as ResponsiveImageType}
          />
        </Box>

        <Stack lineHeight="tall" pb={8} spacing={4}>
          <ReactMarkdown
            children={data.about?.preface as string}
            components={baseComponents}
          />
        </Stack>

        <SimpleGrid columns={[2, 3, 4]} gap={4}>
          {data.about?.knowledges?.map(
            (item) =>
              item && (
                <Box key={item.title}>
                  <Heading pb={4} size="md">
                    {item.title}
                  </Heading>
                  <List fontSize="sm" spacing={1}>
                    {item.entries?.split(', ').map((e, i) => (
                      <ListItem key={i}>{e.trim()}</ListItem>
                    ))}
                  </List>
                </Box>
              ),
          )}
        </SimpleGrid>

        <Box color="whiteAlpha.400" py={8}>
          · · ·
        </Box>

        <Text pb={2}>
          You can reach out via email at{' '}
          <Link href={`mailto:${meta.about?.email}`} variant="link">
            {meta.about?.email}
          </Link>
          , or via socials below:
        </Text>
        <List spacing={1}>
          {Object.entries(socials).map(([name, href]) => (
            <ListItem key={name}>
              {name} -{' '}
              <Link href={href} isExternal variant="link">
                {trimHttps(href)}
              </Link>
            </ListItem>
          ))}
        </List>
      </Container>
    </>
  );
};

export default AboutPage;
