import Loader from 'react-loader-spinner';

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import styles from './Loader.module.css';

export default function LoaderComponent() {
  return (
    <div className={styles.loaderWrap}>
      <Loader type="Bars" color="#00BFFF" height={175} width={175} />
    </div>
  );
}
