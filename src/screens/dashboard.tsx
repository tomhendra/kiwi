/** @jsxImportSource @emotion/react */
import * as React from 'react';
import { useAsync } from 'core/hooks/use-async';
import { API, graphqlOperation } from 'aws-amplify';
import { listItems } from 'core/graphql';
import { Item, ListItemsQuery } from 'core/models';
import { theme } from 'core/theme';

function Dashboard() {
  const {
    isLoading,
    isError,
    isSuccess,
    error,
    status,
    data,
    run,
  } = useAsync();

  React.useEffect(() => {
    run(API.graphql(graphqlOperation(listItems)));
    // fetchItems();
  }, [run]);

  console.log({ data, error, status, run, isLoading, isError, isSuccess });

  // async function fetchItems() {
  //   try {
  //     const itemData: any = await API.graphql(graphqlOperation(listItems));
  //     setItems(itemData.data.listItems.items);
  //   } catch (err) {
  //     console.log('error fetching items');
  //   }
  // }

  // if (isLoading) {
  //   return (
  //     <div
  //       css={{
  //         padding: '3rem',
  //         borderRadius: theme.radii.md,
  //         background: theme.colors.white,
  //         marginTop: theme.space[5],
  //       }}
  //     >
  //       <p>Loading...</p>
  //     </div>
  //   );
  // }

  // if (isError) {
  //   return (
  //     <div
  //       css={{
  //         padding: '3rem',
  //         borderRadius: theme.radii.md,
  //         background: theme.colors.white,
  //         marginTop: theme.space[5],
  //       }}
  //     >
  //       <pre>{error}</pre>
  //     </div>
  //   );
  // }

  return (
    <div
      css={{
        padding: '3rem',
        borderRadius: theme.radii.md,
        background: theme.colors.white,
        marginTop: theme.space[5],
      }}
    >
      {isSuccess
        ? data?.data?.listItems?.items?.map((item: Item) => (
            <p key={item.id}>{item.title}</p>
          ))
        : null}
    </div>
  );
}

export { Dashboard };
