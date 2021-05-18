/** @jsxImportSource @emotion/react */
import { Routes, Route } from 'react-router-dom';
import { DashboardScreen, ProjectScreen, NotFoundScreen } from 'screens';
import {
  Layout,
  Navbar,
  ErrorFallback,
  FullPageErrorFallback,
} from 'components';
import { User } from 'core/models';
import { ErrorBoundary } from 'react-error-boundary';

interface Props {
  user: User;
  signOut: () => void;
}

function AuthenticatedApp({ user, signOut }: Props) {
  return (
    <ErrorBoundary FallbackComponent={FullPageErrorFallback}>
      <Layout
        nav={<Navbar user={user} signOut={signOut} />}
        footer={<p>&copy; Búho 2021</p>}
      >
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <AppRoutes />
        </ErrorBoundary>
      </Layout>
    </ErrorBoundary>
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/dashboard" element={<DashboardScreen />} />
      <Route path="/projects/:projectId" element={<ProjectScreen />} />
      <Route path="*" element={<NotFoundScreen />} />
    </Routes>
  );
}

export { AuthenticatedApp };
