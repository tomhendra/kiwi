require('dotenv').config({ path: '.env.' + process.argv[2] });
var fs = require('fs');
const path = require('path');
const sourcePath = path.resolve(__dirname, '../.env.local');
const { parse, stringify } = require('envfile');

const { setupDatabase } = require('./../src/core/api/setup/database');
const { handleSetupError } = require('./../src/core/api/helpers/errors');

const faunadb = require('faunadb');
const q = faunadb.query;
const { CreateKey, Role, Exists, Database, CreateDatabase, If } = q;

async function setup() {
  const childDbName = process.env.REACT_APP_LOCAL___CHILD_DB_NAME;
  let adminKey = process.env.REACT_APP_LOCAL___ADMIN;

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
      '4.  -- Keys                    -- Bootstrap key to start the app',
    );

    const clientKey = await handleSetupError(
      client.query(CreateKey({ role: Role('keyrole_calludfs') })),
      'token - bootstrap',
    );
    if (clientKey) {
      console.log(
        `The client token to bootstrap the application will be automatically installed in .env.local with the key
         REACT_APP_LOCAL___BOOTSTRAP_FAUNADB_KEY. React will load the .env vars on restart: Don't forget to restart!`,
      );

      const json = parse(fs.readFileSync(sourcePath));
      json.REACT_APP_LOCAL___BOOTSTRAP_FAUNADB_KEY = clientKey.secret;
      fs.writeFileSync(sourcePath, stringify(json));

      console.log(
        '\x1b[33m%s\x1b[0m',
        `REACT_APP_LOCAL___BOOTSTRAP_FAUNADB_KEY=${clientKey.secret}`,
      );
    }
  } catch (err) {
    console.error('\x1b[31m', 'Unexpected error:', err);
  }
}

setup();
