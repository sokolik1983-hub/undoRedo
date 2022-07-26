import clsx from 'clsx';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { openUniverse } from '@src/data/actions/universes';
import { setLoadingUniverse } from '@src/data/reducers/schemaDesigner';

import InlinePreloader from '../../../common/components/InlinePreloader/index';
import { REDIRECT_LINKS } from '../../../common/constants/common';
import { setObjectFavoriteStatus } from '../../../data/actions/app';
import { getFavoriteObjects } from '../../../data/actions/app';
import styles from '../HomePage.module.scss';
import HomePageButton from '../HomePageButton/HomePageButton';

const FavoritesList = () => {
  const { favoriteObjectsStatus, favoriteObjectsData } = useSelector(
    (state) => state.app.data.favoriteObjects,
  );

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const isFavoritesEmpty = !favoriteObjectsData.length;
  const isFavoritesLoading = favoriteObjectsStatus === 'LOADING';
  const isFavoritesFailed = favoriteObjectsStatus === 'FAILED';
  const rowWithoutData = isFavoritesEmpty || isFavoritesFailed;

  const isUnvLoading = useSelector(
    (state) => state.app.schemaDesigner.isUnvLoading,
  );

  useEffect(() => {
    if (isUnvLoading) {
      navigate(REDIRECT_LINKS.SYMLAEYERS);
      dispatch(setLoadingUniverse(false));
    }
  }, [isUnvLoading]);

  const handleOpenClick = (item) => {
    if (item.kind === 'SL') {
      dispatch(openUniverse({ id: item.id, getData: 1 }, item.name));
    }
    if (item.kind === 'REP') {
      navigate(`${REDIRECT_LINKS.REPORT_SHOW}/${item.id}`, { replace: true });
    }
    return null;
  };

  const isFavoriteRemoved = (isRemoved) => {
    if (isRemoved) {
      dispatch(getFavoriteObjects());
    }
  };

  const handleRemoveFromFavorites = (id, kind, e) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(
      setObjectFavoriteStatus({ kind, id, isExclude: 1 }, isFavoriteRemoved),
    );
  };

  return (
    <div
      className={clsx(
        styles.row,
        styles.favoritesBg,
        styles.whiteLineShadow,
        rowWithoutData ? styles.rowWithoutData : null,
      )}
    >
      <div className={clsx(styles.whiteLine2)} />
      <p className={styles.rowTitle}>Избранное</p>
      <div className={clsx(styles.section)}>
        {favoriteObjectsData.map((item) => (
          <HomePageButton
            key={item.id}
            id={item.id}
            title={item.name}
            kind={item.kind}
            hasTooltip
            onRemoveFromFavorites={handleRemoveFromFavorites}
            onOpenFile={() => handleOpenClick(item)}
            removable
          />
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
  );
};

export default FavoritesList;
