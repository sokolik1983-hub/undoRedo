import clsx from 'clsx';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import FloatingButton from '../../common/components/FloatingButton';
import { REDIRECT_LINKS } from '../../common/constants/common';
import { PAGE } from '../../common/constants/pages';
import { getFavoriteObjects } from '../../data/actions/app';
import { setObjectFavoriteStatus } from '../../data/actions/app';
import { setCurrentPage } from '../../data/reducers/ui';
import ExplorerIcon from '../../layout/assets/icons/buttonPlus.svg';
import navigationMenu from '../../navigation';
import FavoritesList from './Favorites/FavoritesList.jsx';
import styles from './HomePage.module.scss';
import HomePageButton from './HomePageButton/HomePageButton';

const RECENTS = [
  {
    id: 1,
    title: 'Слой 1 о проделанной работе с мая месяца текущего года',
    kind: 'SL',
  },
  { id: 2, title: 'Отчет 2', kind: 'REP' },
  { id: 3, title: 'Отчет 3', kind: 'REP' },
];

function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setCurrentPage(PAGE.DASHBOARD));
    dispatch(getFavoriteObjects());
  }, []);

  const handleReportCreate = () => {
    navigate(REDIRECT_LINKS.REPORT_CREATE);
  };

  return (
    <div className={styles.root}>
      <div
        className={clsx(styles.row, styles.recentBG, styles.whiteLineShadow)}
      >
        <div className={clsx(styles.whiteLine)} />
        <p className={styles.rowTitle}>Недавние</p>
        <div className={styles.section}>
          {RECENTS.map((item) => (
            <HomePageButton
              key={item.id}
              title={item.title}
              hasTooltip
              kind={item.kind}
            />
          ))}
        </div>
      </div>

      <FavoritesList />

      <div className={clsx(styles.row, styles.appsBG, styles.whiteLineShadow)}>
        <div className={clsx(styles.whiteLine3)} />
        <p className={styles.rowTitle}>Приложения</p>
        <div className={clsx(styles.section, styles.apps)}>
          {navigationMenu &&
            navigationMenu.map((item) => {
              return (
                <HomePageButton
                  key={item.id}
                  title={item.title}
                  href={item.href}
                  icon={item.icon}
                  appNameText
                />
              );
            })}
        </div>
      </div>

      <FloatingButton
        icon={<ExplorerIcon />}
        text="Создать отчет"
        onClick={handleReportCreate}
      />
    </div>
  );
}

export default HomePage;
