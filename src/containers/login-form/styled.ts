import styled from '@emotion/styled';
import { theme } from 'core/theme';

const StyledForm = styled.form({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  '> div': {
    margin: `${theme.space[3]} auto`,
    width: '100%',
    maxWidth: theme.sizes.md,
  },
});

const StyledInput = styled.input({
  borderRadius: theme.radii.md,
  border: `1px solid ${theme.colors.muted}`,
  background: theme.colors.muted,
  padding: `${theme.space[2]} ${theme.space[3]}`,
  marginTop: theme.space[1],
});

const StyledFormGroup = styled.div({
  display: 'flex',
  flexDirection: 'column',
});

export { StyledForm, StyledFormGroup, StyledInput };
