import styled from '@emotion/styled';
import { theme } from 'core/theme';
import { Children, ReactElement } from 'core/models';

const StyledWrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
});

const StyledContainer = styled.div({
  maxWidth: theme.sizes.container,
  margin: '0 auto',
  padding: theme.space[4],
});

const StyledHeader = styled.div({
  width: '100%',
  background: 'inherit',
  boxShadow: theme.shadows.sm,
});

const StyledMain = styled.main({
  width: '100%',
  flex: '1 1 auto',
  paddingTop: theme.space[4],
});

const StyledFooter = styled.footer({
  width: '100%',
  background: 'inherit',
});

interface Props {
  nav?: ReactElement;
  footer?: ReactElement;
  children?: Children;
}

function Layout({ nav, footer, children }: Props) {
  return (
    <StyledWrapper>
      <StyledHeader>
        <StyledContainer>{nav}</StyledContainer>
      </StyledHeader>
      <StyledMain>
        <StyledContainer>{children}</StyledContainer>
      </StyledMain>
      <StyledFooter>
        <StyledContainer>{footer}</StyledContainer>
      </StyledFooter>
    </StyledWrapper>
  );
}

export { Layout };
