import React from 'react';

import styles from './InlinePreloader.module.scss';

const InlinePreloader = () => {
  return (
    <div className={styles.gooey}>
      <span className={styles.dot} />
      <div className={styles.dots}>
        <span />
        <span />
        <span />
      </div>
    </div>
  );
};

export default InlinePreloader;
