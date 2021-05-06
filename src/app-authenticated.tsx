/** @jsxImportSource @emotion/react */
import { Routes, Route } from 'react-router-dom';
import { DashboardScreen, ProjectScreen, NotFoundScreen } from 'screens';
import { Layout, Navbar } from 'components';
import { User } from 'models/user';

interface Props {
  user: User;
  signOut: () => void;
}

function AuthenticatedApp({ user, signOut }: Props) {
  return (
    <Layout
      nav={<Navbar user={user} signOut={signOut} />}
      footer={<p>&copy; Búho 2021</p>}
    >
      <AppRoutes />
    </Layout>
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
