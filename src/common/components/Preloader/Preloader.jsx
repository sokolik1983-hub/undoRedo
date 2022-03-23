import styles from './Preloader.module.scss';
import { ReactComponent as PreloaderIcon } from '../../../layout/assets/preloaderIcon.svg';

const Preloader = () => {
  return (
    <div className={styles.preloader}>
      <PreloaderIcon className={styles.logo} />
    </div>
  );
};

export default Preloader;
