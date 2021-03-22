import { Navbar } from 'components/navbar';
import { Children } from 'types';
import styles from './index.module.css';

interface Props {
  children?: Children;
}

export function Layout({ children }: Props) {
  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <div className={styles.container}>
          <Navbar />
        </div>
      </header>
      <main className={styles.main}>
        <div className={styles.container}>{children}</div>
      </main>
      <footer className={styles.footer}>
        <div className={styles.container}>Footer</div>
      </footer>
    </div>
  );
}
