/** @jsxImportSource @emotion/react */
import { theme } from 'core/theme';

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
    <pre
      css={[
        {
          color: theme.colors.danger,
        },
        errorMessageVariants[variant],
      ]}
      {...props}
    >
      <span>There was an error: </span>
      <pre>{error ? error.message : null}</pre>
    </pre>
  );
}

function ErrorFallback({ error }: { error: Error }) {
  return (
    <ErrorMessage
      error={error}
      // @ts-ignore
      css={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    />
  );
}

function FullPageErrorFallback({ error }: { error: Error }) {
  return (
    <div
      role="alert"
      css={{
        color: theme.colors.danger,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <p>Uh oh... There's a problem. Try refreshing the app.</p>
      <pre>{error.message}</pre>
    </div>
  );
}

export { ErrorMessage, ErrorFallback, FullPageErrorFallback };
