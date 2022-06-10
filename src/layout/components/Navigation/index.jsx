import clsx from 'clsx';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link as RouterLink} from 'react-router-dom';

import {showNav} from '../../../data/reducers/ui';
import navigationMenu from '../../../navigation';
import styles from './Navigation.module.scss';

function Navigation() {
    const isNavShowing = useSelector((state) => state.app.ui?.isNavShowing);
    const dispatch = useDispatch();

    function handleHideMenu() {
        dispatch(showNav(false));
    }

    function handleClick() {
        dispatch(showNav(false));
    }

    return (
        <>
            <div className={clsx(styles.root, {[styles.opened]: isNavShowing})}>
                {navigationMenu &&
                    navigationMenu.map((menuItem) => (
                        <RouterLink
                            to={menuItem.href}
                            key={menuItem.id}
                            className={styles.link}
                            onClick={handleClick}
                        >
                            <div className={styles.menuItem}>
                                <div className={styles['menuItemIcon']}>
                                    {menuItem.icon}
                                </div>
                                <div className={styles['menuItemText']}>
                                    {menuItem.title}
                                </div>
                            </div>
                        </RouterLink>
                    ))}
            </div>
            {isNavShowing && (
                <div className={styles.overlay} onClick={handleHideMenu} />
            )}
        </>
    );
}

export default Navigation;
