import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import styles from './Layout.module.scss';
import Notifications from '../common/components/Notifications';
import PopupDispatcher from './components/PopupDispatcher';
import TopBar from './components/TopBar';

function Layout() {
  const notifications = useSelector(state => state.app.notifications.items);
  const isLoginPage = useSelector(state => state.app.ui.currentPage) === '';
  return (
    <div className={styles.root}>
      <div className={styles.background_image} />
      <main className={styles.content}>
        {!isLoginPage && <TopBar />}
        <Outlet />
      </main>
      <PopupDispatcher />
      {/* Разблокируем элементы интерфейса, если нет модального окна */}
      {notifications.length !== 0 && <Notifications />}
    </div>
  );
}

export default Layout;
