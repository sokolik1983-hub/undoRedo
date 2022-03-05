import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentPage } from '../../data/reducers/ui';
import { PAGE } from '../../common/constants/pages';
import styles from './Users.module.scss';

function Users() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setCurrentPage(PAGE.USERS));
  }, []);
  return <div className={styles.root}>Users Content</div>;
}

export default Users;
