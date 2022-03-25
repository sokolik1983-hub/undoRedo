import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Divider from '../../../common/components/Divider';
import styles from './Filters.module.scss';
import { ReactComponent as Arrow } from '../../../layout/assets/queryPanel/arrowBold.svg';
import { ReactComponent as Basket } from '../../../layout/assets/queryPanel/basket.svg';

const Filters = ({ title }) => {
  return (
    <div className={styles.wrapper}>
      <Divider color='#FFFFFF' />
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.title}>{title}</div>
          <div className={styles.icons}>
            <Arrow className={styles.iconsIndents} />
            <Arrow className={clsx(styles.iconsIndents, styles.rotate)} />
            <Basket className={styles.iconsIndents} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;

Filters.propTypes = {
  title: PropTypes.string
};