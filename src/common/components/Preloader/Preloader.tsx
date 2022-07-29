import React from 'react';

import PreloaderIcon from '../../../layout/assets/preloaderIcon.svg';
import styles from './Preloader.module.scss';

const Preloader = () => {
  return (
    <div className={styles.preloader}>
      <div className={styles.logo}>
        <PreloaderIcon />
      </div>
    </div>
  );
};

export default Preloader;
