import {
  extendTheme,
  theme as defaultTheme,
  ThemeOverride,
} from '@chakra-ui/react';

export default extendTheme(<ThemeOverride>{
  components: {
    Heading: {
      baseStyle: {
        fontWeight: 800,
        letterSpacing: 'tighter',
      },
    },
    Link: {
      variants: {
        link: {
          color: 'telegram.400',
        },
      },
    },
  },

  config: {
    initialColorMode: 'dark',
  },

  fonts: {
    body: `'Archivo',${defaultTheme.fonts.body}`,
    heading: `'Manrope',${defaultTheme.fonts.heading}`,
  },

  styles: {
    global: {
      '::selection, ::-moz-selection': {
        bgColor: 'whiteAlpha.400',
      },

      html: {
        scrollBehavior: 'smooth',
      },
      body: {
        bg: 'blackAlpha.900',
        color: 'whiteAlpha.900',
        cursor: 'default',
        fontFamily: 'body',
        lineHeight: 'base',
        minH: '100vh',

        MozOsxFontSmoothing: 'grayscale',
        WebkitFontSmoothing: 'antialiased',
        textRendering: 'optimizeLegibility',
      },
      '*::placeholder': {
        color: 'whiteAlpha.400',
      },
      '*, *::before, &::after': {
        borderColor: 'whiteAlpha.300',
        wordWrap: 'break-word',
      },

      '#nprogress': {
        pointerEvents: 'none',
      },
      '#nprogress .bar': {
        bgGradient: 'linear(to-r, whiteAlpha.400, telegram.400)',
        h: '2px',
        left: 0,
        pos: 'fixed',
        top: 0,
        w: 'full',
        zIndex: 2000,
      },
      '.nprogress-custom-parent': {
        overflow: 'hidden',
        position: 'absolute',
      },
    },
  },
});
