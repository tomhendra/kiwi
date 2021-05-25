import * as React from 'react';
import { Auth } from 'aws-amplify';
import { useAsync } from 'core/hooks';
import { QueryCache } from 'react-query';
import { FullPageSpinner } from 'components';
// import { Hub } from 'aws-amplify';

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
    /**
     * Auth.currentAuthenticatedUser returns a promise which resolves to a
     * CognitoUser (same as signIn)
     **/
    run(Auth.currentAuthenticatedUser());
  }, [run]);
  /**
   * signIn / signUp / confirmSignUp / signOut functions are run where they are
   * needed using separate instances of run via useAsync. this makes it easier
   * to feedback errors to the user tidily within the relevant form fields.
   **/
  const signIn = React.useCallback(
    (username: string, password: string) =>
      Auth.signIn(username, password).then(user => {
        console.log('signIn promise result: ', user);
        // promise resolves to CognitoUser
        // we use setUser as we are not making use of useAsync (run) here.
        setUser(user);
      }),
    [setUser],
  );

  const signUp = React.useCallback(
    (username: string, password: string, email: string) =>
      Auth.signUp({ username, password, attributes: { email } }).then(data => {
        console.log('signUp promise result: ', data);
        /**
         * Auth.signUp resolves to an object with four properties...
         *
         * codeDeliveryDetails: {AttributeName: "email", DeliveryMedium: "EMAIL", Destination: "t***@o***.com"},
         * user: CognitoUser: {...},
         * userConfirmed: false,
         * userSub: "83d6bf86-db7f-43da-8306-e931511fb580",
         *
         * ...we spread data and crucially expose userConfirmed as part of
         * the user data for reasoning about in the confirmation form.
         * we use setUser as we are not making use of useAsync (run) here.
         */
        setUser({ ...data });
      }),
    [setUser],
  );

  const confirmSignUp = React.useCallback(
    (username: string, authCode: string) => {
      Auth.confirmSignUp(username, authCode).then(
        data => console.log('confirmSignUp promise result: ', data),
        // successfully resolves to: SUCCESS
      );
    },
    [],
  );

  const signOut = React.useCallback(async () => {
    await Auth.signOut().then(
      data => console.log('signOut promise result: ', data),
      // successfully resolves to: undefined
    );
    queryCache.clear();
    setUser(null);
  }, [queryCache, setUser]);

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
