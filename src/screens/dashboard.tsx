/** @jsxImportSource @emotion/react */
import { theme } from 'core/theme';
import * as React from 'react';
// import { getAllIssues, deleteIssue, editIssue } from 'core/api/queries';

function Dashboard() {
  // const [issues, setIssues] = React.useState([]);

  // React.useEffect(() => {
  //   getAllIssues.then(response => setIssues(response));
  // }, []);

  return (
    <div
      css={{
        padding: '3rem',
        borderRadius: theme.radii.md,
        background: theme.colors.white,
        marginTop: theme.space[5],
      }}
    >
      {/* {issues.map(issue => (
        <pre>{issue}</pre>
      ))} */}
      Dashboard content goes here.
    </div>
  );
}

export { Dashboard };
