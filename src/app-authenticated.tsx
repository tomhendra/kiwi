/** @jsxImportSource @emotion/react */
import { User } from 'models';
import { Button, Layout } from 'components';

interface Props {
  user: User;
  signOut: any;
}

function AuthenticatedApp({ user, signOut }: Props) {
  return (
    <Layout>
      <p>Hello, {user.username}</p>
      <Button variant="primary" onClick={signOut}>
        Sign Out
      </Button>
    </Layout>
  );
}

export { AuthenticatedApp };
