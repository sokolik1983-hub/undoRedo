import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

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

  const handleOpenClick = (id) => {
    navigate(`${REDIRECT_LINKS.REPORT_SHOW}/${id}`, { replace: true });
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
          <div>
            <HomePageButton
              key={item.id}
              id={item.id}
              title={item.name}
              kind={item.kind}
              hasTooltip
              onRemoveFromFavorites={handleRemoveFromFavorites}
              onOpenReport={handleOpenClick}
              removable
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
  );
};

export default FavoritesList;
