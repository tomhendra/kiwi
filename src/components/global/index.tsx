import { Global as EmotionGlobal } from '@emotion/react';
import { theme } from 'core/theme';

function Global() {
  return (
    <EmotionGlobal
      styles={{
        '::selection': {
          backgroundColor: theme.colors.muted,
          color: theme.colors.primary,
        },

        body: {
          background: theme.colors.background,
          color: theme.colors.text,
          fontFamily: theme.fonts.body,
          textRendering: 'optimizeLegibility',
          margin: '0',
        },

        a: {
          color: theme.colors.primary,
          textDecoration: 'underline',
        },

        '.hidden': {
          display: 'none',
        },

        'span[aria-hidden="true"]': {
          display: 'none',
        },

        'span[aria-hidden="false"]': {
          display: 'block',
        },
      }}
    />
  );
}

export { Global };
