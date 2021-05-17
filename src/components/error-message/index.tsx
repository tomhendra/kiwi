/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { theme } from 'core/theme';

type ErrorMessageVariants = 'stacked' | 'inline';

const errorMessageVariants = {
  stacked: { display: 'block' },
  inline: { display: 'inline-block' },
};

const StyledPre = styled.pre`
  color: ${theme.colors.danger};
  ${({ variant }: { variant: ErrorMessageVariants }) =>
    errorMessageVariants[variant]}
`;

interface Props {
  error: Error | null;
  variant?: ErrorMessageVariants;
}

function ErrorMessage({ error, variant = 'stacked', ...props }: Props) {
  return (
    <StyledPre variant={variant}>
      <span>There was an error: </span>
      <pre>{error ? error.message : null}</pre>
    </StyledPre>
  );
}

export { ErrorMessage };
