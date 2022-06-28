import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styles from './Main.module.scss';
import { setCurrentPage } from '../../../data/reducers/ui';
import { PAGE } from '../../../common/constants/pages';

function AdminMain() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setCurrentPage(PAGE.ADMIN));
  }, []);
  return (
    <div className={styles.root}>
      <h1> Данный модуль находится в стадии разработки </h1>
    </div>
  );
}

export default AdminMain;
