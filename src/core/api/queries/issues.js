import { flattenDataKeys } from '../helpers/utils';
import faunadb from 'faunadb';
const q = faunadb.query;
const { Call } = q;

/*
 * CreateIssue will be used to create a user defined function
 */
function CreateIssue(client, data) {
  return client
    .query(Call(q.Function('create_issue'), data))
    .then(res => flattenDataKeys(res));
}

/*
 * update........................................................
 */

function UpdateIssue(client, data) {
  return client
    .query(Call(q.Function('update_issue'), data))
    .then(res => flattenDataKeys(res));
}

/*
 * delete........................................................
 */

function DeleteIssue(client, data) {
  return client
    .query(Call(q.Function('delete_issue'), data))
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
