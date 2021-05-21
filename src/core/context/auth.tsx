import * as React from 'react';
import { Auth } from 'aws-amplify';
import { useAsync } from 'core/hooks';
import { FullPageSpinner } from 'components';
import { QueryCache } from 'react-query';

// TODO: Amplify Hub / setAuthListener ??
// TODO: types for Amplify auth ??
interface AuthContextTypes {
  user: any;
  signIn: any;
  signUp: any;
  confirmSignUp: any;
  signOut: any;
}

const defaultAuthContext: AuthContextTypes = {
  user: '',
  signIn: null,
  signUp: null,
  confirmSignUp: null,
  signOut: null,
};

const AuthContext = React.createContext(defaultAuthContext);
AuthContext.displayName = 'AuthContext';

function AuthProvider(props: any) {
  const {
    data: user,
    setData: setUser,
    error,
    isLoading,
    isIdle,
    isSuccess,
    isError,
    run,
  } = useAsync();

  const queryCache = new QueryCache({
    onError: error => console.log({ error }),
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

  if (isLoading || isIdle) {
    return <FullPageSpinner />;
  }

  if (isError) {
    console.error(error);
  }

  if (isSuccess) {
    const value = { user, signIn, signUp, confirmSignUp, signOut };
    console.log({ user });

    return <AuthContext.Provider value={value} {...props} />;
  }

  return null;
}

function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }
  return context;
}

export { AuthProvider, useAuth };
