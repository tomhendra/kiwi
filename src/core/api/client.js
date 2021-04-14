import faunadb from 'faunadb';

const client = new faunadb.Client({
  secret:
    process.env.REACT_APP_LOCAL___BOOTSTRAP_FAUNADB_KEY || 'KEY NOT FOUND',
});

const q = faunadb.query;

export { client, q };
