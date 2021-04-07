require('dotenv').config({ path: '.env.' + process.argv[2] });
var fs = require('fs');
const envfile = require('envfile');
const sourcePath = '.env.local';

const { setupDatabase } = require('../src/core/api/setup/database');
const { handleSetupError } = require('../src/core/api/helpers/errors');

const faunadb = require('faunadb');
const q = faunadb.query;
const { CreateKey, Role, Exists, Database, CreateDatabase, If } = q;

async function setup() {
  // In order to set up a database, we need a admin key
  let adminKey = process.env.REACT_APP_LOCAL___ADMIN;
  // If this option is provided, the db will be created as a child db of the database
  // that the above admin key belongs to. This is useful to destroy/recreate a database
  // easily without having to wait for cache invalidation of collection/index names.
  const childDbName = process.env.REACT_APP_LOCAL___CHILD_DB_NAME;

  let client = new faunadb.Client({ secret: adminKey });

  if (typeof childDbName === 'undefined' || childDbName === '') {
    console.error(
      'A child database name is required for the environment variable REACT_APP_LOCAL___CHILD_DB_NAME in env.local',
    );
  }

  await handleSetupError(
    client.query(
      If(
        Exists(Database(childDbName)),
        false,
        CreateDatabase({ name: childDbName }),
      ),
    ),
    'database - create child database',
  );

  const key = await handleSetupError(
    client.query(CreateKey({ database: Database(childDbName), role: 'admin' })),
    'Admin key - child db',
  );

  client = new faunadb.Client({ secret: key.secret });

  try {
    await setupDatabase(client);

    console.log(
      '6.  -- Keys                    -- Bootstrap key to start the app',
    );

    const clientKey = await handleSetupError(
      client.query(CreateKey({ role: Role('keyrole_calludfs') })),
      'token - bootstrap',
    );
    if (clientKey) {
      console.log(
        '\x1b[32m',
        `The client token to bootstrap your application will be automatically installed 
         in .env.local with the key REACT_APP_LOCAL___BOOTSTRAP_FAUNADB_KEY. 
         React will load the .env vars on restart: Don't forget to restart!`,
      );

      const json = envfile.parseFileSync(sourcePath);

      json.REACT_APP_LOCAL___BOOTSTRAP_FAUNADB_KEY = clientKey.secret;
      fs.writeFileSync(sourcePath, envfile.stringifySync(json));
      console.log('\x1b[33m%s\x1b[0m', clientKey.secret);
    }
  } catch (err) {
    console.error('Unexpected error', err);
  }
}

setup();
