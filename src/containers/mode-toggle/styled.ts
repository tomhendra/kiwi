import styled from '@emotion/styled';
import { theme } from 'core/theme';

export const StyledButton = styled.button({
  cursor: 'pointer',
  width: theme.sizes[10],
  height: theme.sizes[10],
  background: 'inherit',
  color: 'inherit',
  border: 'none',
  padding: theme.space[1],
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});
