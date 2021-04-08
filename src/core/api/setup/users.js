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
} = q;

// collection
const CreateUsersCollection = CreateCollection({ name: 'users' });

// indexes
const CreateIndexAllUsers = CreateIndex({
  name: 'all_users',
  source: Collection('users'),
  // this is the default collection index, no terms or values are provided
  // which means the index will sort by reference and return only the reference.
  serialized: true,
});

// deletion
const DeleteAllUsers = If(
  Exists(Index('all_users')),
  q.Map(Paginate(Match(Index('all_users'))), Lambda('ref', Delete(Var('ref')))),
  true,
);

async function createUsersCollection(client) {
  await handlePromiseError(
    client.query(If(Exists(Collection('users')), true, CreateUsersCollection)),
    'Creating users collection',
  );
  await handlePromiseError(
    client.query(If(Exists(Index('all_users')), true, CreateIndexAllUsers)),
    'Creating all_users index',
  );
}

export { createUsersCollection, DeleteAllUsers };
