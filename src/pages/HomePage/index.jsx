import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import HomePageButton from './HomePageButton/HomePageButton';
import styles from './HomePage.module.scss';
import { setCurrentPage } from '../../data/reducers/ui';
import { PAGE } from '../../common/constants/pages';
import navigationMenu from '../../navigation';
import { ReactComponent as ExplorerIcon } from '../../layout/assets/icons/button_plus.svg';
import FloatingButton from '../../common/components/FloatingButton';

const RECENTS = [
  { id: 1, title: 'Отчет 1' },
  { id: 2, title: 'Отчет 2' },
  { id: 3, title: 'Отчет 3' }
];

const FAVORITES = [
  { id: 1, title: 'Избранный Отчет 1' },
  { id: 2, title: 'Избранный Отчет 2' }
];

function HomePage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentPage(PAGE.DASHBOARD));
  }, []);

  const handleClick = () => {
    console.log('click create');
  };

  return (
    <div className={styles.root}>
      <div className={clsx(styles.row, styles.recent_bg)}>
        <p className={styles.rowTitle}>Недавние</p>
        <div className={styles.section}>
          {RECENTS.map(item => (
            <HomePageButton key={item.id} title={item.title} isDocument />
          ))}
        </div>
      </div>

      <div className={clsx(styles.row, styles.favorites_bg)}>
        <p className={styles.rowTitle}>Избранное</p>
        <div className={styles.section}>
          {FAVORITES.map(item => (
            <HomePageButton key={item.id} title={item.title} isDocument />
          ))}
        </div>
      </div>

      <div className={clsx(styles.row, styles.apps_bg)}>
        <p className={styles.rowTitle}>Приложения</p>
        <div className={clsx(styles.section, styles.apps)}>
          {navigationMenu &&
            navigationMenu.map(item => {
              return (
                <HomePageButton
                  title={item.title}
                  href={item.href}
                  icon={item.icon}
                />
              );
            })}
        </div>
      </div>

      <FloatingButton
        icon={<ExplorerIcon />}
        text="Создать отчет"
        onClick={handleClick}
      />
    </div>
  );
}

export default HomePage;
