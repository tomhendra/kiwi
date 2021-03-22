import * as React from 'react';
import { Sun, Moon } from './components';
import { useLocalStorageState } from 'hooks';
import styles from './index.module.css';

export function ModeToggle() {
  const [theme, setTheme] = useLocalStorageState('theme', 'light');
  const nextTheme = theme === 'light' ? 'dark' : 'light';

  React.useEffect(() => {
    document.body.dataset.theme = theme;
  }, [theme]);

  return (
    <button
      className={styles.button}
      aria-label="Toggle colour mode"
      onClick={() => setTheme(nextTheme)}
    >
      {nextTheme === 'light' ? <Sun /> : <Moon />}
    </button>
  );
}
