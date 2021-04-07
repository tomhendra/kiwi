/** @jsxImportSource @emotion/react */
import * as React from 'react';
import { getAllIssues } from 'core/api/queries';
import { useAsync } from 'core/hooks/use-async';
import { theme } from 'core/theme';
import { Issue } from 'core/types';

function Dashboard() {
  const { data, error, run, isLoading, isError, isSuccess } = useAsync();

  React.useEffect(() => {
    run(getAllIssues);
  }, [run]);

  return (
    <div
      css={{
        padding: '3rem',
        borderRadius: theme.radii.md,
        background: theme.colors.white,
        marginTop: theme.space[5],
      }}
    >
      {isLoading && <p>Loading...</p>}
      {isError && <pre>{error}</pre>}
      {isSuccess && data.map((issue: Issue) => <pre>{issue}</pre>)}
    </div>
  );
}

export { Dashboard };
