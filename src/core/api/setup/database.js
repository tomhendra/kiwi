import {
  CreateAccountUDF,
  CreateLoginUDF,
  CreateIssueUDF,
  UpdateIssueUDF,
  DeleteIssueUDF,
  GetIssuesUDF,
} from './functions';
import {
  CreateFnRoleRegister,
  CreateFnRoleLogin,
  CreateFnRoleManipulateIssue,
  CreateBootstrapRole,
  CreateLoggedInRole,
} from './roles';
import { createUsersCollection } from './users';
import { createIssuesCollection } from './issues';
import { handleSetupError } from '../helpers/errors';

async function setupDatabase(client) {
  console.log('1.  -- Collections and Indexes -- Creating collections');
  await handleSetupError(createUsersCollection(client), 'users');
  await handleSetupError(createIssuesCollection(client), 'issues');

  console.log(
    '4a. -- Roles                   -- Creating security roles to be assumed by the functions',
  );
  await handleSetupError(
    client.query(CreateFnRoleRegister),
    'function role - register',
  );
  await handleSetupError(
    client.query(CreateFnRoleLogin),
    'function role - login',
  );
  await handleSetupError(
    client.query(CreateFnRoleManipulateIssue),
    'function role - create and manipulate issues',
  );

  console.log(
    '5.  -- Functions               -- Creating User Defined Functions (UDF)',
  );
  await handleSetupError(
    client.query(CreateAccountUDF),
    'user defined function - register',
  );
  await handleSetupError(
    client.query(CreateLoginUDF),
    'user defined function - login',
  );
  await handleSetupError(
    client.query(CreateIssueUDF),
    'user defined function - create issue',
  );
  await handleSetupError(
    client.query(UpdateIssueUDF),
    'user defined function - update issue',
  );
  await handleSetupError(
    client.query(DeleteIssueUDF),
    'user defined function - delete issue',
  );
  await handleSetupError(
    client.query(GetIssuesUDF),
    'user defined function - get issues',
  );

  console.log(
    '4b. -- Roles                   -- Creating security role that can call the functions',
  );
  await handleSetupError(
    client.query(CreateBootstrapRole),
    'function role - bootstrap',
  );

  console.log(
    '4c. -- Roles                   -- Give logged in accounts access to their data',
  );
  await handleSetupError(
    client.query(CreateLoggedInRole),
    'membership role - logged in role',
  );
}

/* Deletion of sets
const DeleteAllCollections = Map(
  Paginate(Collections()),
  Lambda('ref', Delete(Var('ref'))),
);
const DeleteAllIndexes = Map(
  Paginate(Indexes()),
  Lambda('ref', Delete(Var('ref'))),
);
const DeleteAllTokens = Map(
  Paginate(Documents(Tokens())),
  Lambda('ref', Delete(Var('ref'))),
);
const DeleteAllFunctions = Map(
  Paginate(Functions()),
  Lambda('ref', Delete(Var('ref'))),
);
*/

export { setupDatabase };
