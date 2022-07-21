import clsx from 'clsx';
/* eslint-disable */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import DropdownItem from '../../common/components/Dropdown/DropdownItem';
import Dropdown from '../../common/components/Dropdown/index';
import FloatingButton from '../../common/components/FloatingButton';
import InlinePreloader from '../../common/components/InlinePreloader/index';
import { REDIRECT_LINKS } from '../../common/constants/common';
import { HOME_PAGE_BUTTON_ACTIONS } from '../../common/constants/common';
import { PAGE } from '../../common/constants/pages';
import { getFavoriteObjects } from '../../data/actions/app';
import { setObjectToFavorites } from '../../data/actions/app';
import { setCurrentPage } from '../../data/reducers/ui';
import ExplorerIcon from '../../layout/assets/icons/buttonPlus.svg';
import navigationMenu from '../../navigation';
import styles from './HomePage.module.scss';
import HomePageButton from './HomePageButton/HomePageButton';

const RECENTS = [
  {
    id: 1,
    title: 'Отчет 1 о проделанной работе с мая месяца текущего года',
    kind: 'SL',
  },
  { id: 2, title: 'Отчет 2', kind: 'REP' },
  { id: 3, title: 'Отчет 3', kind: 'REP' },
];

function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { favoriteObjectsStatus, favoriteObjectsData } = useSelector(
    (state) => state.app.data.favoriteObjects,
  );

  useEffect(() => {
    dispatch(setCurrentPage(PAGE.DASHBOARD));
    dispatch(getFavoriteObjects());
  }, []);

  const isFavoritesEmpty = !favoriteObjectsData.length;
  const isFavoritesLoading = favoriteObjectsStatus === 'LOADING';
  const isFavoritesFailed = favoriteObjectsStatus === 'FAILED';
  const withoutData =
    isFavoritesEmpty || isFavoritesLoading || isFavoritesFailed;

  /**
   * Хэндлер для удаления документа из Избранного.
   *
   * @prop id документа которого хотим удалить из Избранных.
   */
  const handleRemoveFromFavorites = (id) => {
    dispatch(
      setObjectToFavorites({
        user_id: 10001,
        id,
        kind: 'REP',
        isExclude: 1,
      }),
    );
    dispatch(getFavoriteObjects());
  };

  const handleOpenClick = (id) => {
    navigate(`${REDIRECT_LINKS.REPORT_SHOW}/${id}`, { replace: true });
  };

  const handleSetActionClick = (id, action) => {
    switch (action) {
      case 'removeFromFavorites':
        handleRemoveFromFavorites(id);
        break;
      case 'open':
        handleOpenClick(id);
        break;
      default:
        return null;
    }
  };

  const renderDropdownMenu = (id) => (
    <div className={styles.homePageButtonDropdownWrapper}>
      {HOME_PAGE_BUTTON_ACTIONS.map((item) => (
        <DropdownItem
          key={item.title}
          onClick={(action) => handleSetActionClick(id, action)}
          className={styles.menuItem}
          item={item}
        />
      ))}
    </div>
  );

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
          styles.favoritesBg,
          styles.whiteLineShadow,
          styles.rowWithoutData,
        )}
      >
        <div className={clsx(styles.whiteLine2)} />
        <p className={styles.rowTitle}>Избранное</p>
        <div className={styles.section1}>
          {favoriteObjectsData.map((item) => (
            <Dropdown trigger={['click']} overlay={renderDropdownMenu(item.id)}>
              <div>
                <HomePageButton
                  key={item.id}
                  title={item.name}
                  kind={item.kind}
                  hasTooltip
                />
              </div>
            </Dropdown>
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

      <FloatingButton
        icon={<ExplorerIcon />}
        text="Создать отчет"
        onClick={handleReportCreate}
      />
    </div>
  );
}

export default HomePage;
