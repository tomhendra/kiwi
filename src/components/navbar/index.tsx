/** @jsxImportSource @emotion/react */
import { theme } from 'theme';
import { Button } from 'components';
import { ModeToggle } from 'containers';
import { CreateItem } from 'containers/create-item';

function Navbar() {
  return (
    <div
      css={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <nav
        css={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          '&& > * + *': {
            marginLeft: theme.space[2],
          },
        }}
      >
        <div>
          <CreateItem
            modalOpenButton={<Button variant="primary">Create</Button>}
          />
        </div>
        <ModeToggle />
      </nav>
    </div>
  );
}

export { Navbar };
