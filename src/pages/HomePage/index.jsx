import clsx from 'clsx';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import FloatingButton from '../../common/components/FloatingButton';
import InlinePreloader from '../../common/components/InlinePreloader/index';
import { REDIRECT_LINKS } from '../../common/constants/common';
import { PAGE } from '../../common/constants/pages';
import { getFavoriteObjects } from '../../data/actions/app';
import { setObjectFavoriteStatus } from '../../data/actions/app';
import { setCurrentPage } from '../../data/reducers/ui';
import navigationMenu from '../../navigation';
import styles from './HomePage.module.scss';
import HomePageButton from './HomePageButton/HomePageButton';

const RECENTS = [
  {
    id: 1,
    title: 'Семантический слой 1',
    kind: 'SL',
  },
  { id: 2, title: 'Отчет 2', kind: 'REP' },
  { id: 3, title: 'Отчет 3', kind: 'SL' },
];

function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setCurrentPage(PAGE.DASHBOARD));
    dispatch(getFavoriteObjects());
  }, []);

  const isFavoritesEmpty = !favoriteObjectsData.length;
  const isFavoritesLoading = favoriteObjectsStatus === 'LOADING';
  const isFavoritesFailed = favoriteObjectsStatus === 'FAILED';

  const isFavoriteRemoved = (isRemoved) => {
    if (isRemoved) {
      dispatch(getFavoriteObjects());
    }
  };

  /**
   * Хэндлер для удаления документа из Избранного.
   *
   * @prop id документа которого хотим удалить из Избранных.
   */
  const handleRemoveFromFavorites = (id, kind, e) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(
      setObjectFavoriteStatus({ kind, id, isExclude: 1 }, isFavoriteRemoved),
    );
  };

  const handleOpenClick = (id) => {
    navigate(`${REDIRECT_LINKS.REPORT_SHOW}/${id}`, { replace: true });
  };

  const handleReportCreate = () => {
    navigate(REDIRECT_LINKS.REPORT_CREATE);
  };

  return (
    <div className={styles.root}>
      <div
        className={clsx(styles.row, styles.recentBg, styles.whiteLineShadow)}
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

      <div
        className={clsx(
          styles.row,
          styles.favoritesBG,
          styles.whiteLineShadow,
          (isFavoritesLoading && isFavoritesEmpty) || isFavoritesEmpty
            ? styles.rowWithoutData
            : styles.row,
        )}
      >
        <div className={clsx(styles.whiteLine2)} />
        <p className={styles.rowTitle}>Избранное</p>
        <div className={clsx(styles.section)}>
          {favoriteObjectsData.map((item) => (
            <div className={styles.wrapper}>
              <HomePageButton
                key={item.id}
                id={item.id}
                title={item.name}
                kind={item.kind}
                hasTooltip
                onRemoveFromFavorites={handleRemoveFromFavorites}
                onOpenReport={handleOpenClick}
              />
            </div>
          ))}
        </div>
        {isFavoritesEmpty && isFavoritesLoading && <InlinePreloader />}
        {isFavoritesFailed && (
          <p className={styles.noDataTitle}>Невозможно получить данные...</p>
        )}
        {isFavoritesEmpty && !isFavoritesLoading && (
          <p className={styles.noDataTitle}>
            Вы пока ничего не добавилии в Избранное...
          </p>
        )}
      </div>

      <div className={clsx(styles.row, styles.appsBg, styles.whiteLineShadow)}>
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

      <FloatingButton text="Создать отчет" onClick={handleReportCreate} />
    </div>
  );
}

export default HomePage;
