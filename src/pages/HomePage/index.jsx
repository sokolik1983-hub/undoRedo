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
      <div className={styles.pos}>
        <Substruct />
      </div>
      <div className={styles.posFavorites}>
        <SubstructFavorites />
      </div>
      <div className={styles.posApps}>
        <SubstructApps />
      </div>

      <div className={styles.wrapper}>
        <p style={{ margin: '26px 26px 26px 36px', width: '180px' }}>Недавние</p>
        <div className={styles.section}>
          <HomePageButton title="Отчет 1" def />
          <HomePageButton title="Отчет 2" def />
          <HomePageButton title="Отчет 3" def />
        </div>
      </div>

      <div className={styles.wrapperFavorites}>
        <p style={{ margin: '26px 26px 26px 36px', width: '180px'}}>Избранное</p>
        <div className={styles.section}>
          <HomePageButton title="Отчет 1" def />
        </div>
      </div>

      <div className={styles.wrapperApps}>
        <p style={{margin: '26px 26px 26px 36px', width: '180px'}}>Приложения</p>
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
