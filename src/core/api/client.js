import faunadb from 'faunadb';

const client = new faunadb.Client({
  secret: process.env.REACT_APP_LOCAL___ADMIN || 'KEY NOT FOUND',
});

const q = faunadb.query;

export { client, q };
