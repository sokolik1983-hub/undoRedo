import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import Notifications from '../common/components/Notifications';
import Toast from '../common/components/Toast/Toast';
import { setToastList } from '../data/reducers/ui';
import TopBar from './components/TopBar';
import styles from './Layout.module.scss';

function Layout() {
  const notifications = useSelector((state) => state.app.notifications.items);
  const isLoginPage = useSelector((state) => state.app.ui.currentPage) === '';
  const toastList = useSelector((state) => state.app.ui.toastList);

  return (
    <div className={styles.root}>
      <main className={styles.content}>
        <Toast toastList={toastList} setList={setToastList} />
        {!isLoginPage && <TopBar />}
        <Outlet />
      </main>
      {/* Разблокируем элементы интерфейса, если нет модального окна */}
      {notifications.length !== 0 && <Notifications />}
    </div>
  );
}

export default Layout;
