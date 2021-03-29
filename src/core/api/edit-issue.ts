import { client, q } from 'core/api/db-client';

const editIssue = (issueId: string, update: string) =>
  client
    .query(
      q.Update(q.Ref(q.Collection('issues'), issueId), {
        data: { text: update },
      }),
    )
    .then(ret => console.log(ret))
    .catch(err => console.warn(err));

export { editIssue };
