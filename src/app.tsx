/** @jsxImportSource @emotion/react */
import { UnauthenticatedApp } from './app-unauthenticated';
import { AuthenticatedApp } from './app-authenticated';
import { useAuth } from 'core/context/auth';

// ------------ DEBUGGER -------------
// import Amplify from 'aws-amplify';
// Amplify.Logger.LOG_LEVEL = 'DEBUG';

function App() {
  const { user } = useAuth();
  return user ? <AuthenticatedApp /> : <UnauthenticatedApp />;
}

export default App;
