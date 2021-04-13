import { handleSetupError } from '../helpers/errors';
import { createUsersCollection } from './users';
import { createIssuesCollection } from './issues';
import {
  CreateFnRoleRegister,
  CreateFnRoleLogin,
  CreateFnRoleManipulateIssue,
  CreateBootstrapRole,
  CreateLoggedInRole,
} from './roles';
import {
  CreateAccountUDF,
  CreateLoginUDF,
  CreateIssueUDF,
  UpdateIssueUDF,
  DeleteIssueUDF,
  GetIssuesUDF,
} from './functions';

async function setupDatabase(client) {
  console.log(
    '1.  -- Collections and indices -- Creating collections and indices',
  );
  await handleSetupError(createUsersCollection(client), 'users');
  await handleSetupError(createIssuesCollection(client), 'issues');

  console.log(
    '2a. -- Roles                   -- Creating security roles to define permissions for functions',
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
    '3.  -- Functions               -- Creating User Defined Functions (UDFs)',
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
    '2b. -- Roles                   -- Creating security role to call functions',
  );
  await handleSetupError(
    client.query(CreateBootstrapRole),
    'function role - bootstrap',
  );

  console.log(
    '2c. -- Roles                   -- Creating role to provide access to data for logged in users',
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
