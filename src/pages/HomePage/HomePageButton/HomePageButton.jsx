import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import Tooltip from '../../../common/components/Tooltip';
import styles from './HomePageButton.module.scss';

const HomePageButton = ({
  title,
  kind,
  href,
  icon,
  appNameText,
  hasTooltip
}) => {

  const getStyles = () => {
    if (kind === 'SL') return styles.homePageSemanticLayerButton
    if (kind === 'REP') return styles.homePageDocumentButton
    return styles.homePageButton
  }

  return (
    <div className={styles.homePageButtonWrapper}>
      <RouterLink to={href || ''}>
        <div
          className={getStyles()}
        >
          {icon}
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
