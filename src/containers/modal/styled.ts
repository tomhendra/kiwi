import styled from '@emotion/styled';
import { theme } from 'theme';

const StyledOverlay = styled.aside({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: theme.colors.overlay,
  zIndex: theme.zIndices[40],
  transform: `translateZ(0)`,
});

const StyledWrapper = styled.div({
  position: 'relative',
  outline: 0,
  background: theme.colors.background,
  zIndex: theme.zIndices[50],
  maxWidth: theme.sizes.lg,
  maxHeight: theme.sizes['2xl'],
  borderRadius: theme.radii.md,
  boxShadow: theme.shadows.default,
  margin: '10vh auto',
  padding: `${theme.space[5]} ${theme.space[5]} ${theme.space[6]} ${theme.space[5]}`,
});

const StyledTitle = styled.h3({
  textAlign: 'center',
  fontSize: theme.fontSizes[3],
});

const StyledContent = styled.div({
  overflowX: 'hidden',
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
});

const StyledCloseButton = styled.button({
  background: theme.colors.background,
  color: theme.colors.text,
  border: `1px solid ${theme.colors.muted}`,
  borderRadius: theme.radii.md,
  padding: '0',
  width: theme.sizes[8],
  height: theme.sizes[8],
  lineHeight: theme.lineHeights.normal,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
});

export {
  StyledCloseButton,
  StyledOverlay,
  StyledWrapper,
  StyledTitle,
  StyledContent,
};
