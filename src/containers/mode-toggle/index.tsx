import * as React from 'react';
import styled from '@emotion/styled';
import { theme } from 'core/theme';
import { useLocalStorageState } from 'core/hooks';
import { Sun, Moon } from 'components/icons';

const StyledButton = styled.button`
  cursor: pointer;
  width: ${theme.sizes[10]};
  height: ${theme.sizes[10]};
  background: inherit;
  color: inherit;
  border: none;
  padding: ${theme.space[1]};
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ModeToggle() {
  const [theme, setTheme] = useLocalStorageState('theme', 'light');
  const nextTheme = theme === 'light' ? 'dark' : 'light';

  React.useEffect(() => {
    document.body.dataset.theme = theme;
  }, [theme]);

  return (
    <StyledButton
      aria-label="Toggle colour mode"
      onClick={() => setTheme(nextTheme)}
    >
      {nextTheme === 'light' ? <Sun /> : <Moon />}
    </StyledButton>
  );
}

export { ModeToggle };
