import React from 'react';
import { useSelector } from 'react-redux';
import { PAGE_TITLES } from '../../../../common/constants/common';
import styles from './PageDescription.module.scss';

function PageDescription() {
  const ui = useSelector(state => state.app.ui);

  return <div className={styles.root}>{PAGE_TITLES[ui?.currentPage]}</div>;
}

export default PageDescription;
