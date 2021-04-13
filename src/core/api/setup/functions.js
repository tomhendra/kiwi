import { RegisterUser, LoginUser } from '../queries/auth';
import faunadb from 'faunadb';
const q = faunadb.query;
const {
  Create,
  Collection,
  Var,
  Query,
  Lambda,
  Exists,
  If,
  Update,
  CreateFunction,
  Role,
  Function: Fn,
} = q;

/*
 * A convenience function to either create or update a function.
 * We use a wrapper helper to make sure that we override a function with 'Update' in case it already exists
 * and Create it with 'CreateFunction' if it did not exist yet.
 * This allows us to iterate on the setup without having to nuke everything each time we make changes.
 */
function CreateOrUpdateFunction(obj) {
  return If(
    Exists(Fn(obj.name)),
    Update(Fn(obj.name), { body: obj.body, role: obj.role }),
    CreateFunction({ name: obj.name, body: obj.body, role: obj.role }),
  );
}

// ----------------- REGISTER ----------------- //
const CreateAccountUDF = CreateOrUpdateFunction({
  name: 'register',
  // Note that 'Lambda' requires two parameters to be provided when you call the User Defined Function.
  // The parameters will be bound to the variables 'email' and 'password' which are used by the functions that we pass in.
  // Since these functions are in the scope of this lambda, they can access these variables.
  // TODO - simple email format and password verification.
  body: Query(
    Lambda(['email', 'password'], RegisterUser(Var('email'), Var('password'))),
  ),
  role: Role('functionrole_register'),
});

// ----------------- LOGIN ----------------- //
const CreateLoginUDF = CreateOrUpdateFunction({
  name: 'login',
  body: Query(
    Lambda(['email', 'password'], LoginUser(Var('email'), Var('password'))),
  ),
  role: Role('functionrole_login'),
});

// ----------------- CRUD ISSUES ----------------- //
const CreateIssueUDF = CreateOrUpdateFunction({
  name: 'create_issue',
  body: Query(
    Lambda(
      [
        'message',
        'assignee',
        'attachments',
        'date',
        'description',
        'tags',
        'name',
        'priority',
        'project',
        'reporter',
        'estimate',
        'status',
        'type',
      ],
      Create(Collection('issues'), {
        data: {
          message: Var('message'),
          assignee: Var('assignee'),
          attachments: Var('attachments'),
          date: Var('date'),
          description: Var('description'),
          tags: Var('tags'),
          name: Var('name'),
          priority: Var('Priority'),
          project: Var('project'),
          reporter: Var('reporter'),
          estimate: Var('estimate'),
          status: Var('status'),
          type: Var('type'),
        },
      }),
    ),
  ),
  role: Role('functionrole_manipulate_issues'),
});

// TODO: Function logic
const UpdateIssueUDF = CreateOrUpdateFunction({
  name: 'update_issue',
  body: Query(Lambda([])),
  role: Role('functionrole_manipulate_issues'),
});

const DeleteIssueUDF = CreateOrUpdateFunction({
  name: 'delete_issue',
  body: Query(Lambda([])),
  role: Role('functionrole_manipulate_issues'),
});

const GetIssuesUDF = CreateOrUpdateFunction({
  name: 'get_issues',
  body: Query(Lambda([])),
  role: Role('functionrole_manipulate_issues'),
});

export {
  CreateAccountUDF,
  CreateLoginUDF,
  CreateIssueUDF,
  UpdateIssueUDF,
  DeleteIssueUDF,
  GetIssuesUDF,
};
