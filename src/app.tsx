/** @jsxImportSource @emotion/react */
import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { useAsync } from 'core/hooks';
import { UnauthenticatedApp } from './app-unauthenticated';
import { AuthenticatedApp } from './app-authenticated';
import { FullPageSpinner } from 'components';
import { QueryCache } from 'react-query';

// ------------ DEBUGGER -------------
// import Amplify from 'aws-amplify';
// Amplify.Logger.LOG_LEVEL = 'DEBUG';

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

  const queryCache = new QueryCache({
    onError: error => {
      console.log(error);
    },
  });

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
    queryCache.clear();
    setUser(null);
  }

  const AuthenticatedAppProps = { user, signOut };
  const UnauthenticatedAppProps = { signIn, signUp, confirmSignUp };

  if (isLoading || isIdle) {
    return <FullPageSpinner />;
  }

  if (isError) {
    console.error(error);
  }

  return user ? (
    <Router>
      <AuthenticatedApp {...AuthenticatedAppProps} />
    </Router>
  ) : (
    <UnauthenticatedApp {...UnauthenticatedAppProps} />
  );
}

export default App;
