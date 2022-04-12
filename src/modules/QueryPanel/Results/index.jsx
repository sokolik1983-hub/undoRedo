import React from 'react';
import PropTypes from 'prop-types';
import Divider from '../../../common/components/Divider';
import styles from './Results.module.scss';
import { ReactComponent as Reload } from '../../../layout/assets/queryPanel/reload.svg';

const Results = ({ title }) => {
  return (
    <div className={styles.wrapper}>
      <Divider color='#FFFFFF' />
      <div className={styles.top}>
        <div className={styles.title}>{title}</div>
        <div className={styles.icon}>
          <div className={styles.reloadWrapper}>
            <Reload className={styles.reloadIcon} />
            <div className={styles.hide}>
              <p className={styles.reload}>обновить</p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.content} />
    </div>
  );
};

export default Results;

Results.propTypes = {
  title: PropTypes.string
};