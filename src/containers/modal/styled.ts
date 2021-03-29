import styled from '@emotion/styled';
import { theme } from 'core/theme';
import '@reach/dialog/styles.css';

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

const StyledContent = styled.div({
  position: 'relative',
  overflowX: 'hidden',
  overflowY: 'auto',
  outline: 0,
  maxWidth: theme.sizes.lg,
  borderRadius: theme.radii.md,
  padding: `${theme.space[5]} ${theme.space[5]} ${theme.space[6]} ${theme.space[5]}`,
  boxShadow: theme.shadows.default,
  margin: '20vh auto',
  background: theme.colors.background,
  zIndex: theme.zIndices[50],
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

export { StyledCloseButton, StyledOverlay, StyledContent };
