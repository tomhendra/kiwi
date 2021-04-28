/** @jsxImportSource @emotion/react */
import { theme } from 'theme';

const errorMessageVariants = {
  stacked: { display: 'block' },
  inline: { display: 'inline-block' },
};

interface Props {
  error: Error | null;
  variant?: 'stacked' | 'inline';
}

function ErrorMessage({ error, variant = 'stacked', ...props }: Props) {
  return (
    <div
      role="alert"
      css={[{ color: theme.colors.danger }, errorMessageVariants[variant]]}
      {...props}
    >
      <span>There was an error: </span>
      <pre
        css={[
          { whiteSpace: 'break-spaces', margin: '0', marginBottom: -5 },
          errorMessageVariants[variant],
        ]}
      >
        {error ? error.message : null}
      </pre>
    </div>
  );
}

export { ErrorMessage };
