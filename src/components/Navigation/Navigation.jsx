// package import
import { NavLink } from 'react-router-dom';

// styles import
import styles from './Navigation.module.css';

export default function Navigation() {
  return (
    <nav className={styles.nav}>
      <NavLink
        exact
        to="/"
        className={styles.navLink}
        activeClassName={styles.activeNavLink}
      >
        Home
      </NavLink>
      <NavLink
        to="/movies"
        className={styles.navLink}
        activeClassName={styles.activeNavLink}
      >
        Movies
      </NavLink>
    </nav>
  );
}
