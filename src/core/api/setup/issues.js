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
const CreateIssuesCollection = CreateCollection({ name: 'issues' });

/* indices */
const CreateIndexAllIssues = CreateIndex({
  name: 'all_issues',
  source: Collection('issues'),
  // this is the default collection index, no terms or values are provided
  // which means the index will sort by reference and return only the reference.
  serialized: true,
});

/* deletion */
const DeleteAllIssues = If(
  Exists(Index('all_issues')),
  Mp(Paginate(Match(Index('all_issues'))), Lambda('ref', Delete(Var('ref')))),
  true,
);

/* main */
async function createIssuesCollection(client) {
  await handlePromiseError(
    client.query(
      If(Exists(Collection('issues')), true, CreateIssuesCollection), // should the second argument be false??
    ),
    'Creating issues collection',
  );
  await handlePromiseError(
    client.query(If(Exists(Index('all_issues')), true, CreateIndexAllIssues)), // should the second argument be false??
    'Creating all_issues index',
  );
}

export { createIssuesCollection, DeleteAllIssues };
