import { flattenDataKeys } from '../helpers/utils';
import faunadb from 'faunadb';
const q = faunadb.query;
const { Call, Function: Fn } = q;

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

function UpdateIssue(
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
        Fn('update_issue'),
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

function DeleteIssue(client) {
  return client
    .query(Call(Fn('delete_issue')))
    .then(res => flattenDataKeys(res));
}

function GetIssues(client) {
  return client.query(Call(Fn('get_issues'))).then(res => flattenDataKeys(res));
}

export { CreateIssue, UpdateIssue, DeleteIssue, GetIssues };
