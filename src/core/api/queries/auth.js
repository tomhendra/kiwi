import faunadb from 'faunadb';
const q = faunadb.query;
const { Create, Collection, Login, Match, Index } = q;

/*
 * The following functions return an FQL (Fauna Query Language) statement that we will store in a UDF (User defined Function).
 * (this happens in ../setup/functions)
 */

function RegisterUser(email, password) {
  return Create(Collection('users'), {
    credentials: { password: password },
    data: { email: email },
  });
}

function LoginUser(email, password) {
  return Login(Match(Index('users_by_email'), email), {
    password: password,
  });
}

export { RegisterUser, LoginUser };
