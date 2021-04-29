/** @jsxImportSource @emotion/react */
import { User } from 'models/user';
import { Button, Layout } from 'components';
import { Dashboard } from 'screens';
import { CreateProject } from 'containers/create-project';
import { theme } from 'theme';

interface Props {
  user: User;
  signOut: any;
}

function AuthenticatedApp({ user, signOut }: Props) {
  return (
    <Layout>
      <p>Hello, {user.username}</p>
      <CreateProject />
      <Button
        variant="secondary"
        onClick={signOut}
        css={{ marginRight: theme.space[2] }}
      >
        Sign Out
      </Button>
      <Dashboard />
    </Layout>
  );
}

export { AuthenticatedApp };
