import faunadb from 'faunadb';

const client = new faunadb.Client({
  secret: process.env.FAUNADB_ADMIN_KEY || 'KEY NOT FOUND',
});

const q = faunadb.query;

export { client, q };
