import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentPage } from '../../data/reducers/ui';
import { PAGE } from '../../common/constants/pages';
import styles from './Symlayers.module.scss';

function Symlayers() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setCurrentPage(PAGE.SEMANTIC));
  }, []);
  return <div className={styles.root}>Symlayers Content</div>;
}

export default Symlayers;
