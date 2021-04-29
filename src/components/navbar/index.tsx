/** @jsxImportSource @emotion/react */
import { theme } from 'theme';
import { ModeToggle } from 'containers';

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
        <ModeToggle />
      </nav>
    </div>
  );
}

export { Navbar };
