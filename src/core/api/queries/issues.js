import { flattenDataKeys } from '../helpers/utils';
import faunadb from 'faunadb';
const q = faunadb.query;
const { Call } = q;

/*
 * create
 */
function CreateIssue(client, issue) {
  return client
    .query(Call(q.Function('create_issue'), issue))
    .then(res => flattenDataKeys(res));
}

/*
 * update........................................................
 */
function UpdateIssue(client, issue) {
  return client
    .query(Call(q.Function('update_issue'), issue))
    .then(res => flattenDataKeys(res));
}

/*
 * delete........................................................
 */
function DeleteIssue(client, archive) {
  return client
    .query(Call(q.Function('delete_a'), archive))
    .then(res => flattenDataKeys(res));
}

/*
 * read..........................................................
 */
function GetIssues(client) {
  return client
    .query(Call(q.Function('get_issues')))
    .then(res => flattenDataKeys(res));
}

export { CreateIssue, UpdateIssue, DeleteIssue, GetIssues };
