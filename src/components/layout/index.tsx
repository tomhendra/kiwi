/** @jsxImportSource @emotion/react */
import { Navbar } from 'components';
import { StyledContainer } from './styled';
import theme from 'theme';
import { Children } from 'types';

interface LayoutProps {
  children?: Children;
}

export function Layout({ children }: LayoutProps) {
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
        <StyledContainer>
          <Navbar />
        </StyledContainer>
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
        <StyledContainer>
          <p>Footer Goes Here</p>
        </StyledContainer>
      </footer>
    </div>
  );
}
