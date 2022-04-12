import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import Tooltip from '../../../common/components/Tooltip';
import styles from './HomePageButton.module.scss';

const HomePageButton = ({
  title,
  href,
  icon,
  isDocument,
  appNameText,
  hasTooltip
}) => {
  return (
    <div className={styles.homePageButtonWrapper}>
      <RouterLink to={href || ''}>
        <div
          className={
            isDocument ? styles.homePageDocumentButton : styles.homePageButton
          }
        >
          {icon}
        </div>
        {hasTooltip ? (
          <Tooltip key={title} position="left" content={title}>
            <div
              className={
                appNameText
                  ? styles.buttonTextApps
                  : styles.buttonText
              }
            >
              {title}
            </div>
          </Tooltip>
        ) : (
          <div
            className={
              appNameText
                ? styles.buttonTextApps
                : styles.buttonText
            }
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
  isDocument: PropTypes.bool,
  appNameText: PropTypes.bool,
  hasTooltip: PropTypes.bool
};

export default HomePageButton;
