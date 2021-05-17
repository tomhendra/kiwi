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

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  overflow: hidden;
  white-space: nowrap;
  padding: ${theme.space[2]} ${theme.space[3]};
  border: 0;
  line-height: ${theme.lineHeights.normal};
  border-radius: ${theme.radii.md};
  width: 100%;
  ${({ variant = 'primary' }: { variant: ButtonVariants }) =>
    buttonVariants[variant]}
`;

export { Button };
