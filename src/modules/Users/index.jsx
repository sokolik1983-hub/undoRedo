import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentPage } from '../../data/reducers/ui';
import { PAGE } from '../../common/constants/pages';
import styles from './Users.module.scss';
import ShemaEditorBlock from '../Symlayers/SchemaEditorBlock';

function Users() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setCurrentPage(PAGE.USERS));
  }, []);
  return (
    <div className={styles.root}> 
      
      <ShemaEditorBlock />
     
    </div>
);
}

export default Users;
