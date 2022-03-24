import React from 'react';
import PropTypes from 'prop-types';
import Divider from '../../../common/components/Divider';
import styles from './Objects.module.scss';
import { ReactComponent as Filter } from '../../../layout/assets/queryPanel/filter.svg';
import { ReactComponent as Lists } from '../../../layout/assets/queryPanel/lists.svg';
import { ReactComponent as Basket } from '../../../layout/assets/queryPanel/basket.svg';

const Objects = ({ title }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.top}>
        <div className={styles.title}>{title}</div>
        <div className={styles.icons}>
          <Filter className={styles.iconsIndents} />
          <Lists className={styles.iconsIndents} />
          <Basket className={styles.iconsIndents} />
        </div>
      </div>
      <Divider color='#FFFFFF' />
    </div>
  );
};

export default Objects;

Objects.propTypes = {
  title: PropTypes.string
};