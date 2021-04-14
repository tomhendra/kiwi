import { handlePromiseError } from '../helpers/errors';
import faunadb from 'faunadb';
const q = faunadb.query;
const {
  CreateCollection,
  CreateIndex,
  If,
  Exists,
  Index,
  Collection,
  Paginate,
  Match,
  Lambda,
  Var,
  Delete,
  Map: Mp,
} = q;

/* collections */
const CreateUsersCollection = CreateCollection({ name: 'users' });

/* indices */
const CreateIndexAllUsers = CreateIndex({
  name: 'all_users',
  source: Collection('users'),
  // this is the default collection index, no terms or values are provided
  // which means the index will sort by reference and return only the reference.
  serialized: true,
});

const CreateIndexUsersByEmail = CreateIndex({
  name: 'users_by_email',
  source: Collection('users'),
  terms: [{ field: ['data', 'email'] }],
  unique: true,
});

/* deletion */
const DeleteAllUsers = If(
  Exists(Index('all_users')),
  Mp(Paginate(Match(Index('all_users'))), Lambda('ref', Delete(Var('ref')))),
  true,
);

async function createUsersCollection(client) {
  await handlePromiseError(
    client.query(If(Exists(Collection('users')), true, CreateUsersCollection)), // should the second argument be false??
    'Creating users collection',
  );
  await handlePromiseError(
    client.query(If(Exists(Index('all_users')), true, CreateIndexAllUsers)), // should the second argument be false??
    'Creating all_users index',
  );
  await handlePromiseError(
    client.query(
      If(Exists(Index('users_by_email')), true, CreateIndexUsersByEmail),
    ), // should the second argument be false??
    'Creating users_by_email index',
  );
}

export { createUsersCollection, DeleteAllUsers };
