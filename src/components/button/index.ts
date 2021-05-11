import styled from '@emotion/styled';
import { theme } from 'core/theme';

type ButtonVariants = 'primary' | 'secondary';

const buttonVariants = {
  primary: {
    background: theme.colors.primary,
    color: theme.colors.white,
  },
  secondary: {
    background: theme.colors.muted,
    color: theme.colors.text,
  },
};

const Button = styled.button(
  {
    display: 'block',
    cursor: 'pointer',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    padding: `${theme.space[2]} ${theme.space[3]}`,
    border: '0',
    lineHeight: theme.lineHeights.normal,
    borderRadius: theme.radii.md,
    width: '100%',
  },
  ({ variant = 'primary' }: { variant: ButtonVariants }) =>
    buttonVariants[variant],
);

export { Button };
