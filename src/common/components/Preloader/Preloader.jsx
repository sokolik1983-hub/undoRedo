import PreloaderIcon from '../../../layout/assets/preloaderIcon.svg';
import styles from './Preloader.module.scss';

const Preloader = () => {
  return (
    <div className={styles.preloader}>
      <PreloaderIcon className={styles.logo} />
    </div>
  );
};

export default Preloader;
