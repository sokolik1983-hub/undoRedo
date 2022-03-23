import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styles from './Roles.module.scss';
import { setCurrentPage } from '../../data/reducers/ui';
import { PAGE } from '../../common/constants/pages';

function Roles() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setCurrentPage(PAGE.ROLES));
  }, []);
  return (
    <div className={styles.root}>
      <h1> Данный модуль находится в стадии разработки </h1>
    </div>
  );
}

export default Roles;
