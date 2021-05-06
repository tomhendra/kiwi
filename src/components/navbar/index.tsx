/** @jsxImportSource @emotion/react */
import { ModeToggle, CreateProject } from 'containers';
import { NavLink, Button } from 'components';
import { User } from 'models/user';
import { theme } from 'theme';

interface Props {
  user: User;
  signOut: () => void;
}

function Navbar({ user, signOut }: Props) {
  return (
    <div>
      <nav
        css={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <div
          css={{
            display: 'flex',
            alignItems: 'center',
            width: theme.sizes['1/3'],
          }}
        >
          <NavLink to="/dashboard">Dashboard</NavLink>
          <CreateProject />
        </div>
        <div
          css={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <p>{user.username}</p>
          <Button
            variant="secondary"
            onClick={signOut}
            css={{ marginRight: theme.space[2] }}
          >
            Sign Out
          </Button>
          <ModeToggle />
        </div>
      </nav>
    </div>
  );
}

export { Navbar };
