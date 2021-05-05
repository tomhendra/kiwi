/** @jsxImportSource @emotion/react */

import { StyledContainer } from './styled';
import { theme } from 'theme';
import { Children, ReactElement } from 'models/react';

interface Props {
  nav?: ReactElement;
  footer?: ReactElement;
  children?: Children;
}

function Layout({ nav, footer, children }: Props) {
  return (
    <div
      css={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <header
        css={{
          width: '100%',
          background: 'inherit',
          boxShadow: theme.shadows.sm,
        }}
      >
        <StyledContainer>{nav}</StyledContainer>
      </header>
      <main
        css={{
          width: '100%',
          flex: '1 1 auto',
          paddingTop: theme.space[4],
        }}
      >
        <StyledContainer>{children}</StyledContainer>
      </main>
      <footer
        css={{
          width: '100%',
          background: 'inherit',
        }}
      >
        <StyledContainer>{footer}</StyledContainer>
      </footer>
    </div>
  );
}

export { Layout };
