import { flattenDataKeys } from '../helpers/utils';
import faunadb from 'faunadb';
const q = faunadb.query;
const { Call, Function: Fn } = q;

/*
 * create
 */
function CreateIssue(
  client,
  message,
  assignee,
  attachments,
  date,
  description,
  tags,
  name,
  priority,
  project,
  reporter,
  estimate,
  status,
  type,
) {
  return client
    .query(
      Call(
        Fn('create_issue'),
        message,
        assignee,
        attachments,
        date,
        description,
        tags,
        name,
        priority,
        project,
        reporter,
        estimate,
        status,
        type,
      ),
    )
    .then(res => flattenDataKeys(res));
}

/*
 * update........................................................
 */
function UpdateIssue(client, issue) {
  return client
    .query(Call(Fn('update_issue'), issue))
    .then(res => flattenDataKeys(res));
}

/*
 * delete........................................................
 */
function DeleteIssue(client, archive) {
  return client
    .query(Call(Fn('delete_issue'), archive))
    .then(res => flattenDataKeys(res));
}

/*
 * read..........................................................
 */
function GetIssues(client) {
  return client.query(Call(Fn('get_issues'))).then(res => flattenDataKeys(res));
}

export { CreateIssue, UpdateIssue, DeleteIssue, GetIssues };
