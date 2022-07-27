import PropTypes from 'prop-types';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import Tooltip from '../../../common/components/Tooltip';
import RemoveFromFavoritesIcon from '../../../layout/assets/removeFromFavorites.svg';
import styles from './HomePageButton.module.scss';

const HomePageButton = ({
  title,
  kind,
  href,
  icon,
  appNameText,
  hasTooltip,
  onRemoveFromFavorites,
  onOpenFile,
  id,
  removable,
}) => {
  const getStyles = () => {
    const style = {
      SL: styles.homePageSemanticLayerButton,
      REP: styles.homePageDocumentButton,
    };
    return style[kind] ?? styles.homePageButton;
  };

  return (
    <div
      className={styles.homePageButtonWrapper}
      onClick={kind ? (e) => onOpenFile(id, e) : null}
    >
      <RouterLink to={href || ''}>
        <div className={getStyles()}>
          {icon}
          {kind && removable && (
            <RemoveFromFavoritesIcon
              data-remove={true}
              onClick={(e) => onRemoveFromFavorites(id, kind, e)}
              className={styles.close}
            />
          )}
        </div>
        {hasTooltip ? (
          <Tooltip placement="left" overlay={title}>
            <div
              className={
                appNameText ? styles.buttonTextApps : styles.buttonText
              }
            >
              {title}
            </div>
          </Tooltip>
        ) : (
          <div
            className={appNameText ? styles.buttonTextApps : styles.buttonText}
          >
            {title}
          </div>
        )}
      </RouterLink>
    </div>
  );
};

HomePageButton.propTypes = {
  title: PropTypes.string,
  href: PropTypes.string,
  icon: PropTypes.node,
  appNameText: PropTypes.bool,
  hasTooltip: PropTypes.bool,
  kind: PropTypes.string,
};

export default HomePageButton;
