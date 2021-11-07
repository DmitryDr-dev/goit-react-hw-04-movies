import { NavLink } from 'react-router-dom';

import styles from './Navigation.module.css';

export default function Navigation() {
  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        <li className={styles.navListItem}>
          <NavLink
            to="/"
            exact
            className={styles.navLink}
            activeClassName={styles.activeNavLink}
          >
            HomePage
          </NavLink>
        </li>
        <li className={styles.navListItem}>
          <NavLink
            to="/movies"
            className={styles.navLink}
            activeClassName={styles.activeNavLink}
          >
            Movies
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
