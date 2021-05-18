/** @jsxImportSource @emotion/react */
import { ModeToggle, CreateProject } from 'containers';
import { NavLink, Button } from 'components';
import { User } from 'core/models';
import { theme } from 'core/theme';
import styled from '@emotion/styled';

const StyledNav = styled.nav({
  display: 'flex',
  justifyContent: 'space-between',
});

const StyledNavLinksGroup = styled.div({
  display: 'flex',
  alignItems: 'center',
});

interface Props {
  user: User;
  signOut: () => void;
}

function Navbar({ user, signOut }: Props) {
  return (
    <div>
      <StyledNav>
        <StyledNavLinksGroup css={{ width: theme.sizes['1/3'] }}>
          <NavLink to="/dashboard">Dashboard</NavLink>
          <CreateProject />
        </StyledNavLinksGroup>
        <StyledNavLinksGroup>
          <p>{user.username}</p>
          <Button
            variant="secondary"
            onClick={signOut}
            css={{ marginRight: theme.space[2] }}
          >
            Sign Out
          </Button>
          <ModeToggle />
        </StyledNavLinksGroup>
      </StyledNav>
    </div>
  );
}

export { Navbar };
