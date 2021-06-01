import * as React from 'react';
import { useAuth } from 'core/context/auth';
import { FullPageSpinner } from 'components';
const UnauthenticatedApp = React.lazy(() => import('./app-unauthenticated'));
const AuthenticatedApp = React.lazy(
  () => import(/* webpackPrefetch: true */ './app-authenticated'),
);

// ------------ DEBUGGER -------------
// import Amplify from 'aws-amplify';
// Amplify.Logger.LOG_LEVEL = 'DEBUG';

function App() {
  const { user } = useAuth();

  return (
    <React.Suspense fallback={<FullPageSpinner />}>
      {user?.signInUserSession ? <AuthenticatedApp /> : <UnauthenticatedApp />};
    </React.Suspense>
  );
}

export default App;
