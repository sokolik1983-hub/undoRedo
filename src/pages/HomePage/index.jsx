import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import clsx from 'clsx';
import HomePageButton from './HomePageButton/HomePageButton';
import styles from './HomePage.module.scss';
import { setCurrentPage } from '../../data/reducers/ui';
import { PAGE } from '../../common/constants/pages';
import { REDIRECT_LINKS } from '../../common/constants/common';
import navigationMenu from '../../navigation';
import { ReactComponent as ExplorerIcon } from '../../layout/assets/icons/buttonPlus.svg';
import FloatingButton from '../../common/components/FloatingButton';
import InlinePreloader from '../../common/components/InlinePreloader/index';
import { getFavoriteObjects } from '../../data/actions/app';

const RECENTS = [
  { id: 1, title: 'Отчет 1 о проделанной работе с мая месяца текущего года' },
  { id: 2, title: 'Отчет 2' },
  { id: 3, title: 'Отчет 3' }
];

function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setCurrentPage(PAGE.DASHBOARD));
    dispatch(getFavoriteObjects());
  }, []);

  const { favoriteObjectsData, favoriteObjectsStatus } = useSelector(
    state => state.app.data.favoriteObjects
  );

  const isFavoritesLoading = favoriteObjectsStatus === 'LOADING';
  const isFavoritesFailed = favoriteObjectsStatus === 'FAILED';

  const handleClick = () => {
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
          {RECENTS.map(item => (
            <HomePageButton
              key={item.id}
              title={item.title}
              isDocument
              hasTooltip
            />
          ))}
        </div>
      </div>

      <div
        className={clsx(
          styles.row,
          styles.favoritesBG,
          styles.whiteLineShadow,
          isFavoritesLoading ? styles.inlinePreloaderWrapper : null,
          !isFavoritesLoading && isFavoritesFailed
            ? styles.favoritesPlaceholderWrapper
            : null
        )}
      >
        <div className={clsx(styles.whiteLine2)} />
        <p className={styles.rowTitle}>Избранное</p>
        <div className={styles.section}>
          {favoriteObjectsData.map(item => (
            <HomePageButton
              key={item.id}
              title={item.name}
              isDocument
              hasTooltip
            />
          ))}
        </div>
        {isFavoritesLoading && <InlinePreloader />}
        {isFavoritesFailed && <div>Невозможно получить список избранного</div>}
        {!isFavoritesFailed && !isFavoritesLoading && (
          <div>Вы пока ничего не добавили в Избранное...</div>
        )}
      </div>

      <div className={clsx(styles.row, styles.appsBG, styles.whiteLineShadow)}>
        <div className={clsx(styles.whiteLine3)} />
        <p className={styles.rowTitle}>Приложения</p>
        <div className={clsx(styles.section, styles.apps)}>
          {navigationMenu &&
            navigationMenu.map(item => {
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
        onClick={handleClick}
      />
    </div>
  );
}

export default HomePage;
