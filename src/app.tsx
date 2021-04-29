/** @jsxImportSource @emotion/react */
import * as React from 'react';
import { useAsync } from 'hooks';
import { UnauthenticatedApp } from './app-unauthenticated';
import { AuthenticatedApp } from './app-authenticated';
import { Auth, DataStore } from 'aws-amplify';
import { FullPageSpinner } from 'components';

// ------------ DEBUGGER -------------
import Amplify from 'aws-amplify';
Amplify.Logger.LOG_LEVEL = 'DEBUG';
// -----------------------------------

function App() {
  const {
    data: user,
    setData: setUser,
    error,
    isLoading,
    isIdle,
    isError,
    run,
  } = useAsync();

  React.useEffect(() => {
    run(Auth.currentAuthenticatedUser());
  }, [run]);

  const signIn = (username: string, password: string) =>
    Auth.signIn(username, password).then(user => setUser(user));

  const signUp = (username: string, password: string, email: string) =>
    Auth.signUp({ username, password, attributes: { email } });

  const confirmSignUp = (username: string, authCode: string) =>
    Auth.confirmSignUp(username, authCode); // TODO: Can user be set from here?

  async function signOut() {
    await Auth.signOut();
    await DataStore.clear();
    setUser(null);
  }

  if (isLoading || isIdle) {
    return <FullPageSpinner />;
  }

  if (isError) {
    console.error(error);
  }

  if (user) {
    return <AuthenticatedApp user={user} signOut={signOut} />;
  }

  return (
    <UnauthenticatedApp
      signIn={signIn}
      signUp={signUp}
      confirmSignUp={confirmSignUp}
    />
  );
}

export default App;
