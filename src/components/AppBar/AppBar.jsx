// styles import
import Navigation from '../Navigation';

// components import
import styles from './AppBar.module.css';

export default function AppBar() {
  return (
    <header className={styles.header}>
      <Navigation />
    </header>
  );
}
