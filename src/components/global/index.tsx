import { Global as EmotionGlobal, css } from '@emotion/react';
import { theme } from 'core/theme';

function Global() {
  return (
    <EmotionGlobal
      styles={css`
        ::selection {
          background-color: ${theme.colors.muted};
          color: ${theme.colors.primary};
        }

        body {
          background: ${theme.colors.background};
          color: ${theme.colors.text};
          font-family: ${theme.fonts.body};
          text-rendering: optimizeLegibility;
          margin: 0;
        }

        a {
          color: ${theme.colors.primary};
          text-decoration: underline;
        }

        .hidden {
          display: none;
        }

        span[aria-hidden='true'] {
          display: none;
        }

        span[aria-hidden='false'] {
          display: block;
        }
      `}
    />
  );
}

export { Global };
