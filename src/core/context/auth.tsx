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
    // TODO: Move Auth.currentAuthenticatedUser() outside of useEffect
    // so the req is made before the component mounts, calling the function at
    // the same time that the AuthProvider is defined.
    // ? project data can also be cached at the same time with React Query
    // use staleTime to prevent React Query from updating the cache for 5 secs
    // so the components have time to render without React Query assuming the
    // data is stale and updating the cache automatically triggering another req.
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
  // the value is created during render inside the component body, so
  // whenever the Provider is re-rendered, all consumers will re-render too.
  // we memoize the value for context to prevent this behaviour.
  // but because the functions themselves are also created within the
  // component body, they would trigger the value to update since they are
  // dependencies, so all of them need to be memoized also with useCallback.
  // Now a re-render will only happen when the user changes, since that is the
  // only thing that can change between re-renders, being the only managed state.
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
