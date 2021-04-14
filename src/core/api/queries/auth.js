import { flattenDataKeys } from '../helpers/utils';
import faunadb from 'faunadb';
const q = faunadb.query;
const { Call, Function: Fn } = q;

function RegisterUser(client, email, password) {
  return client
    .query(Call(Fn('register'), email, password))
    .then(res => flattenDataKeys(res));
}

function LoginUser(client, email, password) {
  return client
    .query(Call(Fn('login'), email, password))
    .then(res => flattenDataKeys(res));
}

export { RegisterUser, LoginUser };
