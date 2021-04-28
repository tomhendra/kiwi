// import { DataStore } from 'aws-amplify';
// import { ErrorMessage, FullPageSpinner } from 'components';
// import { useAsync } from 'hooks';
// import { Item } from 'models';
import React from 'react';

function Dashboard() {
  // const {
  //   isIdle,
  //   isLoading,
  //   isError,
  //   isSuccess,
  //   run,
  //   data: items,
  //   error,
  // } = useAsync();

  // React.useEffect(() => {
  //   run(DataStore.query(Item));
  // });

  // if (isIdle) {
  //   return <p>I am idling</p>;
  // }

  // if (isLoading) {
  //   return <FullPageSpinner />;
  // }

  // if (isError) {
  //   return <ErrorMessage error={error} />;
  // }

  // if (isSuccess) {
  return (
    <>
      <h2>I am the Dashboard screen</h2>
      {/* {items.map((item: Item) => (
          <div>{item.title}</div>
        ))} */}
    </>
  );
  // }
}

export { Dashboard };
