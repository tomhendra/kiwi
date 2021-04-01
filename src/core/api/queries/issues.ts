import { client, q } from 'core/api/client';
import { Issue } from 'core/types';

/**
 * create........................................................
 */
const createIssue = (data: Issue) =>
  client
    .query(
      q.Create(q.Collection('issues'), {
        data,
      }),
    )
    .then(ret => ret)
    .catch(err => console.warn(err));

/**
 * read..........................................................
 */
const getAllIssues = client
  .query(q.Paginate(q.Match(q.Ref('indexes/all_issues'))))
  .then((response: any) => {
    const issueRefs = response.data;
    // create new query out of issue refs.
    // https://docs.fauna.com/fauna/current/api/fql/
    const getAllIssueDataQuery = issueRefs.map((ref: any) => {
      return q.Get(ref);
    });
    // query the refs
    return client.query(getAllIssueDataQuery).then(data => data);
  })
  .catch(error => console.warn('error', error.message));

/**
 * update........................................................
 * It’s also possible to replace an entire document using Replace instead.
 *  https://docs.fauna.com/fauna/current/api/fql/functions/replace
 */
const editIssue = (issueId: string, update: string) =>
  client
    .query(
      q.Update(q.Ref(q.Collection('issues'), issueId), {
        data: { text: update },
      }),
    )
    .then(ret => console.log(ret))
    .catch(err => console.warn(err));

/**
 * delete........................................................
 */
const deleteIssue = (issueRef: string) =>
  client
    .query(q.Delete(q.Ref(q.Collection('issues'), issueRef)))
    .then(res => res)
    .catch(err => console.warn(err.message));

export { createIssue, getAllIssues, editIssue, deleteIssue };
