import { ModeToggle } from './components';
import styles from './index.module.css';

export function Navbar() {
  return (
    <nav className={styles.nav}>
      <ModeToggle />
    </nav>
  );
}
