import * as React from 'react';

import Footer from '~components/footer';
import MobileDrawer from '~components/mobile-drawer/lazy';
import MotionBox from '~components/motion/box';
import Navbar from '~components/navbar';
import siteConfig from '~config/site';
import { WebsiteSeoTagsQuery } from '~generated/graphql';
import useNProgress from '~hooks/use-nprogress';
import cms from '~lib/cms';
import { MetaContext } from '~store/meta';
import theme from '~theme';

import { ChakraProvider, EASINGS, Flex } from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';
import NextApp, { AppContext, AppProps } from 'next/app';
import Head from 'next/head';
import { DefaultSeo, SocialProfileJsonLd } from 'next-seo';
import { OpenGraphMedia } from 'next-seo/lib/types';
import { renderMetaTags, SeoMetaTagType } from 'react-datocms';

interface CustomAppProps extends AppProps {
  meta: WebsiteSeoTagsQuery;
}

const Providers: React.FC<Pick<CustomAppProps, 'meta'>> = (props) => {
  const { children, meta } = props;

  return (
    <ChakraProvider resetCSS theme={theme}>
      <MetaContext.Provider value={meta}>
        {/*  */}
        {children}
      </MetaContext.Provider>
    </ChakraProvider>
  );
};

const Effects: React.FC<Pick<CustomAppProps, 'meta' | 'router'>> = (props) => {
  const { meta, router } = props;

  useNProgress(router);

  return null;
};

const PAGE_TRANSITION_VARIANTS = {
  initial: {
    opacity: 0,
    x: 0,
    y: -8,
  },
  enter: {
    duration: 0.2,
    ease: EASINGS.easeOut,
    opacity: 1,
    x: 0,
    y: 0,
  },
  exit: {
    duration: 0.1,
    ease: EASINGS.easeIn,
    opacity: 0,
    x: 0,
    y: 8,
  },
};

export default function App(props: CustomAppProps) {
  const { Component, pageProps, meta, router } = props;

  return (
    <Providers meta={meta}>
      <Head>
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />
        {renderMetaTags(meta.site.favicon as SeoMetaTagType[])}
      </Head>

      <DefaultSeo
        canonical={siteConfig.siteUrl + (router.asPath || '')}
        defaultTitle={meta.site.seo?.fallback?.title as string}
        description={meta.site.seo?.fallback?.description as string}
        openGraph={{
          type: 'website',
          site_name: meta.site.seo?.siteName as string,
          images: [meta.site.seo?.fallback?.image as OpenGraphMedia],
        }}
        twitter={{
          cardType: meta.site.seo?.fallback?.twitterCard as string,
          handle: meta.site.seo?.twitterAccount as string,
          site: meta.site.seo?.twitterAccount as string,
        }}
      />

      <SocialProfileJsonLd
        name={meta.site.seo?.siteName as string}
        sameAs={Object.values(meta.about?.socials as Record<string, string>)}
        type="person"
        url={siteConfig.siteUrl}
      />

      <Flex flexDir="column" minH="100vh">
        <Navbar />
        <AnimatePresence exitBeforeEnter>
          <MotionBox
            key={router.route}
            animate="enter"
            exit="exit"
            flexGrow={1}
            initial="initial"
            variants={PAGE_TRANSITION_VARIANTS}
          >
            <Component {...pageProps} />
          </MotionBox>
        </AnimatePresence>
        <Footer />
        <MobileDrawer />
      </Flex>

      <Effects meta={meta} router={router} />
    </Providers>
  );
}

App.getInitialProps = async (ctx: AppContext) => {
  const props = NextApp.getInitialProps(ctx);
  const meta = await cms().websiteSeoTags();

  return { ...props, meta };
};
