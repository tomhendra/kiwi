import { client, q } from 'core/api/db-client';

const deleteIssue = (issueRef: string) =>
  client
    .query(q.Delete(q.Ref(q.Collection('issues'), issueRef)))
    .then(res => res)
    .catch(err => console.warn(err.message));

export { deleteIssue };
