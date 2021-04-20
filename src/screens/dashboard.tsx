/** @jsxImportSource @emotion/react */
import * as React from 'react';
import { useAsync } from 'core/hooks/use-async';
import { API, graphqlOperation } from 'aws-amplify';
import { listItems } from 'core/graphql';
import { Item } from 'core/models';
import { theme } from 'core/theme';

function Dashboard() {
  const { isLoading, isError, isSuccess, error, data, run } = useAsync();

  React.useEffect(() => {
    run(API.graphql(graphqlOperation(listItems)));
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
      {isSuccess &&
        data?.data?.listItems?.items?.map((item: Item) => (
          <p key={item.id}>{item.title}</p>
        ))}
    </div>
  );
}

export { Dashboard };
