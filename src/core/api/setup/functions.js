import { RegisterUser, LoginUser } from '../queries/auth';
import {
  CreateIssue,
  UpdateIssue,
  DeleteIssue,
  GetIssues,
} from '../queries/issues';

import faunadb from 'faunadb';
const q = faunadb.query;
const { Var, Query, Lambda, Exists, If, Update, CreateFunction, Role } = q;

/*
 * A convenience function to either create or update a function.
 * We use a wrapper helper to make sure that we override a function with 'Update' in case it already exists
 * and Create it with 'CreateFunction' if it did not exist yet.
 */
function CreateOrUpdateFunction(obj) {
  return If(
    Exists(q.Function(obj.name)),
    Update(q.Function(obj.name), { body: obj.body, role: obj.role }),
    CreateFunction({ name: obj.name, body: obj.body, role: obj.role }),
  );
}

const CreateAccountUDF = CreateOrUpdateFunction({
  name: 'register',
  // Note that 'Lambda' requires two parameters to be provided when you call the User Defined Function.
  // The parameters will be bound to the variables 'email' and 'password' which are used by the functions that we pass in.
  // Since these functions are in the scope of this lambda, they can access these variables.
  // (see above how these functions use Var('email) and Var('password).
  // TODO - simple email format and password verification.

  body: Query(
    Lambda(['email', 'password'], RegisterUser(Var('email'), Var('password'))),
  ),
  role: Role('functionrole_register'),
});

const CreateLoginUDF = CreateOrUpdateFunction({
  name: 'login',
  body: Query(
    Lambda(['email', 'password'], LoginUser(Var('email'), Var('password'))),
  ),
  role: Role('functionrole_login'),
});

const CreateIssueUDF = CreateOrUpdateFunction({
  name: 'create_issue',
  body: Query(Lambda([], CreateIssue())),
  role: Role('functionrole_manipulate_issues'),
});

const UpdateIssueUDF = CreateOrUpdateFunction({
  name: 'update_issue',
  body: Query(Lambda([], UpdateIssue())),
  role: Role('functionrole_manipulate_issues'),
});

const DeleteIssueUDF = CreateOrUpdateFunction({
  name: 'create_issue',
  body: Query(Lambda([], DeleteIssue())),
  role: Role('functionrole_manipulate_issues'),
});

const GetIssuesUDF = CreateOrUpdateFunction({
  name: 'get_issues',
  body: Query(Lambda([], GetIssues())),
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
