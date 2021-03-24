import styled from '@emotion/styled';
import { Dialog, DialogProps } from '@reach/dialog';
import { theme } from 'core/theme';
import '@reach/dialog/styles.css';

const StyledCircleButton = styled.button({
  background: theme.colors.background,
  color: theme.colors.text,
  border: `1px solid ${theme.colors.muted}`,
  borderRadius: theme.radii.md,
  padding: '0',
  width: theme.sizes[16],
  height: theme.sizes[16],
  lineHeight: theme.lineHeights.normal,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
});

// TODO: Fix dark theme background not being applied
const StyledDialog = styled(Dialog as React.FC<DialogProps>)({
  maxWidth: theme.sizes['3xl'],
  borderRadius: theme.radii.md,
  paddingBottom: theme.space[6],
  boxShadow: theme.shadows.default,
  margin: '20vh auto',
});

const StyledContentWrapper = styled.div({
  display: 'flex',
  justifyContent: 'flex-end',
});

export { StyledCircleButton, StyledDialog, StyledContentWrapper };
