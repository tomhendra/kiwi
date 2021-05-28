import * as React from 'react';
import { Auth } from 'aws-amplify';
import { useAsync } from 'core/hooks';
import { QueryCache } from 'react-query';
import { FullPageSpinner } from 'components';
// import { Hub } from 'aws-amplify';

/*
Hub.listen('auth', (data: any) => {
  switch (data.payload.event) {
    case 'signIn':
      console.log('user signed in');
      break;
    case 'signUp':
      console.log('user signed up');
      break;
    case 'signOut':
      console.log('user signed out');
      break;
    case 'signIn_failure':
      console.error('user sign in failed');
      break;
    case 'tokenRefresh':
      console.log('token refresh succeeded');
      break;
    case 'tokenRefresh_failure':
      console.error('token refresh failed');
      break;
    case 'configured':
      console.log('the Auth module is configured');
  }
});
*/

// TODO: types for Amplify auth ??
interface AuthContextTypes {
  user: any;
  signIn: any;
  signUp: any;
  confirmSignUp: any;
  signOut: any;
}

const defaultAuthContext: AuthContextTypes = {
  user: null,
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
    isError,
    run,
  } = useAsync();

  const queryCache = React.useMemo(
    () =>
      new QueryCache({
        onError: error => console.log({ error }),
      }),
    [],
  );

  React.useEffect(() => {
    // currentAuthenticatedUser resolves to CognitoUser (same as signIn)
    run(Auth.currentAuthenticatedUser());
  }, [run]);
  // signIn, signUp, confirmSignUp & signOut are 'run' where they are needed
  // using separate, memoized instances of run via useAsync. this makes it
  // easier to feedback errors tidily within the relevant form fields.
  const signIn = React.useCallback(
    async function signIn(username: string, password: string) {
      const user = await Auth.signIn(username, password);
      // we use setUser as we are not making use of useAsync (run) here.
      setUser(user);
    },
    [setUser],
  );

  const signUp = React.useCallback(
    async function signUp(username: string, password: string, email: string) {
      const { codeDeliveryDetails, user, userConfirmed, userSub } =
        await Auth.signUp({
          username,
          password,
          attributes: { email },
        });
      // we expose userConfirmed as part of the user data for reasoning about.
      // we use setUser as we are not making use of useAsync (run) here.
      setUser({
        codeDeliveryDetails,
        userConfirmed,
        userSub,
        ...user,
      });
    },
    [setUser],
  );

  const confirmSignUp = React.useCallback(
    async function confirmSignUp(username: string, authCode: string) {
      const result = await Auth.confirmSignUp(username, authCode);
      if (result === 'SUCCESS') {
        setUser({ ...user, userConfirmed: true });
      }
    },
    [setUser, user],
  );

  const signOut = React.useCallback(
    async function signOut() {
      // successfully resolves to: undefined... ¯\_(ツ)_/¯
      await Auth.signOut();
      queryCache.clear();
      setUser(null);
    },
    [queryCache, setUser],
  );
  // memoize the value for context
  const value = React.useMemo(
    () => ({
      user,
      signIn,
      signUp,
      confirmSignUp,
      signOut,
    }),
    [user, signIn, signUp, confirmSignUp, signOut],
  );

  if (isLoading || isIdle) {
    return <FullPageSpinner />;
  }

  if (isError) {
    console.error(error);
  }

  return <AuthContext.Provider value={value} {...props} />;
}

function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }
  return context;
}

export { AuthProvider, useAuth };
