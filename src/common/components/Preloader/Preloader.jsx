import styles from './Preloader.module.scss';

const Preloader = () => {
  return (
    <div className={styles.preloader}>
      <span className={styles.preloaderText}>loading...</span>
    </div>
  );
};

export default Preloader;
