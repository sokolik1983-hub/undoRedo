import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import HomePageButton from './HomePageButton/HomePageButton';
import Substruct from '../../layout/assets/Substract';
import SubstructFavorites from '../../layout/assets/SubstructFavorites';
import SubstructApps from '../../layout/assets/SubstructApps';
import styles from './HomePage.module.scss';
import { setCurrentPage } from '../../data/reducers/ui';
import { DASHBOARD_PAGE } from '../../common/constants/pages';
import navigationMenu from '../../navigation';

function HomePage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentPage(DASHBOARD_PAGE));
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.recentSubstractPosition}>
        <Substruct />
      </div>
      <div className={styles.favoritesSubstractPosition}>
        <SubstructFavorites />
      </div>
      <div className={styles.appsSubstractPosition}>
        <SubstructApps />
      </div>

      <div className={styles.recentWrapper}>
        <p>Недавние</p>
        <div className={styles.section}>
          <HomePageButton title="Отчет 1" isDocument />
          <HomePageButton title="Отчет 2" isDocument />
          <HomePageButton title="Отчет 3" isDocument />
        </div>
      </div>

      <div className={styles.favoritesWrapper}>
        <p>Избранное</p>
        <div className={styles.section}>
          <HomePageButton title="Отчет 1" isDocument />
        </div>
      </div>

      <div className={styles.appsWrapper}>
        <p>Приложения</p>
        <div className={styles.section}>
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
    </div>
  );
}

export default HomePage;
