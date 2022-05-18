import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import HomePageButton from './HomePageButton/HomePageButton';
import styles from './HomePage.module.scss';
import { setCurrentPage } from '../../data/reducers/ui';
import { PAGE } from '../../common/constants/pages';
import navigationMenu from '../../navigation';
import { ReactComponent as ExplorerIcon } from '../../layout/assets/icons/buttonPlus.svg';
import FloatingButton from '../../common/components/FloatingButton';
import QueryPanel from '../../modules/QueryPanel';
import Button from '../../common/components/Button';
import { setQueryPanelModal } from '../../data/actions/universes';

const RECENTS = [
  { id: 1, title: 'Отчет 1 о проделанной работе с мая месяца текущего года' },
  { id: 2, title: 'Отчет 2' },
  { id: 3, title: 'Отчет 3' }
];

const FAVORITES = [
  { id: 1, title: 'Избранный Отчет 1' },
  { id: 2, title: 'Избранный Отчет 2' }
];

function HomePage() {
  const dispatch = useDispatch();

  /* удалить, когда перенесем модалку в дизайнер отчета */
  const isQueryPanelModalOpened = useSelector(
    state => state.app.ui.modalVisible
  );
  /* удалить, когда перенесем модалку в дизайнер отчета */

  useEffect(() => {
    dispatch(setCurrentPage(PAGE.DASHBOARD));
  }, []);

  const handleClick = () => {
    console.log('click create');
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
        className={clsx(styles.row, styles.favoritesBG, styles.whiteLineShadow)}
      >
        <div className={clsx(styles.whiteLine2)} />
        <p className={styles.rowTitle}>Избранное</p>
        <div className={styles.section}>
          {FAVORITES.map(item => (
            <HomePageButton
              key={item.id}
              title={item.title}
              isDocument
              hasTooltip
            />
          ))}
        </div>
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
      {/* удалить, когда перенесем модалку в дизайнер отчета */}
      <div>
        <Button onClick={() => dispatch(setQueryPanelModal(true))}>
          Открыть панель запросов
        </Button>
      </div>
      {isQueryPanelModalOpened && (
        <QueryPanel visible={isQueryPanelModalOpened && true} />
      )}
      {/* удалить, когда перенесем модалку в дизайнер отчета */}
      <FloatingButton
        icon={<ExplorerIcon />}
        text="Создать отчет"
        onClick={handleClick}
      />
    </div>
  );
}

export default HomePage;
