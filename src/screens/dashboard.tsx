/** @jsxImportSource @emotion/react */
import * as React from 'react';
// import { useAsync } from 'core/hooks/use-async';
import { theme } from 'core/theme';
// import { Item } from 'core/types';

function Dashboard() {
  // const { data, error, run, isLoading, isError, isSuccess } = useAsync();

  // React.useEffect(() => {
  //   run(GetItems(client));
  // }, [run]);

  return (
    <div
      css={{
        padding: '3rem',
        borderRadius: theme.radii.md,
        background: theme.colors.white,
        marginTop: theme.space[5],
      }}
    >
      Dashboard woot!
      {/* {isLoading && <p>Loading...</p>}
      {isError && <pre>{error}</pre>}
      {isSuccess && data.map((item: Item) => <pre>{item}</pre>)} */}
    </div>
  );
}

export { Dashboard };
