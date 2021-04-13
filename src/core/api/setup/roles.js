import faunadb from 'faunadb';
const q = faunadb.query;
const {
  CreateRole,
  Role,
  Collection,
  Index,
  If,
  Exists,
  Update,
  Function: Fn,
} = q;

// A convenience function to either create or update a role.
function CreateOrUpdateRole(obj) {
  return If(
    Exists(Role(obj.name)),
    Update(Role(obj.name), {
      membership: obj.membership,
      privileges: obj.privileges,
    }),
    CreateRole(obj),
  );
}

// When a user first arrives to the application, they should only be able to
// create a new account (register UDF) and login with a given account (login UDF)
// This role will be used to generate a key to bootstrap this process.
const CreateBootstrapRole = CreateOrUpdateRole({
  name: 'keyrole_calludfs',
  privileges: [
    {
      resource: Fn('login'),
      actions: { call: true },
    },
    {
      resource: Fn('register'),
      actions: { call: true },
    },
  ],
});

// The register function only needs to be able to create user accounts.
const CreateFnRoleRegister = CreateOrUpdateRole({
  name: 'functionrole_register',
  privileges: [
    {
      resource: Collection('users'),
      actions: { create: true }, // write is to update, create is to create new instances
    },
  ],
});

// The login function only needs to be able to Login into accounts with the 'Login' FQL function.
// That FQL function requires a reference and we will get the account reference with an index.
// Therefore it needs read access to the 'user_by_email' index. Afterwards it will return the
// account so the frontend has the email of the user so we also need read access to the 'accounts' collection
const CreateFnRoleLogin = CreateOrUpdateRole({
  name: 'functionrole_login',
  privileges: [
    {
      resource: Collection('users'),
      actions: { read: true },
    },
  ],
});

const CreateLoggedInRole = CreateOrUpdateRole({
  name: 'membershiprole_loggedin',
  membership: [{ resource: Collection('users') }],
  privileges: [
    // these are all the User Defined Functions
    // that a logged in user can call. All our manipulations
    // are encapsulated in User Defined Functions which makes it easier
    // to limit what data and how a user can adapt data.
    {
      resource: Fn('create_issue'),
      actions: { call: true },
    },
    {
      // To search
      resource: Index('all_issues'),
      actions: { read: true },
    },
  ],
});

const CreateFnRoleManipulateIssue = CreateOrUpdateRole({
  name: 'functionrole_manipulate_issues',
  privileges: [
    /************************ WRITE AND UPDATE PRIVILEGES *************************/
    // Of course the role needs to create, update & delete an issue
    {
      resource: Collection('issues'),
      actions: { create: true, write: true },
    },
    /************************ READ PRIVILEGES *************************/
    {
      resource: Collection('issues'),
      actions: { read: true },
    },
    {
      resource: Index('all_issues'),
      actions: { read: true },
    },
  ],
});

export {
  CreateFnRoleRegister,
  CreateFnRoleLogin,
  CreateFnRoleManipulateIssue,
  CreateBootstrapRole,
  CreateLoggedInRole,
};
