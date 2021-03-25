import { client, q } from 'core/services/db-client';

const createIssue = (issue: string) =>
  client
    .query(
      q.Create(q.Collection('issues'), {
        data: {
          issue,
        },
      }),
    )
    .then(ret => ret)
    .catch(err => console.warn(err));

export { createIssue };
