/** @jsxImportSource @emotion/react */
import { ModeToggle } from 'containers';
import { theme } from 'core/theme';

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
