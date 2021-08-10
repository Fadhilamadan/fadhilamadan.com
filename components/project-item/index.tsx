import * as React from 'react';

import DatoImage from '~components/dato-image';
import { ProjectFragment } from '~generated/graphql';
import trimHttps from '~utils/trim-https';

import { Heading, LinkBox, LinkOverlay, Stack, Text } from '@chakra-ui/react';
import { ResponsiveImageType } from 'react-datocms';

interface ProjectItemProps {
  data: ProjectFragment;
}

const ProjectItem: React.FC<ProjectItemProps> = (props) => {
  const { data } = props;

  return (
    <LinkBox
      key={data.id as string}
      _hover={{ boxShadow: 'lg', translateY: '-4px' }}
      bgColor="blackAlpha.50"
      borderRadius="md"
      boxShadow="sm"
      d="inline-block"
      overflow="hidden"
      pos="relative"
      role="group"
      transform="auto-gpu"
      transitionDuration="fast"
      transitionProperty="common"
      transitionTimingFunction="ease-out"
    >
      <DatoImage
        _groupHover={{ filter: 'blur(2px)' }}
        d="block"
        data={data.cover?.responsiveImage as ResponsiveImageType}
        transitionDuration="normal"
        transitionProperty="common"
        transitionTimingFunction="ease-out"
      />

      <Stack
        _groupHover={{ opacity: 1 }}
        align="center"
        bgColor="blackAlpha.700"
        inset={0}
        justify="center"
        opacity={0}
        pos="absolute"
        px={8}
        py={4}
        transitionDuration="normal"
        transitionProperty="common"
        transitionTimingFunction="ease-out"
      >
        <Heading size="md">{data.title}</Heading>
        <Text fontSize={['xs', 'sm']}>{data.subtitle}</Text>

        {data.url !== null && (
          <LinkOverlay
            color="telegram.400"
            fontSize={['xs', 'sm']}
            href={data.url as string}
            isExternal
            pb={4}
          >
            {trimHttps(data.url as string)}
          </LinkOverlay>
        )}
      </Stack>
    </LinkBox>
  );
};

export default ProjectItem;
