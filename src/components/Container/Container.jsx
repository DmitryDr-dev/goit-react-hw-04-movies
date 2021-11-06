// package import
import PropTypes from 'prop-types';

// styles import
import styles from './Container.module.css';

// export default function name(){}
export default function Container({ children }) {
  return <div className={styles.container}>{children}</div>;
}

Container.propTypes = {
  children: PropTypes.array.isRequired,
};
