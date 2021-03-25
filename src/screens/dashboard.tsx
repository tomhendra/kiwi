import * as React from 'react';
import { getAllIssues, deleteIssue, editIssue } from 'core/services';

function Dashboard() {
  const [issues, setIssues] = React.useState([]);

  React.useEffect(() => {
    getAllIssues.then(response => setIssues(response));
  }, []);

  return (
    <div>
      {issues.map(issue => (
        <pre>{issue}</pre>
      ))}
    </div>
  );
}

export { Dashboard };
