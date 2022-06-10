import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Outlet} from 'react-router-dom';

import Notifications from '../common/components/Notifications';
import Toast from '../common/components/Toast/Toast';
import {setToastList} from '../data/reducers/ui';
import PopupDispatcher from './components/PopupDispatcher';
import TopBar from './components/TopBar';
import styles from './Layout.module.scss';

function Layout() {
    const notifications = useSelector((state) => state.app.notifications.items);
    const isLoginPage = useSelector((state) => state.app.ui.currentPage) === '';
    const toastList = useSelector((state) => state.app.ui.toastList);
    const dispatch = useDispatch();

    return (
        <div className={styles.root}>
            <div className={styles.backgroundImage} />
            <main className={styles.content}>
                <Toast
                    toastlist={toastList}
                    setList={setToastList}
                    dispatch={dispatch}
                />
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
