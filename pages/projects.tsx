import * as React from 'react';

import ProjectItem from '~components/project-item';
import { ProjectsStaticPropsQuery } from '~generated/graphql';
import cms from '~lib/cms';

import { Container, Heading, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import { GetStaticProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';

interface ProjectsPageProps {
  data: ProjectsStaticPropsQuery;
}

export const getStaticProps: GetStaticProps<ProjectsPageProps> = async () => {
  const data = await cms().projectsStaticProps();
  return {
    props: {
      data,
    },
  };
};

const ProjectsPage: NextPage<ProjectsPageProps> = (props) => {
  const { data } = props;

  const pageMeta = {
    title: 'Creations and projects',
    description:
      'Here are some of my past creations from personal projects and professional works.',
  };

  return (
    <>
      <NextSeo {...pageMeta} />

      <Container maxW="4xl" p={[4, 8]}>
        <Stack align="center" spacing={4} textAlign="center">
          <Heading>{pageMeta.title}</Heading>
          <Text pb={8}>{pageMeta.description}</Text>

          <SimpleGrid columns={[1, 1, 2]} gap={4}>
            {data.allProjects.map((s) => (
              <ProjectItem key={s.id as string} data={s} />
            ))}
          </SimpleGrid>
        </Stack>
      </Container>
    </>
  );
};

export default ProjectsPage;
